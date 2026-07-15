import { Capacitor } from '@capacitor/core'
import {
  CapacitorSQLite,
  SQLiteConnection,
  type SQLiteDBConnection
} from '@capacitor-community/sqlite'
import { achievementSeeds, stickerSeeds } from '@/database/seed'
import { BASE_SCHEMA, DATABASE_NAME, DATABASE_VERSION } from '@/database/schema'
import type {
  Conquista,
  EstatisticasAlbum,
  Figurinha,
  FiltroFigurinha,
  OrdenacaoFigurinha,
  RankingColecionador,
  Usuario
} from '@/models'

let db: SQLiteDBConnection | null = null
let initializationPromise: Promise<void> | null = null

const sqliteConnection = new SQLiteConnection(CapacitorSQLite)

function database(): SQLiteDBConnection {
  if (!db) {
    throw new Error('Banco de dados ainda não inicializado.')
  }

  return db
}

async function hasColumn(table: string, column: string): Promise<boolean> {
  const result = await database().query(`PRAGMA table_info(${table});`)
  return (result.values ?? []).some((item) => item.name === column)
}

async function ensureColumn(
  table: string,
  column: string,
  definition: string
): Promise<void> {
  if (!(await hasColumn(table, column))) {
    await database().execute(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition};`)
  }
}

async function runMigrations(): Promise<void> {
  await ensureColumn('usuarios', 'email', 'TEXT')
  await ensureColumn('usuarios', 'created_at', 'TEXT')

  if (await hasColumn('usuarios', 'login')) {
    await database().execute(`
      UPDATE usuarios
      SET email = LOWER(TRIM(login))
      WHERE (email IS NULL OR TRIM(email) = '') AND login IS NOT NULL;
    `)
  }

  await database().execute(`
    UPDATE usuarios
    SET created_at = COALESCE(created_at, datetime('now', 'localtime'));
    CREATE UNIQUE INDEX IF NOT EXISTS idx_usuarios_email ON usuarios(email);
  `)

  await ensureColumn('stickers', 'coletada', 'INTEGER NOT NULL DEFAULT 0')
  await ensureColumn('stickers', 'favorite', 'INTEGER NOT NULL DEFAULT 0')
  await ensureColumn('stickers', 'collected_at', 'TEXT')
  await ensureColumn('achievements', 'selecao', 'TEXT')

  await database().execute(`
    UPDATE stickers SET raridade = 'Comum'
    WHERE raridade IS NULL OR raridade NOT IN ('Comum', 'Rara', 'Brilhante');
  `)
}

async function seedDatabase(): Promise<void> {
  for (const sticker of stickerSeeds) {
    await database().run(
      `INSERT INTO stickers
        (id, nome, selecao, foto, raridade, coletada, favorite, collected_at)
       VALUES (?, ?, ?, ?, ?, 0, 0, NULL)
       ON CONFLICT(id) DO UPDATE SET
         nome = excluded.nome,
         selecao = excluded.selecao,
         foto = excluded.foto,
         raridade = excluded.raridade;`,
      [sticker.id, sticker.nome, sticker.selecao, sticker.foto, sticker.raridade]
    )
  }

  for (const achievement of achievementSeeds) {
    await database().run(
      `INSERT INTO achievements
        (id, nome, descricao, icone, meta, tipo, selecao)
       VALUES (?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(id) DO UPDATE SET
         nome = excluded.nome,
         descricao = excluded.descricao,
         icone = excluded.icone,
         meta = excluded.meta,
         tipo = excluded.tipo,
         selecao = excluded.selecao;`,
      [
        achievement.id,
        achievement.nome,
        achievement.descricao,
        achievement.icone,
        achievement.meta,
        achievement.tipo,
        achievement.selecao ?? null
      ]
    )
  }
}

async function migrateLegacyCollection(): Promise<void> {
  const firstUser = await database().query(
    'SELECT id FROM usuarios ORDER BY id LIMIT 1;'
  )
  const userId = firstUser.values?.[0]?.id as number | undefined

  if (!userId) return

  const existing = await database().query(
    'SELECT COUNT(*) AS total FROM user_stickers WHERE user_id = ?;',
    [userId]
  )

  if (Number(existing.values?.[0]?.total ?? 0) > 0) return

  await database().run(
    `INSERT OR IGNORE INTO user_stickers
      (user_id, sticker_id, coletada, favorite, collected_at, updated_at)
     SELECT ?, id, COALESCE(coletada, 0), COALESCE(favorite, 0), collected_at,
            datetime('now', 'localtime')
     FROM stickers
     WHERE COALESCE(coletada, 0) = 1
        OR COALESCE(favorite, 0) = 1
        OR collected_at IS NOT NULL;`,
    [userId]
  )
}

async function initialize(): Promise<void> {
  if (Capacitor.getPlatform() === 'web') {
    await sqliteConnection.initWebStore()
  }

  db = await sqliteConnection.createConnection(
    DATABASE_NAME,
    false,
    'no-encryption',
    DATABASE_VERSION,
    false
  )

  await db.open()
  await db.execute(BASE_SCHEMA)
  await runMigrations()
  await seedDatabase()
  await migrateLegacyCollection()
}

export async function initDatabase(): Promise<void> {
  if (!initializationPromise) {
    initializationPromise = initialize().catch((error) => {
      initializationPromise = null
      db = null
      throw error
    })
  }

  await initializationPromise
}

async function ready(): Promise<void> {
  await initDatabase()
}

/* ==========================
   USUÁRIOS E SESSÃO
========================== */

export async function addUsuario(
  nome: string,
  email: string,
  senha: string
): Promise<Usuario> {
  await ready()
  const normalizedEmail = email.trim().toLowerCase()

  await database().run(
    `INSERT INTO usuarios (nome, email, senha, created_at)
     VALUES (?, ?, ?, datetime('now', 'localtime'));`,
    [nome.trim(), normalizedEmail, senha]
  )

  const user = await database().query(
    'SELECT id, nome, email FROM usuarios WHERE email = ? LIMIT 1;',
    [normalizedEmail]
  )

  return user.values?.[0] as Usuario
}

export async function realizarLogin(
  email: string,
  senha: string
): Promise<Usuario[]> {
  await ready()
  const result = await database().query(
    `SELECT id, nome, email
     FROM usuarios
     WHERE email = ? AND senha = ?
     LIMIT 1;`,
    [email.trim().toLowerCase(), senha]
  )

  return (result.values ?? []) as Usuario[]
}

export async function findUsuarioById(id: number): Promise<Usuario | null> {
  await ready()
  const result = await database().query(
    'SELECT id, nome, email FROM usuarios WHERE id = ? LIMIT 1;',
    [id]
  )

  return (result.values?.[0] as Usuario | undefined) ?? null
}

export async function emailCadastrado(email: string): Promise<boolean> {
  await ready()
  const result = await database().query(
    'SELECT COUNT(*) AS total FROM usuarios WHERE email = ?;',
    [email.trim().toLowerCase()]
  )

  return Number(result.values?.[0]?.total ?? 0) > 0
}

export async function saveSession(userId: number): Promise<void> {
  await ready()
  await database().run(
    `INSERT INTO app_session (id, user_id, updated_at)
     VALUES (1, ?, datetime('now', 'localtime'))
     ON CONFLICT(id) DO UPDATE SET
       user_id = excluded.user_id,
       updated_at = excluded.updated_at;`,
    [userId]
  )
}

export async function getSessionUser(): Promise<Usuario | null> {
  await ready()
  const result = await database().query(`
    SELECT u.id, u.nome, u.email
    FROM app_session session
    INNER JOIN usuarios u ON u.id = session.user_id
    WHERE session.id = 1
    LIMIT 1;
  `)

  return (result.values?.[0] as Usuario | undefined) ?? null
}

export async function clearSession(): Promise<void> {
  await ready()
  await database().run('DELETE FROM app_session WHERE id = 1;')
}

/* ==========================
   FIGURINHAS E COLEÇÃO
========================== */

interface StickerQueryOptions {
  userId: number
  filtro?: FiltroFigurinha
  pesquisa?: string
  ordenacao?: OrdenacaoFigurinha
  limite?: number
}

export async function getStickers({
  userId,
  filtro = 'todas',
  pesquisa = '',
  ordenacao = 'numero',
  limite
}: StickerQueryOptions): Promise<Figurinha[]> {
  await ready()

  const conditions: string[] = []
  const params: Array<string | number> = [userId]

  if (filtro === 'coletadas') conditions.push('COALESCE(us.coletada, 0) = 1')
  if (filtro === 'pendentes') conditions.push('COALESCE(us.coletada, 0) = 0')
  if (filtro === 'favoritas') conditions.push('COALESCE(us.favorite, 0) = 1')

  const normalizedSearch = pesquisa.trim()
  if (normalizedSearch) {
    conditions.push('(s.nome LIKE ? OR s.selecao LIKE ? OR s.raridade LIKE ?)')
    const term = `%${normalizedSearch}%`
    params.push(term, term, term)
  }

  let orderBy = 's.id ASC'
  if (ordenacao === 'coleta_recente') {
    orderBy = 'CASE WHEN us.collected_at IS NULL THEN 1 ELSE 0 END, us.collected_at DESC, s.id ASC'
  } else if (ordenacao === 'coleta_antiga') {
    orderBy = 'CASE WHEN us.collected_at IS NULL THEN 1 ELSE 0 END, us.collected_at ASC, s.id ASC'
  }

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : ''
  const limit = limite ? 'LIMIT ?' : ''
  if (limite) params.push(limite)

  const result = await database().query(
    `SELECT
       s.id,
       s.nome,
       s.selecao,
       s.foto,
       s.raridade,
       COALESCE(us.coletada, 0) AS coletada,
       COALESCE(us.favorite, 0) AS favorite,
       us.collected_at
     FROM stickers s
     LEFT JOIN user_stickers us
       ON us.sticker_id = s.id AND us.user_id = ?
     ${where}
     ORDER BY ${orderBy}
     ${limit};`,
    params
  )

  return (result.values ?? []) as Figurinha[]
}

export async function getStickerById(
  userId: number,
  stickerId: number
): Promise<Figurinha | null> {
  const stickers = await getStickers({ userId })
  return stickers.find((sticker) => sticker.id === stickerId) ?? null
}

export async function updateSticker(
  userId: number,
  stickerId: number,
  coletada: number
): Promise<void> {
  await ready()

  await database().run(
    `INSERT INTO user_stickers
      (user_id, sticker_id, coletada, favorite, collected_at, updated_at)
     VALUES (
       ?,
       ?,
       ?,
       0,
       CASE WHEN ? = 1 THEN datetime('now', 'localtime') ELSE NULL END,
       datetime('now', 'localtime')
     )
     ON CONFLICT(user_id, sticker_id) DO UPDATE SET
       coletada = excluded.coletada,
       collected_at = CASE
         WHEN excluded.coletada = 1 THEN datetime('now', 'localtime')
         ELSE NULL
       END,
       updated_at = datetime('now', 'localtime');`,
    [userId, stickerId, coletada, coletada]
  )
}

export async function updateFavorite(
  userId: number,
  stickerId: number,
  favorite: number
): Promise<void> {
  await ready()

  await database().run(
    `INSERT INTO user_stickers
      (user_id, sticker_id, coletada, favorite, collected_at, updated_at)
     VALUES (?, ?, 0, ?, NULL, datetime('now', 'localtime'))
     ON CONFLICT(user_id, sticker_id) DO UPDATE SET
       favorite = excluded.favorite,
       updated_at = datetime('now', 'localtime');`,
    [userId, stickerId, favorite]
  )
}

export async function getRecentCollectedStickers(
  userId: number,
  limite = 10
): Promise<Figurinha[]> {
  return getStickers({
    userId,
    filtro: 'coletadas',
    ordenacao: 'coleta_recente',
    limite
  })
}

/* ==========================
   ESTATÍSTICAS E RANKING
========================== */

export async function getAlbumStatistics(
  userId: number
): Promise<EstatisticasAlbum> {
  await ready()
  const result = await database().query(
    `SELECT
       COUNT(s.id) AS total,
       COALESCE(SUM(CASE WHEN us.coletada = 1 THEN 1 ELSE 0 END), 0) AS coletadas,
       COALESCE(SUM(CASE WHEN COALESCE(us.coletada, 0) = 0 THEN 1 ELSE 0 END), 0) AS faltantes,
       COALESCE(SUM(CASE WHEN us.coletada = 1 AND LOWER(s.raridade) = 'rara' THEN 1 ELSE 0 END), 0) AS raras,
       COALESCE(SUM(CASE WHEN us.coletada = 1 AND LOWER(s.raridade) = 'brilhante' THEN 1 ELSE 0 END), 0) AS brilhantes
     FROM stickers s
     LEFT JOIN user_stickers us
       ON us.sticker_id = s.id AND us.user_id = ?;`,
    [userId]
  )

  const row = result.values?.[0] ?? {}
  const total = Number(row.total ?? 0)
  const coletadas = Number(row.coletadas ?? 0)

  return {
    total,
    coletadas,
    faltantes: Number(row.faltantes ?? Math.max(total - coletadas, 0)),
    raras: Number(row.raras ?? 0),
    brilhantes: Number(row.brilhantes ?? 0),
    percentual: total === 0 ? 0 : (coletadas / total) * 100
  }
}

export function calculateRanking(pontos: number): RankingColecionador {
  if (pontos > 500) {
    return {
      pontos,
      nivel: 'Diamante',
      minimoNivel: 501,
      proximoNivel: null,
      progresso: 1,
      pontosRestantes: 0
    }
  }

  if (pontos >= 251) {
    return {
      pontos,
      nivel: 'Ouro',
      minimoNivel: 251,
      proximoNivel: 501,
      progresso: Math.min((pontos - 251) / 250, 1),
      pontosRestantes: 501 - pontos
    }
  }

  if (pontos >= 101) {
    return {
      pontos,
      nivel: 'Prata',
      minimoNivel: 101,
      proximoNivel: 251,
      progresso: Math.min((pontos - 101) / 150, 1),
      pontosRestantes: 251 - pontos
    }
  }

  return {
    pontos,
    nivel: 'Bronze',
    minimoNivel: 0,
    proximoNivel: 101,
    progresso: Math.min(pontos / 101, 1),
    pontosRestantes: 101 - pontos
  }
}

export async function getCollectorRanking(
  userId: number
): Promise<RankingColecionador> {
  await ready()
  const result = await database().query(
    `SELECT COALESCE(SUM(
       CASE LOWER(s.raridade)
         WHEN 'brilhante' THEN 10
         WHEN 'rara' THEN 5
         ELSE 1
       END
     ), 0) AS pontos
     FROM user_stickers us
     INNER JOIN stickers s ON s.id = us.sticker_id
     WHERE us.user_id = ? AND us.coletada = 1;`,
    [userId]
  )

  return calculateRanking(Number(result.values?.[0]?.pontos ?? 0))
}

/* ==========================
   CONQUISTAS
========================== */

async function selectionProgress(userId: number, selecao: string): Promise<number> {
  const result = await database().query(
    `SELECT
       COUNT(s.id) AS total,
       COALESCE(SUM(CASE WHEN us.coletada = 1 THEN 1 ELSE 0 END), 0) AS coletadas
     FROM stickers s
     LEFT JOIN user_stickers us
       ON us.sticker_id = s.id AND us.user_id = ?
     WHERE s.selecao = ?;`,
    [userId, selecao]
  )

  const total = Number(result.values?.[0]?.total ?? 0)
  const collected = Number(result.values?.[0]?.coletadas ?? 0)
  return total === 0 ? 0 : Math.round((collected / total) * 100)
}

async function achievementCurrentValue(
  userId: number,
  achievement: { tipo: string; selecao?: string | null },
  statistics: EstatisticasAlbum
): Promise<number> {
  switch (achievement.tipo) {
    case 'coletadas':
      return statistics.coletadas
    case 'raras':
      return statistics.raras
    case 'brilhantes':
      return statistics.brilhantes
    case 'porcentagem':
      return statistics.percentual
    case 'selecao':
      return achievement.selecao
        ? selectionProgress(userId, achievement.selecao)
        : 0
    default:
      return 0
  }
}

export async function recalculateAchievements(userId: number): Promise<void> {
  await ready()
  const statistics = await getAlbumStatistics(userId)
  const definitions = await database().query(
    'SELECT id, meta, tipo, selecao FROM achievements ORDER BY id;'
  )

  for (const achievement of definitions.values ?? []) {
    const currentValue = await achievementCurrentValue(
      userId,
      achievement,
      statistics
    )

    if (currentValue >= Number(achievement.meta)) {
      await database().run(
        `INSERT OR IGNORE INTO user_achievements
          (user_id, achievement_id, data_desbloqueio)
         VALUES (?, ?, datetime('now', 'localtime'));`,
        [userId, achievement.id]
      )
    }
  }
}

export async function getAchievements(userId: number): Promise<Conquista[]> {
  await ready()
  const statistics = await getAlbumStatistics(userId)
  const result = await database().query(
    `SELECT
       a.id,
       a.nome,
       a.descricao,
       a.icone,
       a.meta,
       a.tipo,
       a.selecao,
       CASE WHEN ua.id IS NULL THEN 0 ELSE 1 END AS desbloqueada,
       ua.data_desbloqueio
     FROM achievements a
     LEFT JOIN user_achievements ua
       ON ua.achievement_id = a.id AND ua.user_id = ?
     ORDER BY a.id;`,
    [userId]
  )

  const achievements: Conquista[] = []
  for (const row of result.values ?? []) {
    const current = await achievementCurrentValue(userId, row, statistics)
    const target = Number(row.meta)
    achievements.push({
      ...(row as Omit<Conquista, 'progresso_atual' | 'progresso_percentual'>),
      progresso_atual: current,
      progresso_percentual: target === 0 ? 0 : Math.min(current / target, 1)
    })
  }

  return achievements
}

export async function addContato(
  nome: string,
  email: string,
  telefone: string
): Promise<void> {
  await ready()
  await database().run(
    'INSERT INTO contatos (nome, email, telefone) VALUES (?, ?, ?);',
    [nome.trim(), email.trim().toLowerCase(), telefone.trim()]
  )
}

export async function listContatos(): Promise<Array<{
  id: number
  nome: string
  email: string
  telefone: string | null
}>> {
  await ready()
  const result = await database().query(
    'SELECT id, nome, email, telefone FROM contatos ORDER BY nome;'
  )
  return (result.values ?? []) as Array<{
    id: number
    nome: string
    email: string
    telefone: string | null
  }>
}

export async function updateContato(
  id: number,
  nome: string,
  email: string,
  telefone: string
): Promise<void> {
  await ready()
  await database().run(
    'UPDATE contatos SET nome = ?, email = ?, telefone = ? WHERE id = ?;',
    [nome.trim(), email.trim().toLowerCase(), telefone.trim(), id]
  )
}

export async function deleteContatoById(id: number): Promise<void> {
  await ready()
  await database().run('DELETE FROM contatos WHERE id = ?;', [id])
}

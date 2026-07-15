export const DATABASE_NAME = 'appdata'
export const DATABASE_VERSION = 4

export const BASE_SCHEMA = `
  PRAGMA foreign_keys = ON;

  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT,
    senha TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS contatos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL,
    telefone TEXT
  );

  CREATE TABLE IF NOT EXISTS app_session (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    user_id INTEGER NOT NULL,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES usuarios(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS stickers (
    id INTEGER PRIMARY KEY,
    nome TEXT NOT NULL,
    selecao TEXT NOT NULL,
    foto TEXT,
    raridade TEXT NOT NULL CHECK (raridade IN ('Comum', 'Rara', 'Brilhante')),
    coletada INTEGER NOT NULL DEFAULT 0 CHECK (coletada IN (0, 1)),
    favorite INTEGER NOT NULL DEFAULT 0 CHECK (favorite IN (0, 1)),
    collected_at TEXT
  );

  CREATE TABLE IF NOT EXISTS user_stickers (
    user_id INTEGER NOT NULL,
    sticker_id INTEGER NOT NULL,
    coletada INTEGER NOT NULL DEFAULT 0 CHECK (coletada IN (0, 1)),
    favorite INTEGER NOT NULL DEFAULT 0 CHECK (favorite IN (0, 1)),
    collected_at TEXT,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, sticker_id),
    FOREIGN KEY (user_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (sticker_id) REFERENCES stickers(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS achievements (
    id INTEGER PRIMARY KEY,
    nome TEXT NOT NULL,
    descricao TEXT NOT NULL,
    icone TEXT NOT NULL,
    meta INTEGER NOT NULL,
    tipo TEXT NOT NULL,
    selecao TEXT
  );

  CREATE TABLE IF NOT EXISTS user_achievements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    achievement_id INTEGER NOT NULL,
    data_desbloqueio TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, achievement_id),
    FOREIGN KEY (user_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (achievement_id) REFERENCES achievements(id) ON DELETE CASCADE
  );

  CREATE INDEX IF NOT EXISTS idx_stickers_nome ON stickers(nome);
  CREATE INDEX IF NOT EXISTS idx_stickers_selecao ON stickers(selecao);
  CREATE INDEX IF NOT EXISTS idx_user_stickers_status ON user_stickers(user_id, coletada);
  CREATE INDEX IF NOT EXISTS idx_user_stickers_favorite ON user_stickers(user_id, favorite);
  CREATE INDEX IF NOT EXISTS idx_user_stickers_collected_at ON user_stickers(user_id, collected_at);
  CREATE INDEX IF NOT EXISTS idx_user_achievements_user ON user_achievements(user_id);
`

export type Raridade = 'Comum' | 'Rara' | 'Brilhante'

export interface Usuario {
  id: number
  nome: string
  email: string
}

export interface Figurinha {
  id: number
  nome: string
  selecao: string
  foto: string | null
  raridade: Raridade
  coletada: number
  favorite: number
  collected_at: string | null
}

export type FiltroFigurinha =
  | 'todas'
  | 'coletadas'
  | 'pendentes'
  | 'favoritas'

export type OrdenacaoFigurinha = 'numero' | 'coleta_recente' | 'coleta_antiga'

export interface EstatisticasAlbum {
  total: number
  coletadas: number
  faltantes: number
  raras: number
  brilhantes: number
  percentual: number
}

export type NivelColecionador = 'Bronze' | 'Prata' | 'Ouro' | 'Diamante'

export interface RankingColecionador {
  pontos: number
  nivel: NivelColecionador
  minimoNivel: number
  proximoNivel: number | null
  progresso: number
  pontosRestantes: number
}

export interface Conquista {
  id: number
  nome: string
  descricao: string
  icone: string
  meta: number
  tipo: string
  selecao: string | null
  desbloqueada: number
  data_desbloqueio: string | null
  progresso_atual: number
  progresso_percentual: number
}

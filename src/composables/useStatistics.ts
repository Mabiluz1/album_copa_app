import { ref } from 'vue'
import { getAlbumStatistics, getCollectorRanking } from '@/services/database'
import { useAuth } from '@/composables/useAuth'
import type { EstatisticasAlbum, RankingColecionador } from '@/models'

const estatisticas = ref<EstatisticasAlbum>({
  total: 0,
  coletadas: 0,
  faltantes: 0,
  raras: 0,
  brilhantes: 0,
  percentual: 0
})

const ranking = ref<RankingColecionador>({
  pontos: 0,
  nivel: 'Bronze',
  minimoNivel: 0,
  proximoNivel: 100,
  progresso: 0,
  pontosRestantes: 100
})

const carregando = ref(false)
const erro = ref('')

export function useStatistics() {
  const { usuarioLogado, ensureSession } = useAuth()

  async function carregarEstatisticas(): Promise<void> {
    carregando.value = true
    erro.value = ''

    try {
      const usuario = usuarioLogado.value ?? await ensureSession()
      if (!usuario) {
        throw new Error('Sessão de usuário não encontrada.')
      }

      const [novasEstatisticas, novoRanking] = await Promise.all([
        getAlbumStatistics(usuario.id),
        getCollectorRanking(usuario.id)
      ])
      estatisticas.value = novasEstatisticas
      ranking.value = novoRanking
    } catch (cause) {
      erro.value = cause instanceof Error
        ? cause.message
        : 'Não foi possível carregar as estatísticas.'
    } finally {
      carregando.value = false
    }
  }

  return {
    estatisticas,
    ranking,
    carregando,
    erro,
    carregarEstatisticas
  }
}

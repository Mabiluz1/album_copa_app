import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'
import {
  getRecentCollectedStickers,
  getStickers,
  recalculateAchievements,
  updateFavorite,
  updateSticker
} from '@/services/database'
import type {
  Figurinha,
  FiltroFigurinha,
  OrdenacaoFigurinha
} from '@/models'

export const albumRevision = ref(0)

export function useAlbum() {
  const lista = ref<Figurinha[]>([])
  const recentes = ref<Figurinha[]>([])
  const carregando = ref(false)
  const erro = ref('')
  const filtroAtual = ref<FiltroFigurinha>('todas')
  const pesquisaAtual = ref('')
  const ordenacaoAtual = ref<OrdenacaoFigurinha>('numero')
  const { ensureSession } = useAuth()

  async function currentUserId(): Promise<number> {
    const usuario = await ensureSession()
    if (!usuario) throw new Error('Usuário não autenticado.')
    return usuario.id
  }

  async function carregarFigurinhas(options?: {
    filtro?: FiltroFigurinha
    pesquisa?: string
    ordenacao?: OrdenacaoFigurinha
  }): Promise<void> {
    if (options?.filtro) filtroAtual.value = options.filtro
    if (options?.pesquisa !== undefined) pesquisaAtual.value = options.pesquisa
    if (options?.ordenacao) ordenacaoAtual.value = options.ordenacao

    carregando.value = true
    erro.value = ''

    try {
      lista.value = await getStickers({
        userId: await currentUserId(),
        filtro: filtroAtual.value,
        pesquisa: pesquisaAtual.value,
        ordenacao: ordenacaoAtual.value
      })
    } catch (error) {
      console.error('Erro ao carregar figurinhas:', error)
      erro.value = 'Não foi possível carregar as figurinhas.'
    } finally {
      carregando.value = false
    }
  }

  async function carregarPorFiltro(filtro: FiltroFigurinha): Promise<void> {
    await carregarFigurinhas({ filtro })
  }

  async function pesquisar(pesquisa: string): Promise<void> {
    await carregarFigurinhas({ pesquisa })
  }

  async function ordenar(ordenacao: OrdenacaoFigurinha): Promise<void> {
    await carregarFigurinhas({ ordenacao })
  }

  async function marcarColetada(id: number): Promise<void> {
    const figurinha = lista.value.find((item) => item.id === id)
    if (!figurinha) return

    const userId = await currentUserId()
    await updateSticker(userId, id, figurinha.coletada ? 0 : 1)
    await recalculateAchievements(userId)
    albumRevision.value += 1
    await carregarFigurinhas()
  }

  async function alternarFavorita(id: number): Promise<void> {
    const figurinha = lista.value.find((item) => item.id === id)
    if (!figurinha) return

    await updateFavorite(
      await currentUserId(),
      id,
      figurinha.favorite ? 0 : 1
    )
    albumRevision.value += 1
    await carregarFigurinhas()
  }

  async function carregarRecentes(): Promise<void> {
    try {
      recentes.value = await getRecentCollectedStickers(
        await currentUserId(),
        10
      )
    } catch (error) {
      console.error('Erro ao carregar histórico:', error)
      recentes.value = []
    }
  }

  return {
    lista,
    recentes,
    carregando,
    erro,
    filtroAtual,
    pesquisaAtual,
    ordenacaoAtual,
    carregarFigurinhas,
    carregarPorFiltro,
    pesquisar,
    ordenar,
    marcarColetada,
    alternarFavorita,
    carregarRecentes
  }
}

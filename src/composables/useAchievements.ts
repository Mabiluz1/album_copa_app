import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'
import {
  getAchievements,
  recalculateAchievements
} from '@/services/database'
import type { Conquista } from '@/models'

export function useAchievements() {
  const conquistas = ref<Conquista[]>([])
  const carregando = ref(false)
  const { ensureSession } = useAuth()

  async function userId(): Promise<number> {
    const usuario = await ensureSession()
    if (!usuario) throw new Error('Usuário não autenticado.')
    return usuario.id
  }

  async function carregarConquistas(): Promise<void> {
    carregando.value = true
    try {
      conquistas.value = await getAchievements(await userId())
    } finally {
      carregando.value = false
    }
  }

  async function verificarConquistas(): Promise<void> {
    const id = await userId()
    await recalculateAchievements(id)
    conquistas.value = await getAchievements(id)
  }

  return {
    conquistas,
    carregando,
    carregarConquistas,
    verificarConquistas
  }
}

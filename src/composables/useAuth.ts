import { readonly, ref } from 'vue'
import {
  addUsuario,
  clearSession,
  emailCadastrado,
  getSessionUser,
  realizarLogin,
  saveSession
} from '@/services/database'
import type { Usuario } from '@/models'

const usuarioLogado = ref<Usuario | null>(null)
let sessionLoaded = false
let sessionPromise: Promise<Usuario | null> | null = null

export function useAuth() {
  async function ensureSession(): Promise<Usuario | null> {
    if (sessionLoaded) return usuarioLogado.value

    if (!sessionPromise) {
      sessionPromise = getSessionUser()
        .then((usuario) => {
          usuarioLogado.value = usuario
          sessionLoaded = true
          return usuario
        })
        .finally(() => {
          sessionPromise = null
        })
    }

    return sessionPromise
  }

  async function cadastrar(usuario: {
    nome: string
    email: string
    senha: string
  }) {
    const nome = usuario.nome.trim()
    const email = usuario.email.trim().toLowerCase()

    if (!nome || !email || !usuario.senha) {
      return { sucesso: false, mensagem: 'Preencha todos os campos.' }
    }

    if (await emailCadastrado(email)) {
      return { sucesso: false, mensagem: 'Este e-mail já está cadastrado.' }
    }

    try {
      await addUsuario(nome, email, usuario.senha)
      return { sucesso: true, mensagem: 'Cadastro realizado com sucesso!' }
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error)
      return { sucesso: false, mensagem: 'Não foi possível concluir o cadastro.' }
    }
  }

  async function login(email: string, senha: string) {
    try {
      const usuarios = await realizarLogin(email, senha)
      const usuario = usuarios[0]

      if (!usuario) {
        return { sucesso: false, mensagem: 'E-mail ou senha inválidos.' }
      }

      await saveSession(usuario.id)
      usuarioLogado.value = usuario
      sessionLoaded = true

      return { sucesso: true, usuario }
    } catch (error) {
      console.error('Erro no login:', error)
      return { sucesso: false, mensagem: 'Erro ao realizar login.' }
    }
  }

  async function logout(): Promise<void> {
    await clearSession()
    usuarioLogado.value = null
    sessionLoaded = true
  }

  async function resetarSenha(email: string): Promise<string> {
    const normalizedEmail = email.trim().toLowerCase()
    if (!normalizedEmail) return 'Informe um e-mail.'

    if (!(await emailCadastrado(normalizedEmail))) {
      return 'Não existe usuário cadastrado com este e-mail.'
    }

    return 'Cadastro localizado. Procure o responsável pelo aplicativo para redefinir a senha.'
  }

  return {
    cadastrar,
    login,
    logout,
    resetarSenha,
    ensureSession,
    usuarioLogado: readonly(usuarioLogado)
  }
}

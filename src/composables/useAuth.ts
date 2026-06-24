import { ref } from 'vue'

const usuarios = ref<any[]>([])
const usuarioLogado = ref({
    nome: null,
    email: null,
    senha: null,
  })

export function useAuth() {

  function cadastrar(usuario:any){
    usuarios.value.push(usuario)
  }

  function login(
    email:string,
    senha:string
  ){
    const usuario = usuarios.value.find(
      user =>
      user.email === email &&
      user.senha === senha
    )
    if (usuario){
      usuarioLogado.value = usuario
    }
    return usuario
  }

  function resetarSenha(
    email:string
  ){
    return `Email enviado para ${email}`
  }

  function logout(){
    console.log('Logout')
  }

  return {
    usuarios,
    cadastrar,
    login,
    resetarSenha,
    logout,
    usuarioLogado
  }
}
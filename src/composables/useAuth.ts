import { ref } from 'vue'

const usuarios = ref<any[]>([])

export function useAuth() {

  function cadastrar(usuario:any){
    usuarios.value.push(usuario)
  }

  function login(
    email:string,
    senha:string
  ){
    return usuarios.value.find(
      user =>
      user.email === email &&
      user.senha === senha
    )
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
    logout
  }
}
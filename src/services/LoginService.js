import {TWITTELUM_API} from './utils'
export default class LoginService{
   /**
   * Autentica o usuário 
   * @param {string} login 
   * @param {string} senha 
   * @returns {Promise<string>}
   */

 
  static async autenticar(login, senha){
    
      const dadosLogin = {login, senha}

      const resposta = await fetch(TWITTELUM_API + '/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosLogin)
      })

      if (!resposta.ok) {
        const resErroServidor = await resposta.json()
        const erro = new Error(resErroServidor.message)
        erro.status = resposta.status
        throw erro
      }

      const dadoServidos = await resposta.json()
      const token = dadoServidos.token

      if (!token) {
        throw new Error('TOKEN não encontrado')
      }

      localStorage.setItem('TOKEN', token)

    }
  }



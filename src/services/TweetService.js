import {TWITTELUM_API, getAuthToken} from './utils'

export default class TweetService {

  /**
   * Retorna a lista de tweets do servidor
   * @returns {Promise<Array>}
   */

  static async getTweets() {
    const url = TWITTELUM_API + '/tweets?X-AUTH-TOKEN=' + getAuthToken()
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error('Erro ao retornar a lista de tweets do servidor')
    }

    const tweets = await response.json()
    return tweets
  }

  static async addTweet(conteudo) {
    const url = TWITTELUM_API + '/tweets?X-AUTH-TOKEN=' + getAuthToken()
    const resposta = await fetch(url, {
      method: 'POST',
      headers: {'Content-type': 'application/json'}, 
      body: JSON.stringify({conteudo})
  })

  if(!resposta.ok) {
    throw new Error('erro ao salvar seu tweet, por favor tente novamente')
  }

  const tweetServidor = await resposta.json()
  console.log('tweet criado no servidor', tweetServidor)
  return tweetServidor
  }

  static async likeTweet(id) {
    const url = TWITTELUM_API + '/tweets/' + id + '/like?X-AUTH-TOKEN=' + getAuthToken()
    const resposta = await fetch( url, { method: 'POST'})

    const dadosServidor = await resposta.json()
    if (!resposta.ok) {
      throw new Error(dadosServidor.message)
    }
  }

  static async deleteTweet(id) {
    const url = TWITTELUM_API + '/tweets/' + id + '?X-AUTH-TOKEN=' + getAuthToken()
    const resposta = await fetch(url, {method: 'DELETE'})

    const dadosServidor = await resposta.json()
    if(!resposta.ok) {
      throw new Error(dadosServidor.message)
    }
    console.log('Tweet deletado' ,dadosServidor)
  }
}

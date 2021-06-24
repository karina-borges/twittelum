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
}

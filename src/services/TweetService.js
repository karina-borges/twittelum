import { TWITTELUM_API, getAuthToken } from '../utils';

export default class TweetService {

    /**
     * Retorna a lista de tweets do servidor da aplicação
     * @returns {Promise<Array>}
     */
    static async getTweets() {
        const url = TWITTELUM_API + '/tweets?X-AUTH-TOKEN=' + getAuthToken();
        const resposta = await fetch(url);

        if (!resposta.ok) {
            throw new Error('Erro ao retornar a lista de tweets do servidor!');
        }

        const tweets = await resposta.json();
        return tweets;
    }

    /**
     * Adiciona um tweet para o usuário atual
     * @param {string} conteudo     Conteúdo do Tweet
     * @returns {Promise<object>}
     */
    static async addTweet(conteudo) {
        const url = TWITTELUM_API + '/tweets?X-AUTH-TOKEN=' + getAuthToken();
        const resposta = await fetch( url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ conteudo })
        } );

        if (!resposta.ok) {
            throw new Error('Erro ao salvar seu Tweet. Por favor, tente novamente!');
        }

        const tweetServidor = await resposta.json();
        return tweetServidor;
    }

    /**
     * Curte/Descurte um tweet no servidor
     * @param {string} id   ID do Tweet a ser curtido/descurtido
     */
    static async likeTweet(id) {
        const url = TWITTELUM_API + '/tweets/' + id + '/like?X-AUTH-TOKEN=' + getAuthToken();
        const resposta = await fetch( url, {
            method: 'POST'
        });

        const dadosServidor = await resposta.json();
        if (!resposta.ok) {
            throw new Error(dadosServidor.message);
        }

        console.log('Tweet Like: ', dadosServidor);
    }

    /**
     * Remove um tweet no servidor de dados
     * @param {string} id    ID do Tweet
     */
    static async deleteTweet(id) {
        const url = TWITTELUM_API + '/tweets/' + id + '?X-AUTH-TOKEN=' + getAuthToken();
        const resposta = await fetch( url, {
            method: 'DELETE'
        });

        const dadosServidor = await resposta.json();
        if (!resposta.ok) {
            throw new Error(dadosServidor.message);
        }

        console.log('Tweet Deletado:', dadosServidor);
    }
}
import { TWITTELUM_API } from '../utils';

export default class LoginService 
{
    /**
     * Autentica o usuário na API da Aplicação e retorna um TOKEN de acesso.
     * @param {string} login 
     * @param {string} senha 
     * @returns {Promise<string>}
     */
    static async autenticar(login, senha)
    {
        const dadosLogin = { login, senha };
        const resposta = await fetch(TWITTELUM_API + '/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(dadosLogin)
        });

        if (!resposta.ok) {
            const resErroServidor = await resposta.json();
            const erro = new Error(resErroServidor.message);
            erro.status = resposta.status;
            throw erro;
        }

        const dadosServidor = await resposta.json();
        const token = dadosServidor.token;

        if (!token) {
            throw new Error('TOKEN não encontrado!');
        }

        localStorage.setItem('TOKEN', token);
    }
}

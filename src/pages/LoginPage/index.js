import { useContext, useRef } from 'react'
import {useHistory} from 'react-router-dom'
import LoginService from '../../services/LoginService'
import Cabecalho from '../../components/Cabecalho'
import Widget from '../../components/Widget'
import './loginPage.css'
import { Helmet } from 'react-helmet'
import NotificacaoContext from '../../contexts/NotificacaoContext'

function LoginPage() {
    const inputLogin = useRef()
    const inputSenha = useRef()
    const history = useHistory()
    const setNotificacao = useContext(NotificacaoContext)

    const handleLoginSubmit = async (e) => {
        e.preventDefault()
        let login = inputLogin.current.value.trim()
        let senha = inputSenha.current.value.trim()

        try {
            await LoginService.autenticar(login, senha)
            setNotificacao('Login realizado com sucesso')
            history.push('/')
        } catch(erro) {
            console.error(erro)
            setNotificacao(erro.message)
        } 
    }

    return (
        <>
            <Helmet>
                <title>Twitelum - Login</title>
            </Helmet>
            <Cabecalho />
            <div className="loginPage">
                <div className="container">
                    <Widget>
                        <h2 className="loginPage__title">Seja bem vindo!</h2>
                        <form onSubmit={handleLoginSubmit} className="loginPage__form" action="/">
                            <div className="loginPage__inputWrap">
                                <label className="loginPage__label" htmlFor="login">Login</label>
                                <input
                                    ref={inputLogin}
                                    className="loginPage__input"
                                    type="text"
                                    id="login"
                                    name="login"
                                />
                            </div>
                            <div className="loginPage__inputWrap">
                                <label className="loginPage__label" htmlFor="senha">Senha</label>
                                <input
                                    ref={inputSenha}
                                    className="loginPage__input"
                                    type="password"
                                    id="senha"
                                    name="senha"
                                />
                            </div>
                            <div className="loginPage__inputWrap">
                                <button className="loginPage__btnLogin" type="submit">
                                    Logar
                                </button>
                            </div>
                        </form>
                    </Widget>
                </div>
            </div>
        </>
    )
}


export default LoginPage
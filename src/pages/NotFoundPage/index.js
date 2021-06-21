import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

export default function NotFoundPage(props) {
    return (
        <>
            <Helmet>
                <title>Twittelum - Erro 404</title>
            </Helmet>
            <div className='container'>
                A URL <strong>{props.location.pathname}</strong> não existe no Twittelum,
                se quiser voltar para a <Link to='/'>página inicial basta clicar aqui.</Link>
            </div>
        </>
    )
}
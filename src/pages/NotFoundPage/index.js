import { Link } from 'react-router-dom'

export default function NotFoundPage(props) {
    return (
        <div className='container'>
            A URL <strong>{props.location.pathname}</strong> não existe no Twittelum,
            se quiser voltar para a <Link to='/'>página inicial basta clicar aqui.</Link>
        </div>
    )
}
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet';

export default function NotFoundPage( { location: { pathname } } ) {
    return (
        <>
            <Helmet>
                <title>Twittelum - Erro 404 | Página não encontrada</title>
            </Helmet>
            <div className="container">
                A URL <strong>{ pathname }</strong> não existe no Twittelum, se quiser voltar 
                para a <Link to="/">página inicial basta clicar aqui</Link>.
            </div>
        </>
    );
} 
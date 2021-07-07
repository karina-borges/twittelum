import cabecalhoStyles from './cabecalho.module.css';

function Cabecalho( { children } ) {
    return (
        <header className={cabecalhoStyles.cabecalho}>
            <div className={`${cabecalhoStyles.cabecalho__container} container`}>
                <h1 className={cabecalhoStyles.cabecalho__logo}>
                    <a href="/">Twitelum</a>
                </h1>
                { children }
            </div>
        </header>
    )
}

export default Cabecalho
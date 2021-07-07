import React from 'react';
import { Redirect } from 'react-router-dom';

export default function PrivateRoute(props) {
    let isAutenticado = localStorage.getItem('TOKEN') ? true : false;
    const { component: ComponentePrivado, ...propriedades } = props;

    if (isAutenticado) {
        // retornar o componente 
        return <ComponentePrivado {...propriedades} />;
    }
    else {
        return <Redirect to="/login" />;
    }
}

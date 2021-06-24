import React from 'react'
import {Redirect} from 'react-router-dom'

export default function PrivateRoute(props) {
  let isAutententicado = localStorage.getItem('TOKEN') ? true : false
  const {component: ComponentePrivado, ...propriedades} = props

  if (isAutententicado) {
    return <ComponentePrivado {...propriedades} />
  } else {
    return <Redirect to='/login'/>
  }
}

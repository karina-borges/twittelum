import React, { useState } from 'react';
import NotificacaoContext from '../../contexts/NotificacaoContext';

// import { Container } from './styles';

function Notificacao({ children }) {
  const [msg, setNotificacao] = useState('')

  return (
    <NotificacaoContext.Provider value={setNotificacao}>
      {children}
      {msg && 
        <div className="notificacaoMsg" onAnimationEnd={() => setNotificacao('')}>
          {msg}
        </div>
      }
    </NotificacaoContext.Provider>
  );
}

export default Notificacao;
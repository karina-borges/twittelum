import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet'
import Cabecalho from '../../components/Cabecalho'
import NavMenu from '../../components/NavMenu'
import Dashboard from '../../components/Dashboard'
import Widget from '../../components/Widget'
import TrendsArea from '../../components/TrendsArea'
import Tweet from '../../components/Tweet'
import FormNovoTweet from '../../components/FormNovoTweet'
import TweetService from '../../services/TweetService'
import NotificacaoContext from '../../contexts/NotificacaoContext';

function HomePage() {
  const [tweets, setTweets] = useState([])
  const setNotificacao = useContext(NotificacaoContext)

  useEffect(() => {
    TweetService.getTweets().then(listaTweets => setTweets(listaTweets))
  }, [])

  const addTweet = async (textoTweet) => {
    try {
      const tweetServidor = await TweetService.addTweet(textoTweet)
      setTweets([tweetServidor, ...tweets])
      setNotificacao('Tweet criado com sucesso')
  } catch (erro) {
    setNotificacao(erro.message)
    }
  }

  const deleteTweet = async (id) => {
    try {
      await TweetService.deleteTweet(id)
      const tweetsAtualizados = tweets.filter(tweet => tweet._id !== id)
      setTweets(tweetsAtualizados)
    } catch (erro) {
      setNotificacao(erro.message)
    }
  }

  return (
    <Fragment>
      <Helmet>
        <title>Twitelum ({`${tweets.length}`})</title>
      </Helmet>
      <Cabecalho>
        <NavMenu usuario="@omariosouto" />
      </Cabecalho>
      <div className="container">
        <Dashboard>
          <Widget>
            <FormNovoTweet addTweetCallback={addTweet}/>
          </Widget>
          <Widget>
            <TrendsArea />
          </Widget>
        </Dashboard>
        <Dashboard posicao="centro">
          <Widget>
            <div className="tweetsArea">
              {tweets.map((tweet, indice) => {
                return (
                  <Tweet
                      key={indice}
                      id={tweet._id}
                      conteudo={tweet.conteudo}
                      usuario={tweet.usuario}
                      likeado={tweet.likeado}
                      totalLikes={tweet.totalLikes}
                      removivel={tweet.removivel}
                      deleteTweetCallback={deleteTweet}
                  />
                )
              })}
            </div>
          </Widget>
        </Dashboard>
      </div>
    </Fragment>
  );
}

export default HomePage;

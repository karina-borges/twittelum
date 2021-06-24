import React, { Fragment, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet'
import Cabecalho from '../../components/Cabecalho'
import NavMenu from '../../components/NavMenu'
import Dashboard from '../../components/Dashboard'
import Widget from '../../components/Widget'
import TrendsArea from '../../components/TrendsArea'
import Tweet from '../../components/Tweet'
import FormNovoTweet from '../../components/FormNovoTweet'
import TweetService from '../../services/TweetService'

function HomePage() {
  const [tweets, setTweets] = useState([])

  useEffect(() => {
    TweetService.getTweets().then(listaTweets => setTweets(listaTweets))
    
  }, [])

  const addTweet = (tweet) => {
      setTweets([tweet, ...tweets])
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
                      id={tweet.id}
                      texto={tweet.conteudo}
                      usuario={tweet.usuario}
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

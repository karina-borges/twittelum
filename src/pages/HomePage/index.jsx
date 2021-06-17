import React, { Fragment, useState } from 'react';
import Cabecalho from '../../components/Cabecalho'
import NavMenu from '../../components/NavMenu'
import Dashboard from '../../components/Dashboard'
import Widget from '../../components/Widget'
import TrendsArea from '../../components/TrendsArea'
import Tweet from '../../components/Tweet'
import FormNovoTweet from '../../components/FormNovoTweet'

function HomePage() {
  const [tweets, setTweets] = useState([])

  const addTweet = (tweet) => {
      setTweets([tweet, ...tweets])
  }

  return (
    <Fragment>
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
              {tweets.map((tweetTexto, indice) => {
                return (
                  <Tweet
                      key={indice}
                      texto={tweetTexto}
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

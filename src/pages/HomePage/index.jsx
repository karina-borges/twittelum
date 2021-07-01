import React, { Fragment, useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Cabecalho from "../../components/Cabecalho";
import NavMenu from "../../components/NavMenu";
import Dashboard from "../../components/Dashboard";
import Widget from "../../components/Widget";
import TrendsArea from "../../components/TrendsArea";
import Tweet from "../../components/Tweet";
import FormNovoTweet from "../../components/FormNovoTweet";
import TweetService from "../../services/TweetService";
import NotificacaoContext from "../../contexts/NotificacaoContext";
import { useSelector, useDispatch } from "react-redux";
import { TweetThunkActions } from "../../store/ducks/tweets";

function HomePage() {
  // const [tweets, setTweets] = useState([])
  const { data: tweets, erro } = useSelector((state) => state.tweets);
  const dispatch = useDispatch();
  const setNotificacao = useContext(NotificacaoContext);

  useEffect(() => {
    if (erro) {
      setNotificacao(erro);
    } else {
      dispatch(TweetThunkActions.loadTweet());
    }
  }, [erro]);

  const addTweet = async (textoTweet) =>
    dispatch(TweetThunkActions.addTweet(textoTweet));

  const deleteTweet = async (id) => {
    try {
      await TweetService.deleteTweet(id);
      const tweetsAtualizados = tweets.filter((tweet) => tweet._id !== id);
      // setTweets(tweetsAtualizados)
    } catch (erro) {
      setNotificacao(erro.message);
    }
  };

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
            <FormNovoTweet addTweetCallback={addTweet} />
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
                );
              })}
            </div>
          </Widget>
        </Dashboard>
      </div>
    </Fragment>
  );
}

export default HomePage;

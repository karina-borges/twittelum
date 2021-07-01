import TweetService from "../../services/TweetService";
// Action types
const ActionTypes = {
  LOAD_TWEETS: "tweets/LOAD",
  ADD_TWEET: "tweets/ADD",
  ERROR_TWEET: "tweets/ERROR",
};

const initialState = {
  data: [],
  erro: "",
};

export function tweetsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionTypes.LOAD_TWEETS:
      return {
        data: action.payload.tweets,
        erro: "",
      };

    case ActionTypes.ADD_TWEET:
      return {
        data: [action.payload.tweets, ...state],
        erro: "",
      };

    case ActionTypes.ERROR_TWEET:
      return {
        ...state,
        erro: action.payload.erro,
      };

    default:
      return state;
  }
}

export const TweetThunkActions = {
  loadTweet() {
    return async function (dispatch) {
      const tweets = await TweetService.getTweets();
      dispatch({ type: ActionTypes.LOAD_TWEETS, payload: { tweets } });
    };
  },

  addTweet(novoTweet) {
    return async function (dispatch) {
      try {
        const tweet = await TweetService.addTweet(novoTweet);
        dispatch({ type: ActionTypes.ADD_TWEET, payload: { tweet } });
      } catch (erro) {
        dispatch({
          type: ActionTypes.ERROR_TWEET,
          payload: { erro: erro.message },
        });
      }
    };
  },
};

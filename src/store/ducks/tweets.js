import TweetService from "../../services/TweetService";

// ActionTypes
const ActionTypes = {
    LOAD_TWEETS: 'tweets/LOAD',
    ADD_TWEET: 'tweets/ADD',
    REMOVE_TWEET: 'tweets/REMOVE',
    LIKE_TWEET: 'tweets/LIKE',
    ERROR_TWEET: 'tweets/ERROR'
}

// Reducer
const initialState = {
    data: [],
    erro: ''
}

export function tweetsReducer( state = initialState, action = {} )
{
    switch ( action.type )
    {
        case ActionTypes.LOAD_TWEETS :
            return {
                data: action.payload.tweets,
                erro: ''
            }

        case ActionTypes.ADD_TWEET :
            return {
                data: [ action.payload.tweet, ...state.data ],
                erro: ''
            }

        case ActionTypes.REMOVE_TWEET :
            return {
                data: state.data.filter(tweet => tweet._id !== action.payload.id),
                erro: ''
            }

        case ActionTypes.LIKE_TWEET :
            return {
                erro: '',
                data: state.data.map(tweet => {
                    if (tweet._id === action.payload.id) {
                        let likes = tweet.totalLikes;
                        tweet.likeado = !tweet.likeado;
                        tweet.totalLikes = tweet.likeado ? likes + 1 : likes - 1;
                    }

                    return tweet;
                })
            }

        case ActionTypes.ERROR_TWEET :
            return {
                ...state,
                erro: action.payload.erro
            }

        default:
            return state;
    }
}

// Action Creators (Thunk)
export const TweetThunkActions = {
    loadTweets() {
        return async function(dispatch) {
            const tweets = await TweetService.getTweets();
            dispatch({ type: ActionTypes.LOAD_TWEETS, payload: { tweets } });
        }
    },

    addTweet(novoTweet) {
        return async function(dispatch) {
            try {
                const tweet = await TweetService.addTweet(novoTweet);
                dispatch({ type: ActionTypes.ADD_TWEET, payload: { tweet } });
            }
            catch(erro) {
                dispatch({ type: ActionTypes.ERROR_TWEET, payload: { erro: erro.message } });
            }
        }
    },

    deleteTweet(id) {
        return async function(dispatch) {
            try {
                dispatch({ type: ActionTypes.REMOVE_TWEET, payload: { id } });
                await TweetService.deleteTweet(id);
            }
            catch(erro) {
                dispatch({ type: ActionTypes.ERROR_TWEET, payload: { erro: erro.message } });
            }
        }
    },

    likeTweet(id) {
        return async function(dispatch) {
            try {
                dispatch({ type: ActionTypes.LIKE_TWEET, payload: { id } });
                await TweetService.likeTweet(id);
            }
            catch(erro) {
                dispatch({ type: ActionTypes.ERROR_TWEET, payload: { erro: erro.message }});
            }
        }
    }
}
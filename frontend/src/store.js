import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
// import { userReducer, usersReducer, postReducer, postsReducer } from './reducers';
import { appReducer, userReducer, usersReducer, postReducer, postsReducer } from "./reducers";

const reducer = combineReducers({
    app:    appReducer,
    user:   userReducer,
    users:  usersReducer,
    post:   postReducer,
    posts:  postsReducer,
});

const composeEnhangers = window.__REDUX_DEVTOOLS_EXTENTION_COMPOSE___ || compose;

export const store = createStore(reducer, composeEnhangers(applyMiddleware(thunk)));

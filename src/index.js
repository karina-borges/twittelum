import React from "react";
import ReactDOM from "react-dom";
import { Switch, Route, BrowserRouter } from "react-router-dom"

// CSSs Globais
import "./assets/css/reset.css";
import "./assets/css/container.css";
import "./assets/css/btn.css";
import "./assets/css/icon.css";
import "./assets/css/iconHeart.css";
import "./assets/css/notificacao.css";

import "./assets/css/novoTweet.css";
// import './index.css';

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage"
import NotFoundPage from "./pages/NotFoundPage";
import * as serviceWorker from "./serviceWorker";
import Notificacao from './components/Notificacao/index'
import PrivateRoute from "./routes/PrivateRoute"

ReactDOM.render(
    <Notificacao>
        <BrowserRouter>
            <Switch>
                <PrivateRoute path="/" component={HomePage} exact/>
                <Route path="/login" component={LoginPage} exact/>
                <Route component={NotFoundPage} />
            </Switch>
        </BrowserRouter>
    </Notificacao>
    , document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

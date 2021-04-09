import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import App from "./App";
import { Signin } from './components/signin'

const Routes = () => {
    return (
        <>
            <Route exact path="/" component={App} />
            <Route path = "/signin" component={Signin}/>
        </>
    )
};

export default Routes;
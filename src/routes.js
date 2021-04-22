import React from "react";
import { BrowserRouter as Switch, Route, Redirect } from "react-router-dom";
import App from "./App";
import SignIn  from "./views/signIn/signIn";
import SignUp from "./views/signUp/signUp";
import NotFoundPage from "./views/404";
import DashBoard from "./views/dashboard/dashboard"
import DomainManage from "./views/domainManage/domainManage"
import Weakness from "./views/weakness/weakness"
import Detail from "./views/detail/detail"
import "antd/dist/antd.css";
import UserContext from "./contexts/user/userContext"

const Routes = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/404" component={NotFoundPage} />

        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        
        <Route exact path="/dashboard" component={DashBoard} />
        <Route exact path="/domain" component={DomainManage} />
        <Route exact path="/weakness" component={Weakness} />
        <Route exact path="/detail" component={Detail} />
        {/* <Redirect to="/404" /> */}
      </Switch>
    </>
  );
};

export default Routes;

import React, { useState } from "react";
import { BrowserRouter as Switch, Route, Redirect } from "react-router-dom";
import App from "./App";
import SignIn from "./views/signIn/signIn";
import SignUp from "./views/signUp/signUp";
import NotFoundPage from "./views/404";
import DashBoard from "./views/dashboard/dashboard";
import DomainManage from "./views/domainManage/domainManage";
import Weakness from "./views/weakness/weakness";
import DetailDomain from "./views/detail/detailDomain";
import DetailVuln from "./views/detail/detailVuln";
import User from "./views/user/user";
import "antd/dist/antd.css";
import UserContext from "./contexts/user/userContext";

const Routes = () => {
  const [user, setUser] = useState(null);

  return (
    <>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/404" component={NotFoundPage} />
        <UserContext.Provider value={{ user, setUser }}>
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />

          <Route exact path="/dashboard" component={DashBoard} />
          <Route exact path="/domain" component={DomainManage} />
          <Route exact path="/weakness" component={Weakness} />
          <Route exact path="/detail-domain/:id/:time?" component={DetailDomain} />
          <Route exact path="/detail-vuln/:vulnID/:id?" component={DetailVuln} />
          <Route exact path="/user/me" component={User} />
          {/* <Redirect to="/404" /> */}
        </UserContext.Provider>
      </Switch>
    </>
  );
};

export default Routes;

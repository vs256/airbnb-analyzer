import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
/* import SignIn from "./pages/SignIn";*/
import Pricing from "./pages/Pricing";
import App from "./App";

function Landing() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/APP">
          <App />
        </Route> 
        {/*<Route exact path="/signin">
          <SignIn />
        </Route>*/}
      </Switch>
    </Router>
  );
}

export default Landing;
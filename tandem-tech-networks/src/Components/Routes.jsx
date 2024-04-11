import React from "react";
import { Redirect, Switch, Route, Router } from "react-router-dom";
import RouteGuard from "./Components/RouteGuard";
import history from "history";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import HomePage from "../Pages/HomePage";



const Routes = () => {
    return (
        <Router history={history}>
            <Switch>
                <RouteGuard path="/home" component={HomePage} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Redirect from="/" />
            </Switch>
        </Router>
    );
}


export default Routes;
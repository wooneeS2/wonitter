import React, { useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "routes/Profile";
import Navigation from "components/Navigation";


const AppRouter = ({isLoggedIn}) => {
   
    return (
        <Router>
            {isLoggedIn && <Navigation/>}
            {/* navigation이 존재하려면 isloggedin은 true여야함. */}
            <Switch>
                {isLoggedIn ? (
                    <>
                        <Route exact path="/">
                            <Home />
                            {/* 로그인하면 홈화면 */}
                        </Route>
<Route exact path="/profile">
 <Profile />   
</Route>
 


                    </>) : (<Route exact path="/"><Auth /></Route>)}
                {/* 로그인 안했을때는 Auth */}
            </Switch>
        </Router>
    );
};

export default AppRouter;
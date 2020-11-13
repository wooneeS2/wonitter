import React, { useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";


const AppRouter = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return (
        <Router>
            <Switch>
                {isLoggedIn ? (
                    <>
                        <Route exact path="/">
                            <Home />
                            {/* 로그인하면 홈화면 */}
                        </Route>

                    </>) : (<Route exact path="/"><Auth /></Route>)}
                {/* 로그인 안했을때는 Auth */}
            </Switch>
        </Router>
    );
};

export default AppRouter;

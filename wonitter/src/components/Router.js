import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";


export default () => {
    const [isLoggedIn, setIsLoggedIn] = useState();
    return (
        <Router>
            <Switch>
                {isLoggedIn ?
                    <>
                        <Route exact path="/">
                            <Home />
                            {/* 로그인하면 홈화면 */}
                        </Route>

                    </> : <Route><Auth /></Route>}
                {/* 로그인 안했을때는 Auth */}
            </Switch>
        </Router>
    );
};
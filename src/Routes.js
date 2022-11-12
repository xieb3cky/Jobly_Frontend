import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Companies from "./companies/Companies";
import Company from "./companies/Company";
import Jobs from "./jobs/Jobs";
import LoginForm from "./auth/LoginForm";
import SignupForm from "./auth/SignupForm";
import Homepage from "./auth/Homepage";
import ProfileForm from "./profile/ProfileForm";

import PrivateRoute from "./PrivateRoute";

function Routes({ login, signup }) {



    return (
        <Switch>
            <Route exact path="/">
                <Homepage />
            </Route>
            <Route exact path="/login">
                <LoginForm login={login} />
            </Route>
            <Route exact path="/signup">
                <SignupForm signup={signup} />
            </Route>
            <PrivateRoute exact path="/companies">
                <Companies />
            </PrivateRoute>
            <PrivateRoute exact path="/companies/:handle">
                <Company />
            </PrivateRoute>
            <PrivateRoute exact path="/profile">
                <ProfileForm />
            </PrivateRoute>
            <PrivateRoute exact path="/jobs">
                <Jobs />
            </PrivateRoute>
            <Redirect to="/" />
        </Switch>

    )
}

export default Routes;



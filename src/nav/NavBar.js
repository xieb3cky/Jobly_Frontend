/**
Show links to the login and signup forms if a user is not currently logged in.
If someone is logged in, show their username in the navigation,
along with a way to log out.
 */

import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./NavBar.css"

function NavBar({ signout }) {

    const { currUser } = useContext(UserContext);

    function loggedIn() {
        return (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item mr-4 ms-4">
                    <NavLink className="nav-link" to="/companies">
                        Companies
                    </NavLink>
                </li>
                <li className="nav-item mr-4 ms-2">
                    <NavLink className="nav-link" to="/jobs">
                        Jobs
                    </NavLink>
                </li>
                <li className="nav-item mr-4 ms-2">
                    <NavLink className="nav-link" to="/profile">
                        Profile
                    </NavLink>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/signout" onClick={signout}>
                        Sign Out
                    </Link>
                </li>
            </ul>
        )
    }
    function loggedOut() {
        return (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item mr-4 ms-2">
                    <NavLink className="nav-link" to="/login">
                        Log In
                    </NavLink>
                </li>
                <li className="nav-item mr-4 ms-2">
                    <NavLink className="nav-link" to="/signup">
                        Sign Up
                    </NavLink>
                </li>
            </ul>
        )
    }

    return (
        <div>
            <nav className="Navigation navbar navbar-expand-md mx-2">
                <Link to="/">Jobly</Link >
                {currUser ?
                    loggedIn()
                    :
                    loggedOut()
                }
            </nav>
        </div >
    )
}

export default NavBar;


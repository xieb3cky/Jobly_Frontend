/**
 * Homepage shows different message if user is logged in or out.
 * 
 * @ "/"
 * 
 */

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "./UserContext";


function Homepage() {
    const { currUser } = useContext(UserContext);
    return (
        <div>
            {
                currUser ?
                    <h2>Welcome back {currUser.firstName}! </h2>
                    :
                    (
                        <div>
                            <h1> Find your next job!</h1>
                            <div>
                                <Link to="/login">
                                    Log In
                                </Link>
                            </div>
                            <div>
                                <Link to="/signup">
                                    Sign Up
                                </Link>
                            </div>
                        </div>
                    )
            }
        </div>
    )
}

export default Homepage;
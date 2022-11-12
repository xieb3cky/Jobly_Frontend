import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";
import NavBar from "./nav/NavBar";
import JoblyApi from './api';
import UserContext from "./auth/UserContext";
import useLocalStorage from './hooks/useLocalStorage';
import jwt from "jsonwebtoken";



function App() {


  const [currUser, setCurrUser] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState(new Set([]))
  const [token, setToken] = useLocalStorage("token", null);


  /**
   * Create an effect triggered by a state change of the token: 
   * Makes a API call to get info on the newly-logged-in user --> 
   * store it in the currUser state.
   * 
   */
  useEffect(() => {
    async function getcurrUser() {
      if (token) {
        try {
          let { username } = jwt.decode(token);
          JoblyApi.token = token;
          let currUser = await JoblyApi.getCurrUser(username);
          setCurrUser(currUser);
          setAppliedJobs(new Set(currUser.applications))
        } catch (err) {
          console.error("Error loading user information.", err);
          setCurrUser(null);
        }
      }
    }
    getcurrUser();
  }, [token])

  /**Log in the user: make API call with log in info --> store the token */
  async function login(data) {
    try {
      let token = await JoblyApi.login(data);
      setToken(token);
      return { success: true };
    } catch (err) {
      console.error("log in fail :( !");
      return { success: false, err }
    }
  }

  /**Sign up new user: make API call with new user info --> store the token */
  async function signup(data) {
    try {
      let token = await JoblyApi.signup(data);
      setToken(token);
      return { success: true };
    } catch (err) {
      console.error("sign up fail :( !");
      return { success: false, err }
    }
  }

  /**Sign user out : reset currUser and Token stored */
  function signout() {
    setCurrUser(null);
    setToken(null);
  }

  /**Check if user applied to the job */
  function appliedTo(id) {
    return appliedJobs.has(id);
  }


  /**Apply to a job : makes API call --> update the set of appliedIDs with applied job ID*/
  function applyJob(id) {
    if (appliedTo) return;
    JoblyApi.applyToJob(currUser.username, id);
    setAppliedJobs(new Set([...appliedJobs, id]));
  };

  return (
    <div>
      <BrowserRouter>
        <UserContext.Provider value={{ currUser, setCurrUser, appliedTo, applyJob }}>
          <NavBar signout={signout} />
          <Routes login={login} signup={signup} />
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;

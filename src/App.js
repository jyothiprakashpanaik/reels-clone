import React, { useContext } from 'react'
import Signup from './components/Signup';
import Profile from './components/Profile';
import Feed from "./components/Feed";
import Login from "./components/Login";
import Forget from "./components/Forget";
import PageNotFound from "./components/PageNotFound";
import "./App.css";
import AuthContextProvider, { AuthContext } from './AuthContext';
import { Redirect, Route, Switch } from "react-router-dom";
function App() {
  return (

    <AuthContextProvider>


      <>
        <Switch>
          <RestrictedRoute path="/login" comp={Login} />
          <RestrictedRoute path="/signup" comp={Signup} />
          <RestrictedRoute path="/forget" comp={Forget} />

          <PrivateRoute path="/feed" comp={Feed} />
          <PrivateRoute path="/profile" comp={Profile} />
          
          <Redirect from='/' exact to="/feed" />

          <Route>
            <PageNotFound />
          </Route>
        </Switch>
      </>

    </AuthContextProvider>
  )
}

function PrivateRoute(props) {
  let Component = props.comp;
  let user = useContext(AuthContext);
  return (
    <Route
      {...props}
      render={
        (props) => {
          return user != null?
            <Component {...props} /> :
            <Redirect to="/login" />
        }
      }
    />)
}

function RestrictedRoute(props) {
  let Component = props.comp;
  let user = useContext(AuthContext);
  return (
    <Route
      {...props}
      render={
        (props) => {
          return user == null ?
            <Component {...props} /> :
            <Redirect to="/feed" />
        }
      }
    />)
}

export default App;
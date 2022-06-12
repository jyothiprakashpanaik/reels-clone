import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import React, { useState } from 'react'
import { auth } from "../firebase";
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { useContext } from 'react';

function Login() {
  const user = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");

  const trackEmail = (event) => {
    setEmail(event.target.value);
  }

  const trackPassword = (event) => {
    setPassword(event.target.value);
  }

  const trackDetails = async () => {
    console.log("Email:=", email, "Password:=", password)

    try {
      setLoader(true);
      let userCred = await
        signInWithEmailAndPassword(auth, email, password);
      setLoader(false);
    }
    catch (err) {
      setLoader(false);

      setError(err.message);

      setTimeout(() => {
        setError("")
      }, 2000);
    }
  }

  const signout = () => {
    try {
      signOut(auth);
    }
    catch (err) {
      setError(err.message);
      setTimeout(() => {
        setError("")
      }, 2000);
    }
  }


  return (
    <>
      {
          error != "" ? <h1>Error {error} </h1> :
            loader == true ? <h1>Loading Data</h1> :
              user != null ? <>
                <button onClick={signout}>SignOut</button>
                <h1>User {user.uid}</h1>
              </> :
                <>
                  <input type="email" placeholder='email' value={email} onChange={trackEmail}></input>
                  <br></br>
                  <input type="password" placeholder='password' value={password} onChange={trackPassword}></input>
                  <br></br>
                  <button type='click' onClick={trackDetails}>Login</button>
                  <br></br>
                  <Link to="/signup">SignUp</Link>
                </>
      }
    </>
  )
}

export default Login;
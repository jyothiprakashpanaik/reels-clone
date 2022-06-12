import { async } from '@firebase/util';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { auth, db } from "../firebase";
import { doc,setDoc } from "firebase/firestore";


function Signup() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const [user, setUser] = useState(null);

  const trackEmail = (event) => {
    setEmail(event.target.value);
  }

  const trackPassword = (event) => {
    setPassword(event.target.value);
  }

  const trackFullName = (event) => {
    setFullName(event.target.value);
  }

  const trackDetails = async () => {
    try {
      setLoader(true);
      let userCred = await createUserWithEmailAndPassword(auth, email, password);
      setLoader(false);

      await setDoc(doc(db, "users", userCred.user.uid), {
        email: email,
        password: password,
        name: fullName,
        profileUrl: "",
        reelsIds: [],
        userId: userCred.user.uid,
      });
      setUser(userCred.user.uid);
    }
    catch (err) {
      console.log(err);
      setLoader(true);
      setError(err.message);

      setTimeout(()=>{
        setError("")
      },2000);
      setLoader(false);
    }
  }

  return (
    error != "" ? <h1>Error {error}</h1> :
    loader==true?<h1>Loading...</h1>:
    user!=null?<h1>User Signed In {user}</h1>:
      <>
        <input type="email" placeholder='email' value={email} onChange={trackEmail}></input>
        <br></br>
        <input type="password" placeholder='password' value={password} onChange={trackPassword}></input>
        <br></br>
        <input type="text" placeholder='Full Name' value={fullName} onChange={trackFullName}></input>
        <br></br>
        <input type="file" id="" />
        <br></br>
        <button type='click' onClick={trackDetails}>Login</button>
        <Link to="/login">Login</Link>
      </>

  )
}

export default Signup;
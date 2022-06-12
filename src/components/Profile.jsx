import React, { useState } from 'react';
import "./Profile.css";

import { AuthContext } from '../AuthContext';
import { useContext } from 'react';

import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase';
import { useEffect } from 'react';
import NavBar from './NavBar';


function Profile() {

  let user = useContext(AuthContext);



  const [userName, setUserName] = useState("");
  const [numberOfPosts, setNumberOfPosts] = useState(0);
  const [userEmail, setUserEmail] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const userObj = await getDoc(docRef);
        console.log("Document data:", userObj.data());

        setUserName(userObj.data().name);
        setNumberOfPosts(userObj.data().reelsIds.length);
        setUserEmail(userObj.data().email);
        setLoading(false);

      }
    }
    fetchData();
  }, [user]);

  return (
    <>
    <NavBar />
    {
      user == null ? <h1>Need to Login</h1> :
        loading == true ? <h1>Loading...</h1> :
          <div className='profile'>
            <div className='main'>
              <img src="https://avatars.githubusercontent.com/u/64550298?s=400&u=9579f823a41d19f8a4b3348cbc60697265a602e5&v=4" className='pimg'></img>
              <div className='details'>
                <div className='content'>Hi👋, {userName}</div>
                <div className='content'>No of Posts📸: <span className='text_bold'>{numberOfPosts} Posts</span> </div>
                <div className='content'>Email💌: <span className='text_bold'>{userEmail}</span> </div>
              </div>
            </div>
          </div>
    }
    </>
  )
}

export default Profile
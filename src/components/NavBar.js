import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "./NavBar.css";

import { signOut } from 'firebase/auth';
import { auth } from "../firebase";

function NavBar() {
    const [error, setError] = useState("");

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
            <div className='header'>
                <img className="logo" src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png"></img>
                <div className='options'>
                    <span class="material-icons">
                        <Link to={"/feed"} className="headerLink">home</Link>
                    </span>
                    <span class="material-icons">
                        explore
                    </span>
                    <span class="material-symbols-outlined" onClick={signout} style={{cursor:'pointer'}}>
                        logout
                    </span>
                    <Link to={"/profile"}>
                        <img className="avatar" src='https://avatars.githubusercontent.com/u/64550298?s=400&u=9579f823a41d19f8a4b3348cbc60697265a602e5&v=4'></img>
                    </Link>
                </div>
            </div>

        </>
    )
}

export default NavBar
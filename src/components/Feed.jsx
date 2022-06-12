import React from 'react'
import "./Feed.css";
import NavBar from './NavBar';
function Feed() {
  return (
    <div>
      <NavBar />
      <div className="main_container">
        <div className='upload_container'><span class="material-icons">
          movie
        </span>
          UPLOAD REEL</div>
        <div className='display_container'>Video</div>
      </div>
    </div>
  )
}

export default Feed
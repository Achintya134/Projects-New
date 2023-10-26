import React from "react";

//to display the landing page of the website
function FrontPage(props) {
  return (
    <div className="container page">
      <video src="/videos/home.mp4" autoPlay loop muted />
      <h1>
        <b>Tracker</b>
      </h1>
      <p>Track all your activities at one place!</p>
      <a href="/RegisterUser" className="btn btn-hero" onClick={()=>props.loadPage1(true)}>
        Login/Register
      </a>
    </div>
  );
}

export default FrontPage;

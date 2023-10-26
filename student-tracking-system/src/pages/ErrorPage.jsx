import React from "react";
import img from "../images/images.png";
import "../layout/ErrorPage.css";

// error page which is displayed when user types an incorrect url and adding a link to redirect the user back to homepage
const ErrorPage = () => {
  return (
    <div className="errorCom">
      <h1>
        <b>ErrorPage</b>
      </h1>
      <p>Looks like your search URL is incorrect!</p>
      <img src={img} alt="error" />

      <a href="/">BackHome</a>
    </div>
  );
};

export default ErrorPage;

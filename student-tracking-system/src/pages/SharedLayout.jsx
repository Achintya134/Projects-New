// import { Outlet, Link } from "react-router-dom";
import "../layout/SharedLayout.css";
//setting up nav bar and giving stucture to the nested pages
import Navbar from "../components/Navbar";
import SmallSidebar from "../components/SmallSidebar";
import BigSidebar from "../components/BigSidebar";
import { useContextApp } from "../context/contextApp";
import ExpenditureTracking from './ExpenditureTracking';
import JobApplications from './JobApplications';
import Profile from "./Profile";
import ManageGrades from "./ManageGrades";
import { useState, useEffect } from "react";
import ErrorPage from "./ErrorPage";

//setting up big side bar for full screen , small side bar for smaller screens and nav bar to navigate to diff pages
const SharedLayout = () => {
  const [page, setpage]= useState("")
  const {
    pageName,
    user,
    userid,
    displayAlertMsg,
    showAlert,
    userRegistration,
    isLogin,
    getProfile,
  } = useContextApp();

  useEffect(()=>{ 
    if(isLogin !== false)
    {
      getProfile(userid);
    }
  switch(pageName)
    {
      case 'Profile': setpage("profile");
      break;
      case 'manageGrades': setpage("manageGrades")
      break;
      case 'ExpenditureTracking': setpage("ExpenditureTracking")
      break;
      case 'jobApplications': setpage('jobApplications');
      break;
      default: setpage('Error');
        break; 
    }

},[pageName]);


  return (
    <main className="dashboard">
      <SmallSidebar></SmallSidebar>
      <BigSidebar></BigSidebar>
      <div>
        <Navbar></Navbar>
        <div class="dashboard-page">
          {page === "profile" && (<Profile/>)}
          {page === "manageGrades" && (<ManageGrades/>)}
          {page === "jobApplications" && (<JobApplications/>)}
          {page === "ExpenditureTracking" && (<ExpenditureTracking/>)}
        </div>
      </div>
    </main>
  );
};

export default SharedLayout;

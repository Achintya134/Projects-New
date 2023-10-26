//import {useState} from 'react';
import  AlertMessage  from '../components/AlertMessage';
import  FormInput  from '../components/FormInput';

import { useState, useEffect } from "react";
import { useContextApp } from '../context/contextApp';

const State = {
    name: "",
    email: "",
    password: "",
    isaMember: true,
    //displayAlertMsg: false,
  };
  
function Login(){
    const [username, setUsername] = useState("");
    const [visible, setVisible] = useState(false);
    const [values, setValues] = useState(State);
    const {
          user,
          isLoading,
          displayAlertMsg,
          showAlert,
          userRegistration,
          loginUser,
          setupUser,
        } = useContextApp();
      
        //to toggle between login and register form
        const toggleRegister = () => {
          setValues({ ...values, isaMember: !values.isaMember });
        };
      
        //Function to change after user changes his input
        const handleChange = (e) => {
          setValues({ ...values, [e.target.name]: e.target.value });
        };
      
        //Function to perform action after user clicks on submit button
        const fnSubmit = (e) => {
          e.preventDefault();
          const { name, email, password, isaMember } = values;
      
          //adding validation check for the input fields before submit
          if (
            !values.email ||
            (!values.isaMember && !values.name)
          ) {
            showAlert();
            return;
          }
          const currentUser = { name, password, email };
          if (isaMember) {
            loginUser(currentUser.email);
            
            } else {
            userRegistration(currentUser);
            e.preventDefault();
            }
          
        };

    return(
        <div className="regCom">
      {/*Form HTML element for user Login or Registration */}

      <h1>
        <b>Student Activity Tracker</b>
      </h1>
      <form className="formReg" onSubmit={fnSubmit}>
        <h3>{values.isaMember ? "Log-in" : "Register Now"}</h3>
        {displayAlertMsg && <AlertMessage></AlertMessage>}

        {/* Form Name input field HTML elements displayed only for non members */}
        {!values.isaMember && (
          <FormInput
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
        )}

        {/* Form Email input field HTML elements */}
        <FormInput
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          Submit 
        </button>
        {/* Adding a register button and calling the toggle function between registered user login and new user login*/}
        <p>
          {values.isaMember ? "Not a member?" : "Already a member?"}
          <button type="button" onClick={toggleRegister} className="member-btn">
            {values.isaMember ? "Register Now" : "Log-in"}
          </button>
        </p>
      </form>
      <h1></h1>
    </div>
    );

}

export default Login;
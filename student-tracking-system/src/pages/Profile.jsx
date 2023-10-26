import { useState, useEffect } from "react";
import "../layout/DashboardPage.css";
import  AlertMessage  from '../components/AlertMessage';
import  FormInput  from '../components/FormInput';
 import { useContextApp } from "../context/contextApp";

const Profile = ({userid}) => {
  const { user,lastName, userLocation,  showAlert, updateUser, isLoading, getProfile, isLogin } = useContextApp();
  const [name, setName] = useState(user);
  const [email, setEmail] = useState(userid);
  const [lastname, setLastName] = useState(lastName);
  const [loc, setLocation] = useState(userLocation);

  const handleSubmit = (e) => {
    e.preventDefault();
    //checking for empty values in the profile page
    if (!name || !email || !lastname || !loc) {
      showAlert();
      return;
    }
    updateUser( name, email, lastname, loc );
  };

  useEffect(() => {
    // Update the document title using the browser API
    if(isLogin !== false)
    {
      getProfile(userid);
    }
  },[userid, isLogin]);

  return (
    <div className="jobCommon">
      <form onSubmit={handleSubmit} className="form">
        <h3>profile</h3>
        {showAlert && <AlertMessage />}
        <div className="form-center">
          <FormInput
            type="text"
            name="name"
            value={name}
            handleChange={(e) => setName(e.target.value)}
            placeholder = "Enter your first name"
          />
          <FormInput
            type="text"
            labelText="Last Name"
            name="lastName"
            value={lastname}
            handleChange={(e) => setLastName(e.target.value)}
            placeholder = "Enter your last name"
          />
          <FormInput
            type="email"
            labelText="Email"
            name="email"
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
            placeholder = "Enter an email"
          />
          <FormInput
            type="text"
            name="location"
            value={loc}
            handleChange={(e) => setLocation(e.target.value)}
            placeholder = "Enter your location"
          />
          <button className="btn btn-block" type="submit" disabled={isLoading}>
             {isLoading ? "Loading.." : "Save"} 
          </button>
        </div>
      </form>
      
    </div>
  );
};

export default Profile;

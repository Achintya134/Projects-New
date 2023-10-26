import "../layout/navBar.css";
import { useContextApp } from "../context/contextApp";

import { useState } from "react";
const Navbar = () => {
  //toggling small side bar for smaller screens
  const [showLogout, setShowLogout] = useState(false);

  const { toggleSidebar, logoutUser, user } = useContextApp();
  return (
    <div className="navCom">
      <div className="nav-center">
        <div>
          <h3 className="logo-text">Student Tracker</h3>
          <h5 className="logo-text">Track All Your Student activities in One Place!</h5>
        </div>
        <div className="btn-container">
          <button
            type="button"
            className="btn"
            onClick={() => setShowLogout(!showLogout)}
          >
            {user}
          </button>
          <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
            <button type="button" className="dropdown-btn" onClick={logoutUser}> 
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

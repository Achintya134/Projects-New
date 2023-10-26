import "../layout/smallSidebar.css";
// import { FaTimes } from "react-icons/fa";
// import Logo from "./Logo";
import { useContextApp } from "../context/contextApp";
import NavLinks from "./NavLinks";

//setting up the small side bar for making the screen responsive when the size of the screen is reduced
const SmallSidebar = () => {
  const { togglePage } = useContextApp();
  const showSidebar = true;
  return (
    <h4>
      <div
        className={
          showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          <button type="button" className="close-btn" >
          {/* <button type="button" className="close-btn" onClick={toggleSidebar}> */}
            {/* <FaTimes /> */}
          </button>
          <header>
            {/*<Logo />*/}
            Student Tracker
          </header>
          <NavLinks togglePage={togglePage}/>
        </div>
      </div>
    </h4>
  );
};

export default SmallSidebar;

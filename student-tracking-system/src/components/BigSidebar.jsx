import "../layout/BigSideBar.css";
// import { useContextApp } from "../context/contextApp";
import NavLinks from "./NavLinks";
// import Logo from "../components/Logo";

//this is the big side bar which contains the navigation links to different pages of the application
const BigSidebar = () => {
  // const { showSideBar, toggleSidebar } = useContextApp();
  const showSideBar=true;
  return (
    <div className="bigSidecom">
      <div
        className={
          showSideBar ? "sidebar-container" : "sidebar-container show-sidebar"
        }
      >
        <div className="content">
          <header>
            {/* <Logo /> */}
            <h2>LOGO 2</h2>
          </header>
          {/* <NavLinks toggleSidebar={toggleSidebar} /> */}
        </div>
      </div>
    </div>
  );
};

export default BigSidebar;

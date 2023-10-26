 import links from "./links";

//setting up links for small side bar when the
const NavLinks = ({ userid,togglePage }) => {
  return (
    <div className="nav-links">
      {links.map((item) => {
        const { text, path, id, pageName } = item;
        return (
          <a
            onClick={(e) => {e.preventDefault();togglePage(pageName);}}
            class={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            {text}
          </a>
        );
      })}
    </div>
  );
};

export default NavLinks;

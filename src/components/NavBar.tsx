import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/bookmark">Bookmark</NavLink>
    </>
  );
}

export default NavBar;

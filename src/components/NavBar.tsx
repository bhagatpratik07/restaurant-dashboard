import { NavLink } from "react-router-dom";
import "../styles/nav.css";

function NavBar() {
  return (
    <nav>
      <h1>Dashboard</h1>
      <NavLink to="/">Home Page</NavLink>
      <NavLink to="/bookmark">Bookmarked Restaurants</NavLink>
    </nav>
  );
}

export default NavBar;

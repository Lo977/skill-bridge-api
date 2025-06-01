import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import UserContext from "./UserContext";

function Navbar() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleLogout = () => {
    fetch("/logout", {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        setUser(null);
        navigate("/login");
      }
    });
  };

  return (
    <nav className="navbar">
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/my-skills">My Skills</NavLink>
        </li>
        <li>
          <NavLink to="/skills">Skills</NavLink>
        </li>
      </ul>

      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;

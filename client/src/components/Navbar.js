import React from "react";
import { NavLink } from "react-router-dom";

function Navbar({ onLogin, user }) {
  return (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to={`users/${user.id}`}>User</NavLink>
      </li>
      <li>
        <NavLink to="/skills">Skills</NavLink>
      </li>
      <li>
        <NavLink to="#">Logout</NavLink>
      </li>
    </>
  );
}

export default Navbar;

import React from "react";
import { NavLink } from "react-router-dom";

function Navbar({ setUser, user }) {
  function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }
  return (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/users">User</NavLink>
      </li>
      <li>
        <NavLink to="/skills">Skills</NavLink>
      </li>
      <li>
        <NavLink to="/" onClick={handleLogout}>
          Logout
        </NavLink>
      </li>
    </>
  );
}

export default Navbar;

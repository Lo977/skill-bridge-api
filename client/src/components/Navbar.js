import React from "react";
import { NavLink } from "react-router-dom";

function Navbar({ setUser, user }) {
  function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        setUser(null);
      }
    });
  }

  return (
    <nav>
      <ul>
        <li>
          <NavLink>Home</NavLink>
        </li>
        <li>
          <NavLink to="/offers">My Offers</NavLink>
        </li>
        <li>
          <NavLink to="/skills">Skills</NavLink>
        </li>
        <li>
          {/* <NavLink to={`/users/${user.id}`}>{user.username}</NavLink> */}
        </li>
        <button onClick={handleLogout}>Logout</button>
      </ul>
    </nav>
  );
}

export default Navbar;

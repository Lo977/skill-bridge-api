import React from "react";
import { NavLink } from "react-router-dom";

function Navbar({ onLogout, user }) {
  function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        onLogout(null);
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
      </ul>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;

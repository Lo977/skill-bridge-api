import React from "react";
import { NavLink } from "react-router-dom";

function Navbar({ user, setUser }) {
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
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem",
        backgroundColor: "#f9f9f9",
        borderBottom: "1px solid #ccc",
      }}
    >
      <ul
        style={{
          listStyle: "none",
          display: "flex",
          gap: "1rem",
          margin: 0,
          padding: 0,
        }}
      >
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/offers">My Offer</NavLink>
        </li>
        <li>
          <NavLink to="/skills">Skills</NavLink>
        </li>
      </ul>
      <ul>
        <NavLink to={`/users/${user.id}`} style={{ marginRight: "1rem" }}>
          {user.username}
        </NavLink>
        <NavLink to="#" onClick={handleLogout}>
          LogOut
        </NavLink>
      </ul>
    </nav>
  );
}

export default Navbar;

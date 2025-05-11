import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

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
    <nav className="navbar">
      <ul>
        <li>
          <NavLink to="/" activeclassname="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/offers" activeclassname="active">
            My Offers
          </NavLink>
        </li>
        <li>
          <NavLink to="/skills" activeclassname="active">
            Skills
          </NavLink>
        </li>
      </ul>
      {user && (
        <div className="user-controls">
          <NavLink to={`/users/${user.id}`} activeclassname="active">
            👤 {user.username}
          </NavLink>
          <button onClick={handleLogout} style={{ cursor: "pointer" }}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

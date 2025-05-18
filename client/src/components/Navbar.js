import React from "react";

function Navbar({ setUser }) {
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
    <>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}

export default Navbar;

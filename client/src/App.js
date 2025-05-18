import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";

function App() {
  const [user, setUser] = useState(null);
  console.log(user);
  useEffect(() => {
    fetch("/check_session").then((res) => {
      if (res.ok) {
        res.json().then((userData) => setUser(userData));
      }
    });
  }, []);
  return (
    <>
      <Navbar onLogout={setUser} user={user} />
      <Login onLogin={setUser} />
      <h2>App</h2>
    </>
  );
}

export default App;

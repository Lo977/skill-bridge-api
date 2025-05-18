import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

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
      <Signup />
      <h2>App</h2>
    </>
  );
}

export default App;

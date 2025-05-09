import React, { useEffect, useState } from "react";
import { use } from "react";
import { Switch, Route } from "react-router-dom";
import Login from "../pages/Login";
import Navbar from "./Navbar";
function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);
  if (!user) return <Login onlogin={setUser} user={user} />;

  return (
    <>
      <Navbar onLogin={setUser} user={user} />
      <h1>Project Client WELCOME username: {user.username}</h1>
    </>
  );
}
export default App;

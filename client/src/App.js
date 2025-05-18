import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";

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
      <Navbar />
      <h2>
        App
        <button onClick={() => setUser(null)}>Logout</button>
      </h2>
    </>
  );
}

export default App;

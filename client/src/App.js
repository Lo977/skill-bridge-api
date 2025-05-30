import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
import AppRoutes from "./AppRoutes";

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
      {user && <Navbar onLogout={setUser} user={user} />}
      <AppRoutes user={user} onLogin={setUser} />
    </>
  );
}

export default App;

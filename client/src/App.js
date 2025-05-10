import React, { useEffect, useState } from "react";
import AppRoutes from "./AppRoutes";
import Navbar from "./components/Navbar";
import { set } from "date-fns";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then(setUser);
      }
    });
  }, []);

  return (
    <>
      {user && <Navbar user={user} setUser={setUser} />}
      <AppRoutes user={user} onLogin={setUser} />
    </>
  );
}

export default App;

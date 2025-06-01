import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import SignupForm from "./components/SignupForm";
import Skills from "./pages/Skills";
import SkillOffers from "./pages/SkillOffers";

import NotFoundPage from "./components/NotFoundPage";
import Navbar from "./components/Navbar";
import UserContext from "./components/UserContext";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/check_session").then((res) => {
      if (res.ok) {
        res.json().then(setUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        {user && <Navbar />}

        <Routes>
          {user ? (
            <>
              <Route path="/" element={<Home user={user} />} />
              <Route path="/skills" element={<Skills />} />

              <Route path="/my-skills" element={<SkillOffers />} />
              <Route path="/my-skills/new" element={<SkillOffers />} />
              {/* <Route path="/my-skills/:skillId" element={<SkillOffers />} /> */}
              <Route
                path="/my-skills/:skillId/offers"
                element={<SkillOffers />}
              />
              <Route
                path="/my-skills/:skillId/offers/:id/edit"
                element={<SkillOffers />}
              />

              <Route path="*" element={<NotFoundPage />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignupForm />} />
              <Route path="*" element={<Login />} />
            </>
          )}
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;

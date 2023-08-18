import React, { useState, useEffect } from "react";
import axios from "axios";
import Login from "./components/Login";
import Header from "./components/Header";
import Register from "./components/Register";
import Orders from "./components/Orders";

function App() {
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log("isLoggedIn", isLoggedIn);
  const handleLoginClick = () => {
    setShowLoginForm(true);
  };

  const handleRegisterClick = () => {
    setShowLoginForm(false);
  };

  const handleLogout = async () => {
    console.log("handleLogout");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    try {
      await axios.get("http://localhost:5000/auth/logout");

      delete axios.defaults.headers.common["Authorization"];
    } catch (error) {
      console.error("Failed to logout", error);
      alert("Failed to logout");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        onLoginClick={handleLoginClick}
        onRegisterClick={handleRegisterClick}
      />
      <section className="w-full min-h-screen hero-gradient loginWrapper">
        <img
          src="/corner-shape.svg"
          alt=""
          className="absolute left-0 top-0 w-[150px] z-[1]"
        />
        <div className="w-full flex flex-col lg:flex-row z-[2]">
          {isLoggedIn && <Orders />}
          {showLoginForm && !isLoggedIn ? (
            <Login setIsLoggedIn={setIsLoggedIn} />
          ) : (
            <>{!isLoggedIn && <Register />}</>
          )}
          <img
            src="/small-shape-corner.svg"
            alt=""
            className="absolute right-0 bottom-0 w-[80px] lg:w-auto z-[0]"
          />
        </div>
      </section>
    </>
  );
}

export default App;

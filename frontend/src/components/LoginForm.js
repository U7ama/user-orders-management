import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../Form.module.css";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function setCookie(name, value, days) {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  function getCookie(name) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  function deleteCookie(name) {
    document.cookie = name + "=; Max-Age=-99999999;";
  }

  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setIsLoggedIn(true);
    }
    console.log(token);
  }, [rememberMe]);

  const onSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        email: username,
        password,
      });

      if (response.status === 200) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
        setLoading(false);
        setIsLoggedIn(true);

        if (rememberMe) {
          setCookie("token", response.data.token, 7);
        } else {
          deleteCookie("token");
        }
      } else {
        setLoading(false);
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Invalid credentials", error);
      setLoading(false);
      alert("Invalid credentials");
    }
  };

  const onLogout = async () => {
    setLoading(true);
    try {
      await axios.get("http://localhost:5000/auth/logout");

      setIsLoggedIn(false);
      delete axios.defaults.headers.common["Authorization"];
      deleteCookie("token");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Failed to logout", error);
      alert("Failed to logout");
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.absoluteWrapper}>
        <img src="/ring.png" alt="ring" />
      </div>
      <div className={styles.maxWidthWrapper}>
        {isLoggedIn ? (
          <>
            <button className={styles.logoutButton} onClick={onLogout}>
              {loading ? "Logging out..." : "Log Out"}
            </button>
          </>
        ) : (
          <>
            <h4 className={styles.loginTitle}>Login</h4>
            <form className={styles.formWrapper} onSubmit={onSubmit}>
              <div className={styles.inputWrapper}>
                <label className={styles.labelWrapper} htmlFor="">
                  Username
                </label>
                <input
                  className={styles.inputField}
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  required
                />
              </div>
              <div className={styles.inputWrapper}>
                <label className={styles.labelWrapper} htmlFor="password">
                  Password
                </label>
                <div className={styles.inputGroup}>
                  <input
                    className={styles.inputField}
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                  />
                  <div
                    onClick={() => setShowPassword(!showPassword)}
                    className={styles.passwordIcon}
                  >
                    {showPassword ? "👁️‍🗨️" : "👁"}
                  </div>
                </div>
              </div>

              <div className={styles.checkboxContainer}>
                <input
                  className={styles.checkbox}
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className={styles.checkboxLabel}>Remember me</span>
              </div>

              <button className={styles.submitButton} type="submit">
                {loading ? "Logging in..." : "Log in"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginForm;

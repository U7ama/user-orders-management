import React from "react";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.headerItems}>
        <h1>Login</h1>
        <h1>Register</h1>
      </div>
    </div>
  );
};

export default Header;

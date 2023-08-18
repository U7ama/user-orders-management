import React from "react";

const Header = ({ onLoginClick, onRegisterClick, isLoggedIn, onLogout }) => {
  return (
    <header
      className={`bg-white p-4 drop-shadow flex justify-between items-center cursor-pointer z-[30]`}
    >
      {!isLoggedIn ? (
        <button
          className="text-black hover:text-[#b7b7b7] focus:outline-none"
          onClick={onRegisterClick}
        >
          Register
        </button>
      ) : (
        <div className="text-black hover:text-[#b7b7b7] focus:outline-none"></div>
      )}
      {isLoggedIn ? (
        <button
          className="text-black hover:text-[#b7b7b7] focus:outline-none"
          onClick={onLogout}
        >
          Log Out
        </button>
      ) : (
        <div>
          <button
            className="text-black hover:text-[#b7b7b7] focus:outline-none"
            onClick={onLoginClick}
          >
            Login
          </button>
          {/* <button className="text-black hover:text-[#b7b7b7] focus:outline-none" onClick={onRegisterClick}>Register</button> */}
        </div>
      )}
    </header>
  );
};

export default Header;

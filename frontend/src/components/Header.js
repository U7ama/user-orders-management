import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const Header = () => {
  const [isSticky, setIsSticky] = useState(false);


  return (
    <header
      className={`bg-white p-4 drop-shadow flex justify-between items-center cursor-pointer z-[30]`}
    >
      <Link to="/register" className="text-black hover:text-[#b7b7b7] focus:outline-none">
        Register
      </Link>
      <Link to="/"  className="text-black hover:text-[#b7b7b7] focus:outline-none">
        Login
      </Link>
    </header>
  );
};

export default Header;

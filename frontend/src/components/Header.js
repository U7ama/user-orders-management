import React, { useState, useEffect } from "react";

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`bg-white p-4 drop-shadow flex justify-between items-center cursor-pointer z-[30] ${
        isSticky ? "fixed top-0 left-0 right-0" : ""
      }`}
    >
      <button className="text-black hover:text-[#b7b7b7] focus:outline-none">
        Register
      </button>
      <button className="text-black hover:text-[#b7b7b7] focus:outline-none">
        Login
      </button>
    </header>
  );
};

export default Header;

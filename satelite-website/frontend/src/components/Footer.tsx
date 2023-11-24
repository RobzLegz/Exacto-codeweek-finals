import React from "react";

const Footer = () => {
  return (
    <footer className="p-4 bg-black w-full z-10 text-white border-t-2">
      LatSat © {new Date().getFullYear()}
    </footer>
  );
};

export default Footer;

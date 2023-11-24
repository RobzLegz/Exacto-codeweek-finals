import React from "react";

const Footer = () => {
  return (
    <footer className="w-full mt-10 bg-gray-50 p-4">
      <small>Exacto.pro © {new Date().getFullYear()}</small>
    </footer>
  );
};

export default Footer;

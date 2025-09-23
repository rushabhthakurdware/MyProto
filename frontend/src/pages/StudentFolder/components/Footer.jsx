import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white shadow-inner py-4 px-6 mt-8 text-center text-gray-500">
      © {new Date().getFullYear()} SmartAttend. All rights reserved.
    </footer>
  );
};

export default Footer;

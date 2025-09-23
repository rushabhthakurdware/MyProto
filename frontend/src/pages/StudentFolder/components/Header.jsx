import React from "react";
import BellIcon from "./icons/BellIcon";
import MenuIcon from "./icons/MenuIcon";



const Header = () => {
  return (
 <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center">
          <img src="https://placehold.co/40x40/4F46E5/ffffff?text=SA" alt="SmartAttend Logo" className="rounded-full" />
          <h1 className="ml-2 text-2xl font-bold text-gray-800">SmartAttend</h1>
          <span className="ml-4 text-gray-500 text-lg">Student Dashboard</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center space-x-2 bg-gray-100 p-2 rounded-lg">
            <BellIcon className="text-gray-600" />
            <span className="text-sm font-medium text-gray-800">You have no new notifications.</span>
          </div>
          <div className="hidden md:flex items-center space-x-2">
            <span className="font-semibold text-gray-700">Student Name</span>
            <img src="https://placehold.co/40x40/E5E7EB/4F46E5?text=S" alt="Student Profile" className="rounded-full" />
          </div>
          <button className="md:hidden">
            <MenuIcon className="text-2xl text-gray-600" />
          </button>
        </div>
      </header>

      );
};

export default Header;
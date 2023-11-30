import { useState, useEffect, useRef } from "react";
import Sidebar from "../components/Dashboard/Sidebar";
import { Outlet } from "react-router-dom";
import useRole from "../hooks/useRole";

const DashboardLayout = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [userRole, roleLoading] = useRole();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  const renderDashboardContent = () => {
    if (roleLoading) {
      return <p>Loading...</p>;
    }

    let welcomeMessage = "";
    switch (userRole) {
      case "admin":
        welcomeMessage = "Welcome to Admin Dashboard";
        break;
      case "user":
        welcomeMessage = "Welcome to User Dashboard";
        break;
      case "member":
        welcomeMessage = "Welcome to Member Dashboard";
        break;
      default:
        welcomeMessage = "No dashboard content for this role.";
    }

    return (
      <div className="flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 md:mt-4 mt-2 mb-4">
            {welcomeMessage}
          </h2>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      {/* Sidebar - Hidden on Larger Screens (Desktop) */}
      {!isDropdownOpen && (
        <div className="lg:w-64 h-screen lg:block hidden">
          <Sidebar />
        </div>
      )}

      {/* Dashboard Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Page Title/Header */}
        <header className="bg-white shadow-md py-4 px-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

            {/* Mobile/Tablet Dropdown Button */}
            <button
              onClick={toggleDropdown}
              className="lg:hidden focus:outline-none"
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>
        </header>

        {/* Mobile/Tablet Dropdown Menu */}
        {isDropdownOpen && (
          <div
            ref={dropdownRef}
            className="lg:hidden absolute right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-md z-50"
          >
            <Sidebar />
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-4">
          {renderDashboardContent()}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

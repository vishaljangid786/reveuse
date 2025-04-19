import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // To toggle sidebar visibility on mobile

  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/");
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const linkClass = (path) =>
    `block py-2 px-4 rounded hover:bg-blue-100 ${
      pathname === path ? "bg-blue-200 text-blue-700 font-semibold" : ""
    }`;

  // Toggle sidebar visibility for mobile
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative">
      {/* Mobile Hamburger Menu */}
      <button
        className={`lg:hidden p-2 px-3 absolute top-2 bg-white rounded border border-gray-300 text-xl text-gray-700 ${
          isSidebarOpen ? "left-66" : "left-2"
        }`}
        onClick={toggleSidebar}>
        <i className={`fa ${isSidebarOpen ? "fa-times" : "fa-bars"}`}></i>
      </button>

      {/* Desktop Sidebar */}
      <div className="w-64 bg-white shadow h-screen p-4 transition-all lg:block hidden">
        <div className="flex items-center space-x-3 border-b border-blue-500 pb-5 rounded px-4 mb-6">
          <i className="fa-solid fa-cogs text-3xl text-blue-600"></i>
          <h2 className="text-xl text-gray-800 font-bold">Admin Panel</h2>
        </div>

        <nav className="flex flex-col text-gray-700 gap-2">
          <Link
            to="/admin/createblog"
            className={linkClass("/admin/createblog")}>
            <i className="fa-solid fa-pen text-blue-600 mr-2"></i> New Blog
          </Link>
          <Link to="/admin/allblogs" className={linkClass("/admin/allblogs")}>
            <i className="fa-solid fa-list text-blue-600 mr-2"></i> All Blog
          </Link>
          <Link
            to="/admin/createservice"
            className={linkClass("/admin/createservice")}>
            <i className="fa-solid fa-plus text-blue-600 mr-2"></i> New Services
          </Link>
          <Link
            to="/admin/allservices"
            className={linkClass("/admin/allservices")}>
            <i className="fa-solid fa-cogs text-blue-600 mr-2"></i> All Services
          </Link>
          <button
            className="mt-4 text-lg bg-red-500 hover:bg-red-600 text-white rounded py-2 px-4 transition-all"
            onClick={handleLogout}>
            <i className="fa-solid fa-sign-out-alt mr-2"></i> Logout
          </button>
        </nav>
      </div>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="fixed top- left-0 z-50  w-64 rounded border-gray-300 border bg-white shadow-lg p-4 lg:hidden transition-all">
          <div className="flex items-center space-x-3 border-b border-gray-500 pb-5 rounded px-4 mb-6">
            <i className="fa-solid fa-cogs text-3xl text-blue-600"></i>
            <h2 className="text-xl font-bold">Admin Panel</h2>
          </div>

          <nav className="flex flex-col text-gray-700 gap-2">
            <Link
              to="/admin/createblog"
              className={linkClass("/admin/createblog")}
              onClick={toggleSidebar}>
              <i className="fa-solid fa-pen text-blue-600 mr-2"></i> New Blog
            </Link>
            <Link
              to="/admin/allblogs"
              className={linkClass("/admin/allblogs")}
              onClick={toggleSidebar}>
              <i className="fa-solid fa-list text-blue-600 mr-2"></i> All Blog
            </Link>
            <Link
              to="/admin/createservice"
              className={linkClass("/admin/createservice")}
              onClick={toggleSidebar}>
              <i className="fa-solid fa-plus text-blue-600 mr-2"></i> New
              Services
            </Link>
            <Link
              to="/admin/allservices"
              className={linkClass("/admin/allservices")}
              onClick={toggleSidebar}>
              <i className="fa-solid fa-cogs text-blue-600 mr-2"></i> All
              Services
            </Link>
            <button
              className="mt-4 text-lg bg-red-500 hover:bg-red-600 text-white rounded py-2 px-4 transition-all"
              onClick={handleLogout}>
              <i className="fa-solid fa-sign-out-alt mr-2"></i> Logout
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Sidebar;

import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer.jsx";
import Home from "./Pages/Home.jsx";
import Aboutus from "./Pages/Aboutus.jsx";
import Services from "./Pages/Services.jsx";
import Blog from "./Pages/Blog.jsx";
import ContactUs from "./Pages/ContactUs.jsx";
import BlogForm from "./Pages/admin/BlogForm.jsx";
import Login from "./Pages/Login.jsx";
import BlogDetails from "./Pages/BlogDetails.jsx";
import AllServices from "./Pages/admin/AllServices.jsx";
import AdminLayout from "./Pages/AdminLayout.jsx";
import AllBlog from "./Pages/admin/AllBlog.jsx";
import NewService from "./Pages/admin/NewService.jsx";
import ServiceDetails from "./Pages/ServiceDetails.jsx";
import { HelmetProvider } from "react-helmet-async";

// export const backendurl = "http://localhost:5000";
export const backendurl = "https://thereveuse.com";

const App = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100); // Show after scrolling 100px
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Aboutus />} />
          <Route path="/services" element={<Services />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
          <Route path="/services/:id" element={<ServiceDetails />} />
          {/* admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="createblog" element={<BlogForm />} />
            <Route path="allblogs" element={<AllBlog />} />
            <Route path="createservice" element={<NewService />} />
            <Route path="allservices" element={<AllServices />} />
          </Route>
        </Routes>
        {isVisible && (
          <button
            onClick={handleClick}
            className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg transform transition-all duration-300 ease-in-out hover:scale-110 hover:bg-blue-700 hover:rotate-45">
            <i className="fas fa-arrow-up text-2xl"></i>
          </button>
        )}

        <Footer />
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;

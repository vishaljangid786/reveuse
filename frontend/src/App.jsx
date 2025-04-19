import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer.jsx'
import Home from './Pages/Home.jsx'
import Aboutus from './Pages/Aboutus.jsx'
import Services from './Pages/Services.jsx'
import Blog from './Pages/Blog.jsx'
import ContactUs from './Pages/ContactUs.jsx'
import BlogForm from './Pages/admin/BlogForm.jsx'
import Login from './Pages/Login.jsx'
import BlogDetails from "./Pages/BlogDetails.jsx";
import AllServices from './Pages/admin/AllServices.jsx'
import AdminLayout from './Pages/AdminLayout.jsx'
import AllBlog from './Pages/admin/AllBlog.jsx'
import NewService from './Pages/admin/NewService.jsx'

export const backendurl = "https://reveuse-backend.vercel.app";

const App = () => {
  return (
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
        {/* admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="createblog" element={<BlogForm />} />
          <Route path="allblogs" element={<AllBlog />} />
          <Route path="createservice" element={<NewService />} />
          <Route path="allservices" element={<AllServices />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App
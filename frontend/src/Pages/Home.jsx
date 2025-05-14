import React, { useEffect } from "react";
import ImageSlider from "../components/ImageSlider";
import HomeAbout from "../components/HomeAbout";
import AOS from "aos";
import "aos/dist/aos.css";
import FAQ from "../components/FAQ";
import CompaniesOverview from "../components/CompaniesOverview";
import BlogSlider from "../components/BlogSlider";
import HomeContact from "../components/HomeContact.jsx";
import ServicesList from "./ServicesList.jsx";
import Seo from "../components/Seo.jsx";
import Heading from "../components/Heading.jsx";
import ServicePortfolio from "../components/ServicePortfolio.jsx";

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  return (
    <div>
      <Seo
        title="Reveuse Solutions – Innovative IT Services & Blogs"
        description="Explore web solutions, services, and tech blogs with Reveuse Solutions – your digital growth partner."
        keywords="Reveuse Solutions, IT services, blog, web development, app development, software company"
        url="https://www.thereveuse.com"
        image="https://www.thereveuse.com/assets/banner.jpg" // Update this to actual image
      />
      
      <div data-aos="zoom-in">
        <ImageSlider />
      </div>
      {/* <HomeServices /> */}
      <div className="mt-16 max-w-6xl mx-auto" data-aos="fade-up">
        <Heading text1={"Latest"} text2={"Services"} />
        <ServicesList />
      </div>
      <div className="mt-16" data-aos="fade-up">
        <HomeAbout />
      </div>
      <div className="mt-16" data-aos="fade-up">
        <CompaniesOverview />
      </div>
      <div className="mt-16" data-aos="zoom-in">
        <ServicePortfolio />
      </div>
      <div className="mt-16" data-aos="zoom-in">
        <FAQ />
      </div>
      <div className="mt-16" data-aos="fade-up">
        <BlogSlider />
      </div>
      <div className="mt-16" data-aos="fade-up">
        <HomeContact />
      </div>
    </div>
  );
};

export default Home;

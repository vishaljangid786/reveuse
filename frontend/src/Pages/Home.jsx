import React from "react";
import ImageSlider from "../components/ImageSlider";
import Heading from "../components/Heading";
import HomeServices from "../components/HomeServices";
import HomeAbout from "../components/HomeAbout";
import FAQ from "../components/FAQ";
import CompaniesOverview from "../components/CompaniesOverview";
import BlogSlider from "../components/BlogSlider"
import HomeContact from "../components/HomeContact.jsx"

const Home = () => {
  return (
    <div>
      <ImageSlider />
      <HomeServices />
      <HomeAbout />
      <CompaniesOverview />
      <FAQ />
      <BlogSlider />
      <HomeContact />
    </div>
  );
};

export default Home;

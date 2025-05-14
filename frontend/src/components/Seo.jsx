import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const Seo = ({ title, description, keywords, url, image }) => {
  const location = useLocation();

  // Ensure meta updates on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = title || "Default Title"; // Redundant, but explicit
  }, [location, title]);


  return (
    <Helmet key={location.pathname}>
      <title>{title || "Default Title"}</title>
      <meta name="description" content={description || "Default description"} />
      <meta name="keywords" content={keywords || "React, SEO, Reveuse"} />
      <meta name="author" content="Reveuse Solutions" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url || window.location.href} />
      <meta property="og:title" content={title || "Default Title"} />
      <meta
        property="og:description"
        content={description || "Default description"}
      />
      <meta property="og:image" content={image || "/default-og-image.jpg"} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || "Default Title"} />
      <meta
        name="twitter:description"
        content={description || "Default description"}
      />
      <meta
        name="twitter:image"
        content={image || "/default-twitter-image.jpg"}
      />
      <meta name="generator" content="React + Reveuse Solutions" />
    </Helmet>
  );

};

export default Seo;

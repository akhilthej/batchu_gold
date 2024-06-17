import React, { useState, useEffect } from 'react';
import videoSrc from "../assets/CSDLogo.mp4";

const LogoLoader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay (replace this with your actual data loading logic)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 7000); // Adjust the delay as needed

    // Clear the timer when the component unmounts or when isLoading becomes false
    return () => clearTimeout(timer);
  }, []); // Empty dependency array to ensure the effect runs only once

  const videoLoaderStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#FFF8F0',
    display: 'flex',
    flexDirection: 'column', // Added to align footer text below video
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  };

  const videoStyle = {
    width: '10%', // Default width for larger screens
    height: 'auto', // Maintain aspect ratio
  };

  const footerStyle = {
    position: 'fixed',
    bottom:0,
    margin: '20px', // Adjust spacing as needed
    fontSize: '14px', // Adjust font size as needed
    color: '#555', // Adjust color as needed
  };

  // Media query for smaller screens (e.g., mobile devices)
  // Adjust the width to 70% for mobile screens
  const smallerScreens = `@media (max-width: 768px) {
    .logo {
      width: 70%;
    }
  }`;

  // Ensure the loader is hidden when isLoading becomes false
  if (!isLoading) {
    return null; // Return null to render nothing when not loading
  }

  return (
    <div style={videoLoaderStyle} className={`video-loader ${isLoading ? 'show' : 'hide'}`}>
      <style>{smallerScreens}</style>
      <video autoPlay loop muted style={videoStyle} className="logo">
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div style={footerStyle}>Made in INDIA</div>
    </div>
  );
};

export default LogoLoader;

import React from 'react';
import pic from '../../../image/profilepic.jpg';
import Navbar from '../navbar/Navbar';
import './About.css';
const About = () => {
  return (
    <>
      <Navbar />
      <div className="about">
        <img src={pic} alt="profilepic" id="myImage" />
        <h2>Arjun Laxane</h2>
        <p>Front End Developer OR UI/UX Developer</p>
      </div>
    </>
  );
};

export default About;

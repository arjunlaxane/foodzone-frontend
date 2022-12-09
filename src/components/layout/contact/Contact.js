import React from 'react';
import EmailIcon from '@mui/icons-material/Email';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import './Contact.css';
import Navbar from '../navbar/Navbar';

const Contact = () => {
  return (
    <>
      <Navbar />
      <h1 className="head">Contact me</h1>

      <div className="contact">
        <div className="connect-link">
          <a
            href="mailto:arjunlaxane@gmail.com"
            id="mail"
            target="_blank"
            rel="noreferrer"
          >
            <EmailIcon sx={{ fontSize: '10vmax' }} />
          </a>
          <a
            href="https://master--bucolic-sprite-706576.netlify.app/"
            id="portfolio"
            target="_blank"
            rel="noreferrer"
          >
            <FileOpenIcon sx={{ fontSize: '10vmax' }} />
          </a>
        </div>
      </div>
    </>
  );
};

export default Contact;

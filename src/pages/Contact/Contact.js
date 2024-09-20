import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Contact.css';
import Header from '../../component/Layout/ProjectHeader';
import useMobileDetection from '../../hooks/useMobileDetection';

function Contact() {
  const isMobile = useMobileDetection();

  useEffect(() => {
    const body = document.querySelector('body');
    const header = document.querySelector('.project-header');

    body.style.backgroundColor = '#f5f5f5';
    header.style.position = 'fixed';
    header.style.backgroundColor = '#f5f5f5';

    return () => {
      body.style.backgroundColor = '';
      header.style.position = '';
      header.style.backgroundColor = '';
    }
  })

  const [copySuccess, setCopySuccess] = useState(false);

  const copyToClipboard = () => {
    const email = "abcde@gmail.com";
    navigator.clipboard.writeText(email).then(() => {
      if (isMobile) {
        alert("Copied to clipboard");
      } else {
        setCopySuccess(true);
        setTimeout(() => {
          setCopySuccess(false);
        }, 2000);
      }
    }).catch(err => {
      console.error("Failed to copy: ", err);
    });
  };

  return (
    <>
      <Header title={'CONTACT'}></Header>

      <div className="contact-container">
        <img className='profile-img' src={`${process.env.PUBLIC_URL}/imgs/contact_profile.jpg`} alt="" />

        <div className='side'>
          <div className="info">
            <span>Photographer based in Seoul, Korea
              <br /><br />
              Currently affiliated with Rom&nd
              <br /><br />
            </span>
          </div>

          <div className="link-box">
            <div className="link-type">
              <span>E-mail</span>
              <span>SNS</span>
            </div>
            <div className="link">
              <div>
                <span onClick={copyToClipboard} className="pointer">ajhjmj9@naver,com</span>
                {!isMobile && copySuccess && <span className="copy-success">copied to clipboard</span>}
              </div>
              <Link to='https://www.instagram.com/zohuisu/' target="_blank" className='pointer'><span>Instagram</span></Link>
            </div>
          </div>
        </div>
      </div >

      <p className='site-by'>Site by Cho Minji</p>
    </>
  );
}

export default Contact;

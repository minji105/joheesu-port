import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Contact.css';
import Header from '../component/Header';

function Contact() {
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

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:3000/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert('Send Success');
      setFormData({ name: '', email: '', message: '' });
    } else {
      alert('Send Fail');
    }
  };

  const scrollToForm = () => {
    const formSection = document.querySelector('form');
    formSection.scrollIntoView({ behavior: 'smooth' });
  };

  const [copySuccess, setCopySuccess] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/android|iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      setIsMobile(true);
    }
  }, [])

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
      <Header title={'contact'}></Header>

      <div className="contact-container">
        <img className='profile-img' src={`${process.env.PUBLIC_URL}/imgs/profile/3/3-1.jpg`} alt="" />

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
              <span>Contact</span>
              <span>E-mail</span>
              <span>SNS</span>
            </div>
            <div className="link">
              <span>
                <div onClick={scrollToForm} className="pointer inline">Form</div> or E-mail
              </span>
              <div>
                <span onClick={copyToClipboard} className="pointer">abcde@gmail.com</span>
                {!isMobile && copySuccess && <span className="copy-success">copied to clipboard</span>}
              </div>
              <Link to='https://www.instagram.com/zohuisu/' target="_blank" className='pointer'><span>Instagram</span></Link>
            </div>
          </div>
        </div>
      </div >

      <form onSubmit={handleSubmit}>
        <div>
          <label></label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder='Name *'
            required
          />
        </div>
        <div>
          <label></label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder='E-mail *'
            required
          />
        </div>
        <div className='message'>
          <label></label>
          <textarea
            name="message" className='textarea'
            value={formData.message}
            onChange={handleChange}
            placeholder='Message *'
            required
          />
        </div>
        <button type="submit" className='send-button'>Send</button>

        <p className='site-by'>Site by Cho Minji</p>
      </form>
    </>
  );
}

export default Contact;

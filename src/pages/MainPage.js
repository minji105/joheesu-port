import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import './MainPage.css';
import ContactBtn from '../component/Copyright';
import Logo from '../component/Buttons/Logo';

function MainPage() {
  const projectData = [
    { id: "001", title: "9", category: "Personal Work", bgurl: `${process.env.PUBLIC_URL}/imgs/personalWork/9/9-5.jpg` },
    { id: "002", title: "3", category: "Snap", bgurl: `${process.env.PUBLIC_URL}/imgs/snap/3/3-10.jpg` },
    { id: "003", title: "9", category: "Personal Work", bgurl: `${process.env.PUBLIC_URL}/imgs/personalWork/9/9-2.jpg` },
    { id: "004", title: "1", category: "Snap", bgurl: `${process.env.PUBLIC_URL}/imgs/snap/1/1-1.jpg` },
    { id: "005", title: "3", category: "Snap", bgurl: `${process.env.PUBLIC_URL}/imgs/snap/3/3-11.jpg` },
    { id: "006", title: "8", category: "Personal Work", bgurl: `${process.env.PUBLIC_URL}/imgs/personalWork/8/8-1.jpg` },
    { id: "007", title: "2", category: "Snap", bgurl: `${process.env.PUBLIC_URL}/imgs/snap/2/2-9.jpg` },
    { id: "008", title: "1", category: "Snap", bgurl: `${process.env.PUBLIC_URL}/imgs/snap/1/1-3.jpg` },
    { id: "009", title: "2", category: "Personal Work", bgurl: `${process.env.PUBLIC_URL}/imgs/personalWork/2/2-5.jpg` },
    { id: "010", title: "1", category: "Snap", bgurl: `${process.env.PUBLIC_URL}/imgs/snap/1/1-16.jpg` },
    { id: "011", title: "5", category: "Personal Work", bgurl: `${process.env.PUBLIC_URL}/imgs/personalWork/5/5-2.jpg` }
  ];

  const [currentProject, setCurrentProject] = useState({ id: '', title: '', category: '' });
  const navigate = useNavigate();

  useEffect(() => {
    let sections = document.querySelectorAll(".section"),
      images = document.querySelectorAll(".background"),
      headings = document.querySelectorAll(".section-title"),
      outerWrappers = document.querySelectorAll(".wrapper-outer"),
      innerWrappers = document.querySelectorAll(".wrapper-inner"),
      currentIndex = -1,
      wrap = (index, max) => (index + max) % max,
      animating;

    gsap.set(outerWrappers, { yPercent: 100 });
    gsap.set(innerWrappers, { yPercent: -100 });

    function gotoSection(index, direction) {
      index = wrap(index, sections.length);
      animating = true;

      let fromTop = direction === -1;
      let dFactor = fromTop ? -1 : 1;
      let tl = gsap.timeline({ defaults: { duration: 1.25, ease: "power1.inOut" }, onComplete: () => (animating = false) });

      if (currentIndex >= 0) {
        gsap.set(sections[currentIndex], { zIndex: 0 });
        tl.to(images[currentIndex], { yPercent: -15 * dFactor })
          .set(sections[currentIndex], { autoAlpha: 0 });
      }

      gsap.set(sections[index], { autoAlpha: 1, zIndex: 1 });
      tl.fromTo([outerWrappers[index], innerWrappers[index]], { yPercent: (i) => (i ? -100 * dFactor : 100 * dFactor) }, { yPercent: 0 }, 0)
        .fromTo(images[index], { yPercent: 15 * dFactor }, { yPercent: 0 }, 0)
        .fromTo(headings[index], { autoAlpha: 0, yPercent: 150 * dFactor }, {
          autoAlpha: 1,
          yPercent: 0,
          duration: 1,
          ease: "power2",
          stagger: { each: 0.02, from: "random" },
        }, 0.2);

      currentIndex = index;

      setCurrentProject(projectData[index]);
    }

    let lastTap = 0;
    document.addEventListener("touchend", function (event) {
      let currentTime = new Date().getTime();
      let tapLength = currentTime - lastTap;
      if (tapLength < 500 && tapLength > 0) {
        gotoSection(currentIndex + 1, 1);
        event.preventDefault();
      }
      lastTap = currentTime;
    });

    window.addEventListener("wheel", (event) => {
      if (event.deltaY < 0 && !animating) {
        gotoSection(currentIndex - 1, -1);
      } else if (event.deltaY > 0 && !animating) {
        gotoSection(currentIndex + 1, 1);
      }
    });

    gotoSection(0, 1);
  }, []);

  const handleSectionClick = (category, title) => {
    navigate(`/list/${encodeURIComponent(category)}/${encodeURIComponent(title)}`);
  };

  return (
    <>
      <ContactBtn />
      <Logo />

      <div className="main-container">
        <div>
          <p>{currentProject.id} &mdash; 011</p>
          <p>{currentProject.title}</p>
          <p>{currentProject.category}</p>
        </div>
        <p>scroll</p>
      </div>
      {projectData.map((project, index) => (
        <Section
          key={project.id}
          id={project.id}
          title={project.title}
          className="section"
          bgUrl={project.bgurl}
          onClick={() => handleSectionClick(project.category, project.title)}
        />
      ))}
    </>
  );
}

const Section = ({ id, title, className, bgUrl, onClick }) => {
  return (
    <section id={id} className={`section ${className}`} onClick={onClick}>
      <div className="wrapper-outer">
        <div className="wrapper-inner">
          <Link to={`/list`}>
            <div className="background mouse-hover" style={{ backgroundImage: `url(${bgUrl})` }}>
              {/* <span className="section-title">{id}</span> */}
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MainPage;

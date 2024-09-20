import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import './MainPage.css';
import MainPageImagea from '../../data/MainPageImages';
import Logo from '../../component/Layout/Logo';
import MouseFollower from '../../component/Layout/MouseFollower';
import SlideAlert from '../../component/Alert/SlideAlert';

function MainPage() {
  const [currentProject, setCurrentProject] = useState({ id: '', title: '', category: '' });
  const navigate = useNavigate();

  useEffect(() => {
    let sections = document.querySelectorAll(".section"),
      images = document.querySelectorAll(".background"),
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

      currentIndex = index;

      setCurrentProject(MainPageImagea[index]);
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

    let touchStartY = 0;
    let touchEndY = 0;

    const handleTouchStart = (e) => {
      touchStartY = e.changedTouches[0].screenY;
    };

    const handleTouchEnd = (e) => {
      touchEndY = e.changedTouches[0].screenY;
      handleGesture();
    };

    const handleGesture = () => {
      if (touchEndY < touchStartY && !animating) {
        gotoSection(currentIndex + 1, 1);
      }
      if (touchEndY > touchStartY && !animating) {
        gotoSection(currentIndex - 1, -1);
      }
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);

    gotoSection(0, 1);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  const handleSectionClick = (category, title) => {
    navigate(`/list/${encodeURIComponent(category)}/${encodeURIComponent(title)}`);
  };

  return (
    <>
      <Logo />
      <MouseFollower />

      <SlideAlert direction="vertical" storageKey="mainPageAlertShown"/>

      <p className='copyright'>@ 2024</p>

      <div className="main-container">
        <div>
          <p>{currentProject.id} &mdash; 014</p>
          <p>{currentProject.title}</p>
          <p>{currentProject.category}</p>
        </div>
        <p>scroll</p>
      </div>

      {MainPageImagea.map((project, index) => (
        <Section
          key={project.id}
          id={project.id}
          title={project.title}
          bgUrl={project.bgurl}
          onClick={() => handleSectionClick(project.category, project.title)}
        />
      ))}
    </>
  );
}

const Section = ({ id, bgUrl, onClick }) => {
  return (
    <section id={id} className="section" onClick={onClick}>
      <div className="wrapper-outer">
        <div className="wrapper-inner">
          <Link to={`/list`}>
            <div className="background mouse-hover" style={{ backgroundImage: `url(${encodeURIComponent(bgUrl)})` }} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MainPage;

import React, { Suspense, lazy, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import styles from './MainPage.module.scss';
import MainPageImages from '../../data/MainPageImages';
import Logo from '../../component/Layout/Logo';
import MouseFollower from '../../component/Layout/MouseFollower';

const SlideAlert = lazy(() => import('../../component/Alert/SlideAlert'));

function MainPage() {
  const [currentProject, setCurrentProject] = useState({ id: '', title: '', category: '' });
  const navigate = useNavigate();

  useEffect(() => {
    let sections = document.querySelectorAll(`.${styles.section}`),
      images = document.querySelectorAll(`.${styles.background}`),
      outerWrappers = document.querySelectorAll(`[class*="${styles.wrapperOuter}"]`),
      innerWrappers = document.querySelectorAll(`[class*="${styles.wrapperInner}"]`);

    let currentIndex = -1;
    let wrap = (index, max) => (index + max) % max;
    let animating;

    const gotoSection = (index, direction) => {
      index = wrap(index, sections.length);
      animating = true;

      let timeline = gsap.timeline({
        defaults: { duration: 1.25, ease: "power1.inOut" },
        onComplete: () => (animating = false)
      });

      if (currentIndex >= 0) {
        gsap.set(sections[currentIndex], { zIndex: 0 });
        timeline.to(images[currentIndex], { yPercent: -15 * direction })
          .set(sections[currentIndex], { autoAlpha: 0 });
      }

      gsap.set(sections[index], { autoAlpha: 1, zIndex: 1 });
      timeline.fromTo(
        [outerWrappers[index], innerWrappers[index]],
        { yPercent: (i) => (i ? -100 * direction : 100 * direction) },
        { yPercent: 0 },
        0
      ).fromTo(images[index], { yPercent: 15 * direction }, { yPercent: 0 }, 0)

      currentIndex = index;

      setCurrentProject(MainPageImages[index]);
    }

    const handleWheel = (event) => {
      if (!animating) {
        const direction = event.deltaY > 0 ? 1 : -1;
        gotoSection(currentIndex + direction, direction);
      }
    }

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
    window.addEventListener('wheel', handleWheel);

    gotoSection(0, 1);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      window.addEventListener('wheel', handleWheel);
    };
  }, []);

  const handleSectionClick = (category, title) => {
    navigate(`/list/${encodeURIComponent(category)}/${encodeURIComponent(title)}`);
  };

  return (
    <>
      <Logo />
      <MouseFollower />

      <Suspense fallback={<div>Loading alert...</div>}>
        <SlideAlert direction="vertical" storageKey="mainPageAlertShown" />
      </Suspense>

      <p className={styles.copyright}>@ 2024</p>

      <div className={styles.container}>
        <div>
          <p>{currentProject.id} &mdash; 014</p>
          <p>{currentProject.title}</p>
          <p>{currentProject.category}</p>
        </div>
        <p>scroll</p>
      </div>

      {MainPageImages.map((project, index) => (
        <Section
          key={project.id}
          id={project.id}
          title={project.title}
          bgUrlArray={project.bgurl}
          onClick={() => handleSectionClick(project.category, project.title)}
        />
      ))}
    </>
  );
}

const Section = ({ id, bgUrlArray, onClick }) => {
  const [bgUrl, setBgUrl] = useState('');

  useEffect(() => {
    const updateBgUrl = () => {
      const width = window.innerWidth;
      if (width > 1536) {
        setBgUrl(bgUrlArray[0]);
      } else if (width > 1024) {
        setBgUrl(bgUrlArray[1]);
      } else if (width > 768) {
        setBgUrl(bgUrlArray[2]);
      } else if (width > 480) {
        setBgUrl(bgUrlArray[3]);
      } else {
        setBgUrl(bgUrlArray[4]);
      }
    };

    updateBgUrl();
    window.addEventListener('resize', updateBgUrl);

    return () => {
      window.removeEventListener('resize', updateBgUrl);
    };
  }, [bgUrlArray]);

  return (
    <section id={id} className={styles.section} onClick={onClick}>
      <div className={styles.wrapperOuter}>
        <div className={styles.wrapperInner}>
          <Link to={'/list'}>
            <div
              className={`${styles.background} mouse-hover`}
              style={{ backgroundImage: `url(${encodeURIComponent(bgUrl)})` }}
              role="link"
              tabIndex="0"
              aria-label="상세 페이지로 이동" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MainPage;

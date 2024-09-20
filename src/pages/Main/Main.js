import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProjectList from '../../data/ProjectList';
import divideArrayIntoChunks, { useChunkCount } from '../../hooks/divideArrayIntoChunks';
import './Main.css';
import Logo from '../../component/Layout/Logo';
import MouseFollower from '../../component/Layout/MouseFollower';
import SlideAlert from '../../component/Alert/SlideAlert';

function MainPage() {
  const navigate = useNavigate();

  const chunkCount = useChunkCount(3);
  const chunkedImages = divideArrayIntoChunks(ProjectList, chunkCount);

  const columnRef = useRef(null);

  useEffect(() => {
    // 스크롤 막기
    const disableScroll = (e) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    // 스크롤 차단을 위한 이벤트 리스너 추가
    window.addEventListener('scroll', disableScroll, { passive: false });
    window.addEventListener('wheel', disableScroll, { passive: false });
    window.addEventListener('touchmove', disableScroll, { passive: false });

    // 스크롤 애니메이션 실행
    const column = columnRef.current;
    const speed = 1;
    let position = 0;

    const scrollStep = () => {
      position += speed;

      if (position >= column.scrollHeight / 2) {
        position = 0;
      }

      column.style.transform = `translateY(-${position}px)`;
      requestAnimationFrame(scrollStep);
    };

    scrollStep();

    // 컴포넌트가 언마운트되면 스크롤 차단 해제
    return () => {
      window.removeEventListener('scroll', disableScroll);
      window.removeEventListener('wheel', disableScroll);
      window.removeEventListener('touchmove', disableScroll);
    };
  }, []);

  return (
    <>
      <Logo />
      <MouseFollower />

      <SlideAlert direction="vertical" storageKey="mainPageAlertShown" />

      <p className='copyright'>@ 2024</p>

      <div className="mainContainer">
        {chunkedImages.map((chunk, chunkIndex) => (
          <div key={chunkIndex} className='imgColumn' ref={columnRef}>
            {chunk.map((image, index) => (
              <Link to={`/list/${encodeURIComponent(image.category)}/${image.title}`} key={index + chunkIndex * chunk.length}>
                <img src={image.img} alt={image.title} className='mouse-hover'/>
                <div className="info">
                  <span>{image.category}</span>
                  <span>{image.title}</span>
                </div>
              </Link>
            ))}
            {chunk.map((image, index) => (
              <Link to={`/list/${encodeURIComponent(image.category)}/${image.title}`} key={index + chunkIndex * chunk.length}>
                <img src={image.img} alt={image.title} className='mouse-hover'/>
                <div className="info">
                  <span>{image.category}</span>
                  <span>{image.title}</span>
                </div>
              </Link>
            ))}
          </div>
        ))}
      </div>

      {/* {ProjectList.map((project, index) => (
        <Section
          key={project.img}
          title={project.title}
          category={project.category}
          img={project.img}
          onClick={() => handleSectionClick([ProjectList].category, [ProjectList].title)}
        />
      ))} */}
    </>
  );
}

const Section = ({ title, category, img, onClick }) => {
  return (
    <section className="section" onClick={onClick}>
      <div className="wrapper-outer">
        <div className="wrapper-inner">
          <Link to={`/list`}>
            <div className="background mouse-hover" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MainPage;

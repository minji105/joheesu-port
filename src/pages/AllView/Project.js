/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import styles from './List&Project.module.scss';
import imageCountData from '../../data/imageCount.json';
import divideArrayIntoChunks, { useChunkCount } from '../../hooks/divideArrayIntoChunks';
import Header from '../../component/Layout/ProjectHeader';
import SlideAlert from '../../component/Alert/SlideAlert';
import CopyrightBottom from '../../component/Layout/CopyrightBottom';

function Project() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const { title, category } = useParams();

  const [images, setImages] = useState([]);

  useEffect(() => {
    const imagesCount = imageCountData[category][title]
    const imagePaths = Array.from(
      { length: imagesCount },
      (_, index) => `${process.env.PUBLIC_URL}/imgs/${category}/${title}/${index + 1}.jpg`
    );

    const validImages = [];
    let loadedImagesCount = 0;
    imagePaths.forEach((path) => {
      const img = new Image();
      img.src = path;
      img.onload = () => {
        validImages.push({ img: path, title: `image${loadedImagesCount + 1}`, date: new Date().toLocaleDateString() });
        loadedImagesCount++;
        if (loadedImagesCount === imagePaths.length) {
          setImages(validImages);
        }
      };
      img.onerror = () => {
        loadedImagesCount++;
        if (loadedImagesCount === imagePaths.length) {
          setImages(validImages);
        }
        console.log(`Image not found: ${path}`);
      };
    });
  }, [title, category]);

  const [slideIsOpen, setSlideIsOpen] = useState(false);
  const [currentImageIndex, setcurrentImageIndex] = useState(0);

  const openSlide = (index) => {
    setcurrentImageIndex(index);
    setSlideIsOpen(true);
  }

  const nextImage = () => {
    setcurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  }

  const prevImage = () => {
    setcurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }


  const [showGrid, setShowGrid] = useState(true);

  const toggleGrid = () => {
    setShowGrid((prevShowGrid) => !prevShowGrid);
    setSlideIsOpen((prevSlideIsOpen) => !prevSlideIsOpen);
  };

  const handleOnClick = (chunkIndex, chunkCount, index) => {
    toggleGrid(false);
    openSlide(chunkIndex + chunkCount * index);
  };


  const handlers = useSwipeable({
    onSwipedLeft: nextImage,
    onSwipedRight: prevImage,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const chunkCount = useChunkCount();
  const chunkedImages = divideArrayIntoChunks(images, chunkCount);

  return (
    <>
      <Header title={title}></Header>

      <div className={styles.buttons}>
        <p onClick={goBack}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="4"
            className={`h-6 w-6 ${styles.arrowIcon}`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg> Back To List</p>
        <p onClick={toggleGrid} className={`${showGrid ? styles.active : ''}`}>View Grid</p>
      </div>

      {(showGrid && !slideIsOpen) && (
        <div className={styles.gridContainer}>
          {chunkedImages.map((chunk, chunkIndex) => (
            <div key={`column-${chunkIndex}`} className={styles.imageColumn}>
              {chunk.map((image, index) => (
                <div key={`image-${chunkIndex}-${index}`} className={styles.imgContainer}>
                  <img
                    key={index}
                    src={image.img}
                    alt={image.title}
                    onClick={() => handleOnClick(chunkIndex, chunkCount, index)}
                    className={styles.gridImg}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {(!showGrid && slideIsOpen) && (
        <>
          <div className={styles.slideContainer} {...handlers}>
            <SlideAlert direction="horizontal" storageKey="projectPageAlertShown"/>
            <button onClick={prevImage} className={`${styles.arrow} ${styles.leftArrow}`}>&lt;</button>
            <img src={images[currentImageIndex]?.img} alt={`image ${currentImageIndex + 1}`} />
            <button onClick={nextImage} className={`${styles.arrow} ${styles.rightArrow}`}>&gt;</button>
          </div>
          <div className={styles.slideIndex}><p>{currentImageIndex + 1} / {images.length}</p></div>
        </>
      )}

      <CopyrightBottom></CopyrightBottom>
    </>
  );
}

export default Project;

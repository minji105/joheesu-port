/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { Suspense, lazy, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import LazyLoad from 'react-lazyload';
import styles from './List&Project.module.scss';
import imageCountData from '../../data/imageCount.json';
import divideArrayIntoChunks, { useChunkCount } from '../../hooks/divideArrayIntoChunks';
import Header from '../../component/Layout/ProjectHeader';
import CopyrightBottom from '../../component/Layout/CopyrightBottom';

const SlideAlert = lazy(() => import('../../component/Alert/SlideAlert'));

interface Image {
  img: string,
  title: string
}

function Project() {
  const navigate = useNavigate();
  const goBack = () => navigate(`/list?category=${encodeURIComponent(category)}`);

  const { title, category } = useParams();
  const [images, setImages] = useState<Image[]>([]);
  const [slideIsOpen, setSlideIsOpen] = useState<boolean>(false);
  const [currentImageIndex, setcurrentImageIndex] = useState<number>(0);
  const [showGrid, setShowGrid] = useState<boolean>(true);

  useEffect(() => {
    const imagesCount = imageCountData[category][title];
    const imagePaths = Array.from(
      { length: imagesCount },
      (_, index) => `${process.env.PUBLIC_URL}/imgs/${category}/${title}/${index + 1}.webp`
    );

    const loadImages = async () => {
      const validImages = await Promise.all(imagePaths.map(async (path, index) => {
        try {
          const img = new Image();
          img.src = path;
          await img.decode();
          return { img: path, title: `image${index + 1}` };
        } catch (error) {
          console.log(`Image not found: ${path}`);
          return null;
        }
      }));

      setImages(validImages.filter(Boolean));
    };

    loadImages();
  }, [title, category]);

  const openSlide = (index: number) => {
    setcurrentImageIndex(index);
    setSlideIsOpen(true);
  }

  const nextImage = () => {
    setcurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  }

  const prevImage = () => {
    setcurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }

  const toggleGrid = () => {
    setShowGrid((prevShowGrid) => !prevShowGrid);
    setSlideIsOpen((prevSlideIsOpen) => !prevSlideIsOpen);
  };

  const handleOnClick = (chunkIndex: number, chunkCount: number, index: number) => {
    toggleGrid();
    openSlide(chunkIndex + chunkCount * index);
  };

  const handlers = useSwipeable({
    onSwipedLeft: nextImage,
    onSwipedRight: prevImage,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  const chunkCount = useChunkCount({ initialChunkCount: 4 });
  const chunkedImages = divideArrayIntoChunks({ array: images, chunkCount });

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
                  <LazyLoad>
                    <img
                      key={index}
                      src={image.img}
                      alt={image.title}
                      onClick={() => handleOnClick(chunkIndex, chunkCount, index)}
                      className={styles.gridImg}
                    />
                  </LazyLoad>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {(!showGrid && slideIsOpen) && (
        <>
          <div className={styles.slideContainer} {...handlers}>
            <Suspense fallback={<div>Loading alert...</div>}>
              <SlideAlert direction="horizontal" storageKey="projectPageAlertShown" />
            </Suspense>
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

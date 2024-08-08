import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import Modal from 'react-modal';
import './List&Project.css';
import Header from '../../component/Layout/ProjectHeader';
import CopyrightBottom from '../../component/Layout/CopyrightBottom';

Modal.setAppElement('#root');

const divideArrayIntoChunks = (array, chunkCount) => {
  const chunks = Array.from({ length: chunkCount }, () => []);
  array.forEach((item, index) => {
    chunks[index % chunkCount].push(item);
  });
  return chunks;
};

function Project() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(`/list?category=${encodeURIComponent(category)}`);
  };

  const { title, category } = useParams();

  const categoryMap = {
    "Personal Work": "personalWork",
    "Profile": "profile",
    "Snap": "snap"
  };

  const [images, setImages] = useState([]);
  const [chunkCount, setChunkCount] = useState(4);

  useEffect(() => {
    const updateChunkCount = () => {
      if (window.innerWidth <= 768) {
        setChunkCount(3);
      } else {
        setChunkCount(4);
      }
    };

    window.addEventListener('resize', updateChunkCount);
    updateChunkCount();

    return () => {
      window.removeEventListener('resize', updateChunkCount);
    };
  }, []);

  useEffect(() => {
    const imagePaths = Array.from(
      { length: 100 },
      (_, index) => `${process.env.PUBLIC_URL}/imgs/${categoryMap[category]}/${title}/${title}-${index + 1}.jpg`
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
  }, [title]);

  const chunkedImages = divideArrayIntoChunks(images, chunkCount);

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

  return (
    <>
      <Header title={title}></Header>

      <div className="buttons">
        <p onClick={goBack}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="4"
            className='arrow-icon'>
            <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg> Back To List</p>
        <p onClick={toggleGrid} className={showGrid ? 'active' : ''}>View Grid</p>
      </div>

      {(showGrid && !slideIsOpen) && (
        <div className="grid-container">
          {chunkedImages.map((chunk, chunkIndex) => (
            <div key={chunkIndex} className="image-column">
              {chunk.map((image, index) => (
                <div className="img-container">
                  <img
                    key={index}
                    src={image.img}
                    alt={image.title}
                    onClick={() => handleOnClick(chunkIndex, chunkCount, index)}
                    className='grid-img'
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {(!showGrid && slideIsOpen) && (
        <div className="slide-container" {...handlers}>
          <button onClick={prevImage} className="arrow left-arrow">&lt;</button>
          <img src={images[currentImageIndex]?.img} alt={`image ${currentImageIndex + 1}`} />
          <button onClick={nextImage} className="arrow right-arrow">&gt;</button>
          <div className="slide-index"><p>{currentImageIndex + 1} / {images.length}</p></div>
        </div>
      )}

      <CopyrightBottom></CopyrightBottom>
    </>
  );
}

export default Project;

import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import './List.css';
import Header from '../component/Header';
import CopyrightBottom from '../component/CopyrightBottom';

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

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentImageIndex, setcurrentImageIndex] = useState(0);

  const openModal = (index) => {
    setcurrentImageIndex(index);
    setModalIsOpen(true);
    
  }

  const closeModal = () => {
    setModalIsOpen(false);
  }

  const nextImage = () => {
    setcurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  }

  const prevImage = () => {
    setcurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }

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
        <p>View Grid</p>
      </div>

      <div className="list-container">
        {chunkedImages.map((chunk, chunkIndex) => (
          <div key={chunkIndex} className="image-column">
            {chunk.map((image, index) => (
              <img
                key={index}
                src={image.img}
                alt={image.title}
                onClick={() => openModal(chunkIndex + chunkCount * index)}
              />
            ))}
          </div>
        ))}
      </div>

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel='Image Viewer' className="modal" overlayClassName="overlay">
        <button onClick={closeModal} className='close-button'>&times;</button>
        <button onClick={prevImage} className="arrow left-arrow">&lt;</button>
        <img className='modal-image' src={images[currentImageIndex]?.img} alt={`Image ${currentImageIndex + 1}`} />
        <button onClick={nextImage} className="arrow right-arrow">&gt;</button>
      </Modal>

      <CopyrightBottom></CopyrightBottom>
    </>
  );
}

export default Project;

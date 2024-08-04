import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './List.css';
import CopyrightBottom from '../component/CopyrightBottom';

const divideArrayIntoChunks = (array, chunkCount) => {
  const chunks = Array.from({ length: chunkCount }, () => []);
  array.forEach((item, index) => {
    chunks[index % chunkCount].push(item);
  });
  return chunks;
};

function Project() {
  const navigate = useNavigate();

  const { title, category } = useParams();

  const categoryMap = {
    "Personal Work": "personalWork",
    "Profile": "profile",
    "Snap": "snap"
  };

  const [images, setImages] = useState([]);

  const goBack = () => {
    navigate(`/list?category=${encodeURIComponent(category)}`);
  };

  useEffect(() => {
    const imagePaths = Array.from(
      { length: 10 },
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

  const chunkedImages = divideArrayIntoChunks(images, 4);

  return (
    <>
      <div className="project-header">
        <div className='title'>{title}</div>
        <div className="buttons">
          <p onClick={goBack}>&#10229; Back To List</p>
          <p>View Grid</p>
        </div>
      </div>

      <div className="list-container">
        {chunkedImages.map((chunk, chunkIndex) => (
          <div key={chunkIndex} className="image-column">
            {chunk.map((image, index) => (
              <img
                src={image.img}
                alt={image.title}
              />
            ))}
          </div>
        ))}
      </div>

      <CopyrightBottom></CopyrightBottom>
    </>
  );
}

export default Project;

import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './List&Project.module.scss';
import ProjectList from '../../data/ProjectList';
import divideArrayIntoChunks, { useChunkCount } from '../../hooks/divideArrayIntoChunks';
import Header from '../../component/Layout/ProjectHeader';
import CopyrightBottom from '../../component/Layout/CopyrightBottom';
import Category from '../../component/Container/Category';

function List() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get('category') || 'All';

  const filteredData = selectedCategory === 'All'
    ? ProjectList
    : ProjectList.filter(item => item.category === selectedCategory);

  const chunkCount = useChunkCount();
  const chunkedImages = divideArrayIntoChunks(filteredData, chunkCount);

  // useEffect(() => {
  //   const imageContainers = document.querySelectorAll(`.${styles.imgContainer.replace(/&/g, '\\&')}`);

  //   imageContainers.forEach((container) => {
  //     const img = container.querySelector('img');

  //     // 이미지가 로드되었을 때 비율을 계산
  //     img.onload = () => {
  //       const aspectRatio = img.naturalHeight / img.naturalWidth;
  //       container.style.paddingBottom = `${aspectRatio * 100}%`;
  //     };

  //     if (img.complete) {
  //       img.onload();
  //     }
  //   });
  // }, [filteredData]);

  return (
    <>
      <Header title={'PROJECTS'}></Header>

      <Category selectedCategory={selectedCategory}></Category>

      <div className={styles.gridContainer}>
        {chunkedImages.map((chunk, chunkIndex) => (
          <div key={chunkIndex} className={styles.imageColumn}>
            {chunk.map((image, index) => (
              <Link
                to={`/list/${encodeURIComponent(image.category)}/${image.title}`}
                key={index + chunkIndex * chunk.length}
                className={styles.imgContainer}>
                <img
                  src={image.img}
                  alt={image.title}
                  style={{
                    position: 'absolute',
                    top: '0',
                    left: '0'
                  }}
                  onLoad={(e) => {
                    const aspectRatio = e.target.naturalHeight / e.target.naturalWidth;
                    e.currentTarget.parentElement.style.paddingBottom = `${aspectRatio * 100}%`;
                  }}
                />
                <div className={styles.projectInfo}>
                  <span>{image.title}</span>
                  <span style={{
                    marginTop: '7px'
                  }}>{image.date}</span>
                </div>
              </Link>
            ))}
          </div>
        ))}
      </div>

      <CopyrightBottom></CopyrightBottom>
    </>
  );
}

export default List;

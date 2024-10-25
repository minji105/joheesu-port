import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
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
                <LazyLoad offset={1000}>
                  <img
                    srcSet={`${image.img.small} 480w,
                              ${image.img.medium} 1024w,
                              ${image.img.large} 1531w,
                              ${image.img.xlarge} 1920w
                              `}
                    sizes="(max-width: 480px) 480px,
                           (max-width: 1024px) 1024px,
                           (max-width: 1531px) 1531px,
                           1920px"
                    src={image.img.large}
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
                </LazyLoad>
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

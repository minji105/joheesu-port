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
                <LazyLoad offset={300}>
                  <picture>
                    <source
                      media="(max-width: 480px)"
                      srcSet={image.img.small}
                      sizes="148px"
                    />
                    <source
                      media="(max-width: 1024px)"
                      srcSet={image.img.medium}
                      sizes="245px"
                    />
                    <source
                      media="(max-width: 1540px)"
                      srcSet={image.img.large}
                      sizes="365px"
                    />
                    <source
                      media="(min-width: 1541px)"
                      srcSet={image.img.xlarge}
                      sizes="1920px"
                    />
                    <img
                      src={image.img.small}
                      alt={image.title}
                      onLoad={(e) => {
                        const aspectRatio = e.target.naturalHeight / e.target.naturalWidth;
                        e.currentTarget.parentElement.style.paddingBottom = `${aspectRatio * 100}%`;
                      }}
                    />
                  </picture>
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

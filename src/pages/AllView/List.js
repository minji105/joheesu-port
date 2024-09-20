import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './List&Project.css';
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

      <div className="grid-container">
        {chunkedImages.map((chunk, chunkIndex) => (
          <div key={chunkIndex} className="image-column">
            {chunk.map((image, index) => (
              <Link to={`/list/${encodeURIComponent(image.category)}/${image.title}`} key={index + chunkIndex * chunk.length} className='img-container'>
                <img
                  src={image.img}
                  alt={image.title}
                  style={{
                    height: '100%',
                    cursor: 'pointer'
                  }}
                />
                <div className="project-info">
                  <span>{image.title}</span>
                  <span style={{ 
                    marginTop: '7px' }}>{image.date}</span>
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

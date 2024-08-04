import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './List.css';
import CopyrightBottom from '../component/CopyrightBottom';

const projectData = [
  { img: `${process.env.PUBLIC_URL}/imgs/personalWork/1/1-1.jpg`, title: "1", category: "Personal Work", date: "2022" },
  { img: `${process.env.PUBLIC_URL}/imgs/personalWork/2/2-1.jpg`, title: "2", category: "Personal Work", date: "2022" },
  { img: `${process.env.PUBLIC_URL}/imgs/personalWork/3/3-1.jpg`, title: "3", category: "Personal Work", date: "2022" },
  { img: `${process.env.PUBLIC_URL}/imgs/personalWork/4/4-1.jpg`, title: "4", category: "Personal Work", date: "2022" },
  { img: `${process.env.PUBLIC_URL}/imgs/personalWork/5/5-1.jpg`, title: "5", category: "Personal Work", date: "2022.05" },
  { img: `${process.env.PUBLIC_URL}/imgs/personalWork/6/6-1.jpg`, title: "6", category: "Personal Work", date: "2022.06" },
  { img: `${process.env.PUBLIC_URL}/imgs/personalWork/7/7-1.jpg`, title: "7", category: "Personal Work", date: "2023.02" },
  { img: `${process.env.PUBLIC_URL}/imgs/personalWork/8/8-1.jpg`, title: "8", category: "Personal Work", date: "2022.05" },
  { img: `${process.env.PUBLIC_URL}/imgs/personalWork/9/9-1.jpg`, title: "9", category: "Personal Work", date: "2022" },
  { img: `${process.env.PUBLIC_URL}/imgs/personalWork/10/10-1.jpg`, title: "10", category: "Personal Work", date: "2022" },
  { img: `${process.env.PUBLIC_URL}/imgs/profile/1/1-1.jpg`, title: "1", category: "Profile", date: "2022" },
  { img: `${process.env.PUBLIC_URL}/imgs/profile/2/2-1.jpg`, title: "2", category: "Profile", date: "2022" },
  { img: `${process.env.PUBLIC_URL}/imgs/profile/3/3-1.jpg`, title: "3", category: "Profile", date: "2022" },
  { img: `${process.env.PUBLIC_URL}/imgs/snap/1/1-1.jpg`, title: "1", category: "Snap", date: "2022" },
  { img: `${process.env.PUBLIC_URL}/imgs/snap/2/2-1.jpg`, title: "2", category: "Snap", date: "2022" },
  { img: `${process.env.PUBLIC_URL}/imgs/snap/3/3-1.jpg`, title: "3", category: "Snap", date: "2022" },
  { img: `${process.env.PUBLIC_URL}/imgs/snap/4/4-1.jpg`, title: "4", category: "Snap", date: "2022" }
];

const divideArrayIntoChunks = (array, chunkCount) => {
  const chunks = Array.from({ length: chunkCount }, () => []);
  array.forEach((item, index) => {
    chunks[index % chunkCount].push(item);
  });
  return chunks;
};

function List() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get('category') || 'All';

  const filteredData = selectedCategory === 'All'
    ? projectData
    : projectData.filter(item => item.category === selectedCategory);

  const chunkedImages = divideArrayIntoChunks(filteredData, 4);

  return (
    <>
      <div className="project-header">
        <div className='title'>PROJECTS</div>
      </div>

      <div className="list">
        <p className={selectedCategory === 'All' ? 'active' : ''} onClick={() => window.location.href = '/#/list?category=All'}>All</p>
        <p className={selectedCategory === 'Beauty' ? 'active' : ''} onClick={() => window.location.href = '/#/list?category=Beauty'}>Beauty</p>
        <p className={selectedCategory === 'Personal Work' ? 'active' : ''} onClick={() => window.location.href = '/#/list?category=Personal Work'}>Personal Work</p>
        <p className={selectedCategory === 'Profile' ? 'active' : ''} onClick={() => window.location.href = '/#/list?category=Profile'}>Profile</p>
        <p className={selectedCategory === 'Snap' ? 'active' : ''} onClick={() => window.location.href = '/#/list?category=Snap'}>Snap</p>
        <p className={selectedCategory === 'Log' ? 'active' : ''} onClick={() => window.location.href = '/#/list?category=Log'}>Log</p>
      </div>

      <div className="list-container">
        {chunkedImages.map((chunk, chunkIndex) => (
          <div key={chunkIndex} className="image-column">
            {chunk.map((image, index) => (
              <Link to={`/list/${image.category}/${image.title}`} key={index + chunkIndex * chunk.length} className='img-container'>
                <img
                  src={image.img}
                  alt={image.title}
                />
                <div className="project-info">
                  <span>{image.title}</span>
                  <span style={{ fontSize: '12px' }}>{image.date}</span>
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

import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './List&Project.css';
import Header from '../../component/Layout/ProjectHeader';
import CopyrightBottom from '../../component/Layout/CopyrightBottom';
import Category from '../../component/Container/Category';

const projectData = [
  { img: `${process.env.PUBLIC_URL}/imgs/beauty/&byromand/&byromand-1.jpg`, title: "&byromand", category: "Beauty", date: "2023.12" },
  { img: `${process.env.PUBLIC_URL}/imgs/beauty/rom&nd_1/rom&nd_1-1.jpg`, title: "rom&nd_1", category: "Beauty", date: "2024.03" },
  { img: `${process.env.PUBLIC_URL}/imgs/beauty/rom&nd_2/rom&nd_2-1.jpg`, title: "rom&nd_2", category: "Beauty", date: "2024.05" },
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
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get('category') || 'All';

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

  const filteredData = selectedCategory === 'All'
    ? projectData
    : projectData.filter(item => item.category === selectedCategory);

  const chunkedImages = divideArrayIntoChunks(filteredData, chunkCount);

  return (
    <>
      <Header title={'PROJECTS'}></Header>

      <Category selectedCategory={selectedCategory}></Category>

      <div className="grid-container">
        {chunkedImages.map((chunk, chunkIndex) => (
          <div key={chunkIndex} className="image-column">
            {chunk.map((image, index) => (
              <Link to={`/list/${image.category}/${image.title}`} key={index + chunkIndex * chunk.length} className='img-container'>
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
                    fontSize: '12px',
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

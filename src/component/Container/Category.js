import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Category.css';
import CloseButton from '../Buttons/CloseButton';

function Category({ selectedCategory }) {
  const navigate = useNavigate();
  const [categoryOpen, setCategoryOpen] = useState(false);

  const categories = [
    'All',
    'Beauty',
    'Personal Work',
    'Profile',
    'Snap',
    'Log'
  ];

  const toggleCategory = () => {
    setCategoryOpen((prevCategoryOpen) => !prevCategoryOpen);
  }

  const closeCategory = (category) => {
    setCategoryOpen(false);
    navigate(`/list?category=${category}`)
  }

  return (
    <>
      <p className="category-button" onClick={toggleCategory}>
        {selectedCategory === 'All' ? 'Category' : selectedCategory}
      </p>

      <div className={`category-container ${categoryOpen ? 'open' : ''}`}>
        <CloseButton onClick={toggleCategory} style={{ right: '0' }} />
        {categories.map((category) => (
          <p
            key={category}
            className={selectedCategory === category ? 'active' : ''}
            onClick={() => closeCategory(category)}
          >
            {category}
          </p>
        ))}
      </div>

      <nav>
        {categories.map((category) => (
          <p
            key={category}
            className={selectedCategory === category ? 'active' : ''}
            onClick={() => navigate(`/list?category=${category}`)}
          >
            {category}
          </p>
        ))}
      </nav>
    </>
  );
}

export default Category;

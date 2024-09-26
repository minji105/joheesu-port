import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Category.module.scss';
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
      <p className={styles.categoryButton} onClick={toggleCategory}>
        {selectedCategory === 'All' ? 'Category' : selectedCategory}
      </p>

      <div className={`${styles.categoryContainer} ${categoryOpen ? styles.open : ''}`}>
        <CloseButton onClick={toggleCategory} style={{ right: '0' }} />
        {categories.map((category) => (
          <p
            key={category}
            className={`${selectedCategory === category ? styles.active : ''}`}
            onClick={() => closeCategory(category)}
          >
            {category}
          </p>
        ))}
      </div>

      <div className={styles.nav}>
        {categories.map((category) => (
          <p
            key={category}
            className={`${selectedCategory === category ? styles.active : ''}`}
            onClick={() => navigate(`/list?category=${category}`)}
          >
            {category}
          </p>
        ))}
      </div>
    </>
  );
}

export default Category;

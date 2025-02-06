import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Category.module.scss';

function Category({ selectedCategory }: { selectedCategory: string }) {
  const navigate = useNavigate();
  const [categoryOpen, setCategoryOpen] = useState<boolean>(false);

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
        <p className={styles.closeButton} onClick={toggleCategory}>&#10005;</p>
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

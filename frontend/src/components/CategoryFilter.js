
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const CategoryFilter = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      // Bu endpoint'i backend'de oluşturmamız gerekecek
      const { data } = await axios.get('/api/products/categories');
      setCategories(data);
    };
    fetchCategories();
  }, []);

  return (
    <div className='card p-3'>
      <h5>Categories</h5>
      <ul className='list-group list-group-flush'>
        <li className='list-group-item'>
          <Link to='#' onClick={() => onSelectCategory('')}>All</Link>
        </li>
        {categories.map((category) => (
          <li key={category} className='list-group-item'>
            <Link to='#' onClick={() => onSelectCategory(category)}>{category}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryFilter;

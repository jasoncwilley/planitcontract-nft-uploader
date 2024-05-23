// pages/userId1.js
import React, { useEffect, useState } from 'react';
import styles from './userid1.module.css';

const UserId1 = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/getImages');
        const data = await response.json();
        setImages(data);
      } catch (error) {
        setError('Error fetching data');
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <h1>User ID 1 Images</h1>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.imagesContainer}>
        {images.map((image, index) => (
          <div key={index} className={styles.imageWrapper}>
            <object data={image.image_link} type="image/jpeg" className={styles.imageObject}>
              Image could not be loaded.
            </object>
            <a href={image.image_link} target="_blank" rel="noopener noreferrer" className={styles.viewLink}>Click To View</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserId1;


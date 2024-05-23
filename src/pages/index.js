import React from 'react';
import { useRouter } from 'next/router';
import PdfForm from '../components/PdfForm';
import JsonForm from '../components/JsonForm';
import styles from './HomePage.module.css'; // Assuming you are using CSS modules

const HomePage = () => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push('/userid1');
  };

  return (
    <div className={styles.container}>
      <h1>Arweave Transaction Forms</h1>
      <div>
        <PdfForm />
      </div>
      <div>
        <JsonForm />
      </div>
      <button className={styles.button} onClick={handleButtonClick}>
        Go to User ID 1 Page
      </button>
    </div>
  );
};

export default HomePage;



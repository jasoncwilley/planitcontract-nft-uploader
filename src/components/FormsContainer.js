// components/FormsContainer.js
import React, { useState } from 'react';
import PdfForm from './PdfForm';
import MetadataForm from './MetadataForm';
import styles from './FormsContainer.module.css';

const FormsContainer = () => {
  const [pdfTxId, setPdfTxId] = useState('');

  return (
    <div className={styles.container}>
      <PdfForm onTransactionComplete={setPdfTxId} />
      <MetadataForm pdfTxId={pdfTxId} />
    </div>
  );
};

export default FormsContainer;


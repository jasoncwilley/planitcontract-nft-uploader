import React, { useState } from 'react';
import styles from './PdfForm.module.css';
import { createTransaction } from '../utils/arweave';

const PdfForm = ({ onTransactionComplete }) => {
  const [formData, setFormData] = useState({
    'Content-Type': 'application/pdf',
    name: '',
    description: '',
    tags: [],
    ownersWallet: '',
    userId: '',
    pdfFile: null,
  });
  const [txId, setTxId] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Your form validation logic here

    try {
      const txId = await createTransaction(formData);
      setTxId(txId);
      setError('');

      // Send data to API route
      const response = await fetch('/api/uploadPdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: formData.userId, txId }),
      });

      if (!response.ok) {
        throw new Error('Failed to insert data into MySQL');
      }

      if (onTransactionComplete) {
        onTransactionComplete(txId);
      }
    } catch (error) {
      setError('Error submitting transaction: ' + error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      pdfFile: file,
    });
  };

  const handleTagChange = (e, index) => {
    const newTags = [...formData.tags];
    newTags[index] = e.target.value;
    setFormData({
      ...formData,
      tags: newTags,
    });
  };

  const handleAddTag = () => {
    setFormData({
      ...formData,
      tags: [...formData.tags, ''],
    });
  };

  return (
    <div className={styles.container}>
      <h2>PDF Metadata Form</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label>Content-Type:</label>
          <input type="text" name="Content-Type" value={formData['Content-Type']} onChange={handleChange} disabled />
        </div>
        <div>
          <label>PDF File:</label>
          <input type="file" name="pdfFile" onChange={handleFileChange} accept="application/pdf" />
        </div>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <label>Description:</label>
          <input type="text" name="description" value={formData.description} onChange={handleChange} />
        </div>
        <div>
          <label>Tags:</label>
          {formData.tags.map((tag, index) => (
            <input key={index} type="text" value={tag} onChange={(e) => handleTagChange(e, index)} />
          ))}
          <button type="button" onClick={handleAddTag}>Add Tag</button>
        </div>
        <div>
          <label>Owner's Wallet:</label>
          <input type="text" name="ownersWallet" value={formData.ownersWallet} onChange={handleChange} />
        </div>
        <div>
          <label>User ID:</label>
          <input type="text" name="userId" value={formData.userId} onChange={handleChange} />
        </div>
        <button type="submit" className={styles.submitButton}>Submit</button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
      {txId && (
        <p className={styles.txId}>
          Transaction ID: <a href={`https://arweave.net/${txId}`} target="_blank" rel="noopener noreferrer">https://arweave.net/{txId}</a>
        </p>
      )}
    </div>
  );
};

export default PdfForm;


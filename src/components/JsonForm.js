// components/MetadataForm.js
import React, { useState } from 'react';
import styles from './JsonForm.module.css';
import { createTransaction } from '../utils/metadatatransaction';

const MetadataForm = () => {
  const [formData, setFormData] = useState({
    'Content-Type': 'application/json',
    Uploaded_by: 'planitcontract.com',
    user_id: '1',
    Owner: {
      "Owner's Wallet Address": '',
    },
    File: {
      'Content-Type': 'application/pdf',
      'Link': '', // Changed from 'pdfFile' to 'Link'
    },
    tags: [''],
  });
  const [txId, setTxId] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('Owner.')) {
      const ownerKey = name.split('.')[1];
      setFormData({
        ...formData,
        Owner: {
          ...formData.Owner,
          [ownerKey]: value,
        },
      });
    } else if (name.startsWith('File.')) {
      const fileKey = name.split('.')[1];
      setFormData({
        ...formData,
        File: {
          ...formData.File,
          [fileKey]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const txId = await createTransaction(formData);
      setTxId(txId);
      setError('');
    } catch (error) {
      setError('Error submitting transaction: ' + error.message);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Metadata Form</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label>Content-Type:</label>
          <input type="text" name="Content-Type" value={formData['Content-Type']} onChange={handleChange} disabled />
        </div>
        <div>
          <label>Uploaded by:</label>
          <input type="text" name="Uploaded_by" value={formData.Uploaded_by} onChange={handleChange} disabled />
        </div>
        <div>
          <label>User ID:</label>
          <input type="text" name="user_id" value={formData.user_id} onChange={handleChange} disabled />
        </div>
        <div>
          <label>Owner's Wallet Address:</label>
          <input type="text" name="Owner.Owner's Wallet Address" value={formData.Owner["Owner's Wallet Address"]} onChange={handleChange} />
        </div>
        <div>
          <label>File Content-Type:</label>
          <input type="text" name="File.Content-Type" value={formData.File['Content-Type']} onChange={handleChange} disabled />
        </div>
        <div>
          <label>File Link:</label>
          <input type="text" name="File.Link" value={formData.File.Link} onChange={handleChange} /> {/* Changed from 'pdfFile' to 'Link' */}
        </div>
        <div>
          <label>Tags:</label>
          {formData.tags.map((tag, index) => (
            <input key={index} type="text" value={tag} onChange={(e) => handleTagChange(e, index)} />
          ))}
          <button type="button" onClick={handleAddTag}>Add Tag</button>
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

export default MetadataForm;


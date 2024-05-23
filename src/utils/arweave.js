// utils/arweave.js
import { getArweaveInstance, getWalletKey } from './helpers';

export const createTransaction = async (metadata) => {
  const arweave = getArweaveInstance();
  const wallet = getWalletKey();

  try {
    // Read the file as a buffer
    const fileBuffer = await metadata.pdfFile.arrayBuffer();
    const data = new Uint8Array(fileBuffer);

    const transaction = await arweave.createTransaction({
      data: data,
    }, wallet);

    transaction.addTag('Content-Type', metadata['Content-Type']);
    transaction.addTag('Name', metadata.name);
    transaction.addTag('Description', metadata.description);
    transaction.addTag('Owner', metadata.ownersWallet);
    transaction.addTag('UserId', metadata.userId);
    metadata.tags.forEach(tag => {
      transaction.addTag('Tag', tag);
    });

    // Sign the transaction
    await arweave.transactions.sign(transaction, wallet);

    // Submit the transaction
    const response = await arweave.transactions.post(transaction);

    if (response.status === 200 || response.status === 202) {
      return transaction.id;
    } else {
      throw new Error(`Transaction failed with status ${response.status}`);
    }
  } catch (error) {
    console.error('Error creating transaction:', error);
    throw error;
  }
};


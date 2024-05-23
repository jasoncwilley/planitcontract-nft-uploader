import { getArweaveInstance, getWalletKey } from './helpers';

export const createTransaction = async (metadata) => {
  const arweave = getArweaveInstance();
  const wallet = getWalletKey();

  try {
    const transaction = await arweave.createTransaction({
      data: JSON.stringify(metadata),
    }, wallet);

    // Add tags
    transaction.addTag('Content-Type', metadata['Content-Type']);
    transaction.addTag('Uploaded by', metadata.Uploaded_by);
    transaction.addTag('User ID', metadata.user_id);
    transaction.addTag('Owner', metadata.Owner["Owner's Wallet Address"]);
    transaction.addTag('File Content-Type', metadata.File['Content-Type']);
    transaction.addTag('File Link', metadata.File.link);
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

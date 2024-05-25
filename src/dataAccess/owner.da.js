import { doc, getDoc, setDoc } from 'firebase/firestore';
import { DB } from '../clients/firebase.app';

export default class OwnerDA {
  static instance;
  ENTITY_NAME = 'owners';
  constructor() { }
  /**
   * Retrieve the singleton instance of OwnerDA.
   *
   * This method is a way to get the instance of the OwnerDA class, as this class is a
   * singleton (only one instance of it is needed in the whole application).
   *
   * @return {OwnerDA} The singleton instance of OwnerDA
   */
  static getInstance() {
    if (!OwnerDA.instance) {
      // If there is no instance created yet, create a new one
      OwnerDA.instance = new OwnerDA();
    }
    // Return the Singleton instance of OwnerDA
    return OwnerDA.instance;
  }
  /**
   * Add a new document in the "owners" collection.
   *
   * This method adds a new document to the "owners" collection in Firestore, using
   * the provided ownerId and ownerData.
   *
   * @param {string} ownerId - The ID of the owner to create
   * @param {Partial<IOwner>} ownerData - The data of the owner to create
   * @return {Promise<void>} A promise that resolves when the document is successfully added
   */
  async create(ownerId, ownerData) {
    // Add a new document in collection "owners"
    // using the owner's id and data provided
    await setDoc(doc(DB, this.ENTITY_NAME, ownerId), ownerData);
    return ownerData;
  }
  /**
   * Find one owner by its ID.
   *
   * This method retrieves an owner from the "owners" collection in Firestore
   * using its ID as a parameter. If the owner exists, it returns its data.
   *
   * @param {string} ownerId - The ID of the owner to find.
   * @return {Promise<IOwner>} The data of the found owner, if it exists.
   */
  async findOne(ownerId) {
    const docRef = doc(DB, this.ENTITY_NAME, ownerId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw Error(`Owner with id ${ownerId} does not exist`);
    }
    return docSnap.data();
  }

  async update(ownerId, ownerData) {
    // Construct a reference to the owner document
    const ownerRef = doc(DB, this.ENTITY_NAME, ownerId);
    try {
      // Retrieve the owner document to ensure it exists 
      const ownerSnapShot = await getDoc(ownerRef);
      // Merge the existing data with the new data
      const updatedData = { ...ownerSnapShot.data(), ...ownerData };
      // Update the owner document with the merged data
      await setDoc(ownerRef, updatedData);
      return true
    } catch (error) {
      throw error;
    }
  }
}

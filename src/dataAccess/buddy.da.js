import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { DB } from '../clients/firebase.app';

export default class BuddyDA {
  static instance;
  ENTITY_NAME = 'buddies';
  constructor() { }
  /**
   * Retrieve the singleton instance of BuddyDA.
   *
   * This method is a way to get the instance of the BuddyDA class, as this class is a
   * singleton (only one instance of it is needed in the whole application).
   *
   * @return {BuddyDA} The singleton instance of BuddyDA
   */
  static getInstance() {
    if (!BuddyDA.instance) {
      BuddyDA.instance = new BuddyDA();
    }
    return BuddyDA.instance;
  }
  /**
   * Add a new document in the "buddies" collection.
   *
   * @param {string} buddyId - the id of the buddy to create
   * @param {Partial<IOwner>} BuddyData - the data of the buddy to create
   * @return {Promise<void>} a promise that resolves when the document is successfully added
   */
  async create(buddyId, buddyData) {
    // Add a new document in the "buddies" collection
    // using the buddy's id and data provided
    return await setDoc(doc(DB, this.ENTITY_NAME, buddyId), buddyData);
  }
  /**
   * Find a buddy document by its owner id.
   *
   * @param {string} ownerId - The id of the owner of the buddy document
   * @return {Promise<any>} A promise that resolves with the data of the found buddy document,
   * or null if no document is found.
   */
  async findOne(buddyId) {
    const docRef = doc(DB, this.ENTITY_NAME, buddyId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  }
  /**
   * A description of the entire function.
   *
   * @param {string} ownerId - description of parameter
   * @return {Promise<IBuddy[]>} description of return value
   */
  async findAll(ownerId) {
    const buddies = [];
    const queryRequest = query(
      collection(DB, this.ENTITY_NAME),
      where('ownerId', '==', ownerId)
    );
    const docSnaps = await getDocs(queryRequest);
    docSnaps.forEach((docSnap) => {
      // Get the data from the document snapshot
      const buddyData = docSnap.data();
      // Add the buddyId field to the data
      buddyData.buddyId = docSnap.id;
      // Push the modified data to the buddies array
      buddies.push(buddyData);
    });
    return buddies;
  }
  /**
 * Deletes a buddy document from Firestore based on owner ID and buddy ID.
 *
 * @param {string} ownerId - The ID of the owner.
 * @param {string} buddyId - The ID of the buddy document to delete.
 * @return {Promise<void>} A Promise that resolves once the deletion is complete.
 */
  async deleteBuddy(ownerId, buddyId) {
    // Construct a reference to the buddy document
    const buddyRef = doc(DB, this.ENTITY_NAME, buddyId);
    try {
      // Retrieve the buddy document to ensure it exists and belongs to the owner
      const buddySnapshot = await getDoc(buddyRef);

      // Check if the buddy document exists and belongs to the owner
      if (buddySnapshot.exists() && buddySnapshot.data().ownerId === ownerId) {
        // Delete the buddy document
        await deleteDoc(buddyRef);
      }
    } catch (error) {
      throw error;
    }
  }
  /**
 * Updates a buddy document in Firestore based on owner ID, buddy ID, and new data.
 *
 * @param {string} ownerId - The ID of the owner.
 * @param {string} buddyId - The ID of the buddy document to update.
 * @param {Object} newData - The new data to update in the buddy document.
 * @return {Promise<void>} A Promise that resolves once the update is complete.
 */
  async updateBuddy(ownerId, buddyId, newData) {
    // Construct a reference to the buddy document
    const buddyRef = doc(DB, 'buddies', buddyId);

    try {
      // Retrieve the buddy document to ensure it exists and belongs to the owner
      const buddySnapshot = await getDoc(buddyRef);

      // Check if the buddy document exists and belongs to the owner
      if (buddySnapshot.exists() && buddySnapshot.data().ownerId === ownerId) {
        // Merge the existing data with the new data
        const updatedData = { ...buddySnapshot.data(), ...newData };
        // Update the buddy document with the merged data
        await setDoc(buddyRef, updatedData);
      }
      return true
    } catch (error) {
      
      throw error;
    }
  }
}


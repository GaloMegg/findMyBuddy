import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where
} from 'firebase/firestore';
import { DB } from '../clients/firebase.app';


export default class SearchDA {
  static instance;
  ENTITY_NAME = 'searches';
  constructor() { }
  /**
   * Retrieve the singleton instance of SearchDA.
   *
   * This method is a way to get the instance of the SearchDA class, as this class is a
   * singleton (only one instance of it is needed in the whole application).
   *
   * @return {SearchDA} The singleton instance of SearchDA
   */
  static getInstance() {
    if (!SearchDA.instance) {
      SearchDA.instance = new SearchDA();
    }
    return SearchDA.instance;
  }
  /**
   * Add a new document in the "buddies" collection.
   *
   * @param {string} searchId - the id of the buddy to create
   * @param {Partial<IOwner>} searchData - the data of the buddy to create
   * @return {Promise<void>} a promise that resolves when the document is successfully added
   */
  async create(searchId, searchData) {
    // Add a new document in the "buddies" collection
    // using the buddy's id and data provided

    return await setDoc(doc(DB, this.ENTITY_NAME, searchId), searchData);
  }
  /**
   * Find a buddy document by its owner id.
   *
   * @param {string} ownerId - The id of the owner of the buddy document
   * @return {Promise<any>} A promise that resolves with the data of the found buddy document,
   * or null if no document is found.
   */
  async findOne(searchId) {
    const docRef = doc(DB, this.ENTITY_NAME, searchId);
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


  async findAll(latitude, longitude) {

    try {
      // Calculate latitude and longitude bounds for the query
      const lat = latitude;
      const lon = longitude;
      const latDelta = 0.009; // Approximately 1km in latitude
      const lonDelta = 0.009 / Math.cos(lat * Math.PI / 180); // Approximately 1km in longitude at this latitude

      // Calculate the minimum and maximum latitude and longitude values for the query.
      // We subtract `latDelta` from the current latitude to get the minimum latitude and add `latDelta` to get the maximum latitude. 
      // We do the same for the longitude.
      const minLat = lat - latDelta; // Lower bound of latitude range
      const maxLat = lat + latDelta; // Upper bound of latitude range
      const minLon = lon - lonDelta; // Lower bound of longitude range
      const maxLon = lon + lonDelta; // Upper bound of longitude range

      // Construct the Firestore query
      const buddiesRef = collection(DB, this.ENTITY_NAME);
      const q = query(
        buddiesRef,
        where('latitude', '>=', minLat),
        where('latitude', '<=', maxLat),
        where('longitude', '>=', minLon),
        where('longitude', '<=', maxLon)
      );

      // Execute the query
      const querySnapshot = await getDocs(q);

      // Extract pet data from query results
      const LostBuddies = [];
      querySnapshot.forEach((docSnap) => {
        const buddyData = docSnap.data();
        buddyData.searchId = docSnap.id;
        LostBuddies.push(buddyData);
      });

      return LostBuddies;
    }
    catch (error) {
      throw error;
    }
  };
  /**
 * Deletes a buddy document from Firestore based on owner ID and buddy ID.
 *
 * @param {string} ownerId - The ID of the owner.
 * @param {string} searchId - The ID of the buddy document to delete.
 * @return {Promise<void>} A Promise that resolves once the deletion is complete.
 */
  async deleteSearchbyBuddyId(buddyId) {
    // Construct a reference to the buddy document
    const buddiesRef = collection(DB, this.ENTITY_NAME);
    const q = query(
      buddiesRef,
      where('buddyId', '==', buddyId),
    );
    try {
      const querySnapshot = await getDocs(q);
      // Extract pet data from query results
      const lostBuddies = [];
      querySnapshot.forEach((docSnap) => {
        const petData = docSnap.data();
        petData.searchId = docSnap.id;
        lostBuddies.push(petData);
      });
      for await (const num of lostBuddies) {
        await this.deleteSearchbyId(num.searchId)
      }
      return lostBuddies;
    } catch (error) {
      throw error;
    }
  }


  /**
   * Deletes a search document by its ID.
   *
   * @param {string} searchId - The ID of the search document to delete.
   * @return {Promise<void>} A Promise that resolves once the search document is deleted.
   * @throws {Error} If the search document does not exist or does not belong to the owner.
   */
  async deleteSearchbyId(searchId) {
    // Construct a reference to the buddy document
    const searchRef = doc(DB, this.ENTITY_NAME, searchId);
    try {
      // Retrieve the buddy document to ensure it exists and belongs to the owner
      const buddySnapshot = await getDoc(searchRef);

      // Check if the buddy document exists and belongs to the owner
      if (buddySnapshot.exists()) {
        // Delete the buddy document
        await deleteDoc(searchRef);
      }
      return buddySnapshot.data()
    } catch (error) {
      throw error;
    }
  }
  /**
 * Updates a buddy document in Firestore based on owner ID, buddy ID, and new data.
 *
 * @param {string} ownerId - The ID of the owner.
 * @param {string} searchId - The ID of the buddy document to update.
 * @param {Object} newData - The new data to update in the buddy document.
 * @return {Promise<void>} A Promise that resolves once the update is complete.
 */
  async updateBuddy(ownerId, searchId, newData) {
    // Construct a reference to the buddy document
    const buddyRef = doc(DB, 'buddies', searchId);

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
    } catch (error) {

      throw error;
    }
  }
}


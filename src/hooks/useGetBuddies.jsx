import { useEffect, useState } from 'react';
import uuid from 'react-native-uuid';
import BuddyService from '~/services/buddy.service';


const buddyService = BuddyService.getInstance();
/**
 * Returns an object containing buddies, a function to delete a buddy, and a loading state.
 *
 * @param {Object} param - An object containing the ownerId of the buddies to retrieve.
 * @param {string} param.ownerId - The ownerId of the buddies to retrieve.
 * @return {Object} An object containing buddies, a function to delete a buddy, and a loading state.
 */
const useGetBuddies = ({ ownerId }) => {
  const [buddies, setBuddies] = useState([]);
  const [loading, setLoading] = useState(true);

  /**
   * Retrieves all buddies for a given owner ID.
   *
   * @param {number} ownerId - The ID of the owner.
   * @return {Promise<void>} - A promise that resolves when the operation is complete.
   */
  const getAllBuddies = async (ownerId, where) => {

    try {
      setLoading(true);
      const result = await buddyService.findAll(ownerId);
      setBuddies(result);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Delete a buddy for a given owner.
   *
   * @param {type} ownerId - description of ownerId
   * @param {type} buddyId - description of buddyId
   * @return {type} description of return value
   */
  const deleteBuddy = async (buddyData) => {
    setLoading(true)
    try {
      if (!buddyData.name || !buddyData.type || !buddyData.status) { throw new Error('Missing buddy data') }
      result = await buddyService.delete(buddyData.ownerId, buddyData.buddyId)
    } catch (error) {
      console.error(error)
      throw error
    }
    finally {
      setLoading(false)
    }
  }

  /**
   * Updates a buddy document in Firestore based on owner ID, buddy ID, and new data.
   *
   * @param {Object} buddyData - The new data to update in the buddy document. Should contain the fields: name, type, and status.
   * @param {string} buddyData.name - The name of the buddy.
   * @param {string} buddyData.type - The type of the buddy.
   * @param {string} buddyData.status - The status of the buddy.
   * @param {string} buddyData.ownerId - The ID of the owner.
   * @param {string} buddyData.buddyId - The ID of the buddy document to update.
   * @return {Promise<Object>} An object containing the loading state and the result of the update operation.
   * @throws {Error} If the buddyData object is missing any of the required fields.
   */
  const updateBuddy = async (buddyData) => {
    setLoading(true)
    try {
      if (!buddyData.name || !buddyData.type || !buddyData.status) { throw new Error('Missing buddy data') }
      result = await buddyService.update(buddyData.ownerId, buddyData.buddyId, buddyData)
    } catch (error) {
      console.error(error)
      throw error
    }
    finally {
      setLoading(false)
    }
  }


  /**
   * Creates a new buddy using the provided buddy data.
   *
   * @param {Object} buddyData - The data of the buddy to be created.
   * @param {string} buddyData.name - The name of the buddy.
   * @param {string} buddyData.type - The type of the buddy (e.g. 'Dog', 'Cat').
   * @param {string} buddyData.status - The status of the buddy (e.g. 'Safe', 'Lost').
   * @return {Promise<Object>} A promise that resolves to an object with the following properties:
   *   - `loading`: A boolean indicating whether the creation process is still ongoing.
   *   - `result`: The result of the creation process, or `undefined` if the process is still ongoing.
   * @throws {Error} If any of the required buddy data is missing.
   */
  const createBuddy = async (buddyData) => {
    setLoading(true)
    try {
      if (!buddyData.name || !buddyData.type || !buddyData.status) { throw new Error('Missing buddy data') }
      const buddyId = uuid.v4();
      result = await buddyService.create(buddyId, buddyData)
    } catch (error) {
      console.error(error)
      throw error
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setLoading(true);
    if (ownerId) {
      getAllBuddies(ownerId, 'hook');
    } else {
      setLoading(false)
    }
    return () => {
      setBuddies([]);
      setLoading(true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ownerId]);

  return {
    buddies,
    createBuddy,
    deleteBuddy,
    getAllBuddies,
    updateBuddy,
    loading,
  };
};

export default useGetBuddies;

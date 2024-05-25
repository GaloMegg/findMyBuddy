import { useCallback, useEffect, useState } from 'react';
import uuid from 'react-native-uuid';
import { Toast } from 'toastify-react-native';
import BuddyService from '~/services/buddy.service';
import { validateBuddy } from './helper';
const buddyService = BuddyService.getInstance();

/**
 * Returns an object containing buddies, a function to delete a buddy, and a loading state.
 *
 * @param {Object} param - An object containing the ownerId of the buddies to retrieve.
 * @param {string} param.ownerId - The ownerId of the buddies to retrieve.
 * @return {Object} An object containing buddies, a function to delete a buddy, and a loading state.
 */
const useBuddies = ({ ownerId }) => {
  const [buddies, setBuddies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [createBuddyLoading, setCreateBuddyLoading] = useState(false)
  const [deleteBuddyLoading, setDeleteBuddyLoading] = useState(false)
  const [updateBuddyLoading, setUpdateBuddyLoading] = useState(false)
  const [errors, setErrors] = useState({})

  /**
   * Creates a new buddy using the provided buddy data.
   *
   * @param {Object} buddyData - The data of the buddy to be created.
   * @param {string} buddyData.name - The name of the buddy.
   * @param {string} buddyData.type - The type of the buddy (e.g. 'Dog', 'Cat').
   * @param {string} buddyData.status - The status of the buddy (e.g. 'Safe', 'Lost').
   * @param {Function} callback - An optional callback function to be called with the result of the creation process.
   * @return {Promise<Object>} A promise that resolves to an object with the following properties:
   *   - `loading`: A boolean indicating whether the creation process is still ongoing.
   *   - `result`: The result of the creation process, or `undefined` if the process is still ongoing.
   * @throws {Error} If any of the required buddy data is missing.
   */
  const createBuddy = useCallback(
    async (buddyData, callback) => {
      setCreateBuddyLoading(true)
      try {
        validateBuddy(buddyData)
        const buddyId = uuid.v4();
        result = await buddyService.create(buddyId, buddyData)
        Toast.success('Created')
        callback && callback(true)
      } catch (error) {
        if (error.cause) {
          setErrors(error.cause)
        } else {
          Toast.error(error.message)
        }
      }
      finally {
        setCreateBuddyLoading(false)
      }
    }, [])

  /**
   * Retrieves all buddies for a given owner ID.
   *
   * @param {string} ownerId - The ID of the owner.
   * @return {Promise<void>} - A promise that resolves when the operation is complete.
   * @throws {Error} - If there is an error retrieving the buddies.
   */
  const getAllBuddies = useCallback(async (ownerId) => {
    try {
      const result = await buddyService.findAll(ownerId);
      setBuddies(result);
    } catch (error) {
      Toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }, [])

  /**
   * Deletes a buddy from the database.
   *
   * @param {Object} buddyData - The data of the buddy to be deleted.
   * @param {string} buddyData.ownerId - The ID of the owner of the buddy.
   * @param {string} buddyData.buddyId - The ID of the buddy to be deleted.
   * @param {Function} callback - An optional callback function to be called with the result of the deletion process.
   * @return {Promise<Object>} A promise that resolves to the result of the deletion process.
   * @throws {Error} If the buddyData object is missing either the ownerId or buddyId property.
   */
  const deleteBuddy = useCallback(async (buddyData, callback) => {
    setDeleteBuddyLoading(true)
    try {
      if (!buddyData.ownerId || !buddyData.buddyId) {
        throw new Error('Missing buddy data')
      }
      result = await buddyService.delete(buddyData.ownerId, buddyData.buddyId)
      Toast.success('Deleted')
      callback && callback(result)
      return result
    } catch (error) {
      Toast.error(error.message)
    }
    finally {
      setDeleteBuddyLoading(false)
    }
  }, [])

  /**
   * Updates a buddy document in Firestore based on owner ID, buddy ID, and new data.
   *
   * @param {Object} buddyData - The new data to update in the buddy document. Should contain the fields: name, type, and status.
   * @param {string} buddyData.name - The name of the buddy.
   * @param {string} buddyData.type - The type of the buddy.
   * @param {string} buddyData.status - The status of the buddy.
   * @param {string} buddyData.ownerId - The ID of the owner.
   * @param {string} buddyData.buddyId - The ID of the buddy document to update.
   * @param {Function} callback - An optional callback function to be called with the result of the update operation.
   * @return {Promise<Object>} An object containing the loading state and the result of the update operation.
   * @throws {Error} If the buddyData object is missing any of the required fields.
   */
  const updateBuddy = useCallback(
    async (buddyData, callback) => {
      try {
        setUpdateBuddyLoading(true)
        validateBuddy(buddyData)
        const result = await buddyService.update(buddyData.ownerId, buddyData.buddyId, buddyData)
        Toast.success('Updated')
        callback && callback(result)
      } catch (error) {
        if (error.cause) {
          setErrors(error.cause)
        } else {
          Toast.error(error.message)
        }
      }
      finally {
        setUpdateBuddyLoading(false)
      }
    }, [])

  useEffect(() => {
    setLoading(true);
    if (ownerId) {
      getAllBuddies(ownerId);
    }
    return () => {
      setBuddies([]);
      setLoading(true);
    };
  }, [ownerId]);

  return {
    buddies,
    createBuddy,
    createBuddyLoading,
    deleteBuddy,
    deleteBuddyLoading,
    errors,
    getAllBuddies,
    loading,
    updateBuddy,
    updateBuddyLoading,
  };
};

export default useBuddies;

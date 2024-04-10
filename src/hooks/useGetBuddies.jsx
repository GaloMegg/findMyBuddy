import { useEffect, useState } from 'react';
import BuddyService from 'services/buddy.service';


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
  const getAllBuddies = async (ownerId) => {
    try {
      const result = await buddyService.findAll(ownerId);
      setBuddies(result);
    } catch (error) {
      console.log(error);
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
  const deleteBuddy = async (ownerId, buddyId) => {
    console.log('delete');
  };
  useEffect(() => {
    setLoading(true);
    if (ownerId) {
      getAllBuddies(ownerId);
    }
    return () => {
      setBuddies([]);
      setLoading(true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ownerId]);

  return {
    buddies,
    deleteBuddy,
    loading,
  };
};

export default useGetBuddies;

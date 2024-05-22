import { useEffect, useState } from 'react';
import uuid from 'react-native-uuid';
import { Toast } from 'toastify-react-native';
import BuddyService from '../services/buddy.service';
import LocationService from '../services/location.service';
import SearchService from '../services/search.service';
import useGetLocation from '../utils/location';


/**
 * Returns an object containing searches, a function to delete a buddy, and a loading state.
 *
 * @param {Object} param - An object containing the ownerId of the searches to retrieve.
 * @param {string} param.ownerId - The ownerId of the searches to retrieve.
 * @return {Object} An object containing searches, a function to delete a buddy, and a loading state.
 */
const useSearches = () => {
  const { location } = useGetLocation();
  const [loadingCreate, setLoadingCreate] = useState(false)
  const [searches, setSearches] = useState([]);
  const [loading, setLoading] = useState(true);

  /**
   * Retrieves all searches for a given owner ID.
   *
   * @param {number} ownerId - The ID of the owner.
   * @return {Promise<void>} - A promise that resolves when the operation is complete.
   */
  const getAllSearches = async () => {
    setLoading(true);
    try {
      const locationService = LocationService.getInstance();
      const location = await locationService.getLocation();
      const searchService = SearchService.getInstance();
      const result = await searchService.findAll(location.latitude, location.longitude);
      setSearches(result);
    } catch (error) {
      console.error(error)
      throw error;
    } finally {
      setLoading(false);
    }
  };

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
  const createSearch = async (buddyData, callback) => {
    setLoadingCreate(true)
    try {
      if (!buddyData.name || !buddyData.type) { throw new Error('Missing buddy data') }
      const searchId = uuid.v4();
      const searchService = SearchService.getInstance();
      const locationService = LocationService.getInstance();
      const location = await locationService.getLocation();
      result = await searchService.create(searchId, { ...location, ...buddyData })
      const buddyService = BuddyService.getInstance();
      await buddyService.update(buddyData.ownerId, buddyData.buddyId, { ...buddyData, status: 'LOST' })
      callback && callback(result)
    } catch (error) {
      Toast.error(error.message)
      throw error
    }
    finally {
      setLoadingCreate(false)
    }
  }

  useEffect(() => {
    setLoading(true);
    if (location?.latitude && location.longitude) {
      getAllSearches(location?.latitude, location.latitude);
    }
    return () => {
      setSearches([]);
      setLoading(true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return {
    searches,
    createSearch, loadingCreate,
    getAllSearches,
    loading,
  };
};

export default useSearches;

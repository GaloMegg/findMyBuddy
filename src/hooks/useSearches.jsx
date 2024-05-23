import { useEffect, useState } from 'react';
import uuid from 'react-native-uuid';
import { Toast } from 'toastify-react-native';
import BuddyService from '../services/buddy.service';
import EmailService from '../services/email.service';
import LocationService from '../services/location.service';
import OwnerService from '../services/owner.service';
import SearchService from '../services/search.service';
import useGetCurrentUser from './useGetCurrentUser';


/**
 * Returns an object containing searches, a function to delete a buddy, and a loading state.
 *
 * @param {Object} param - An object containing the ownerId of the searches to retrieve.
 * @param {string} param.ownerId - The ownerId of the searches to retrieve.
 * @return {Object} An object containing searches, a function to delete a buddy, and a loading state.
 */
const useSearches = () => {
  const { ownerId } = useGetCurrentUser()
  const [loadingCreate, setLoadingCreate] = useState(false)
  const [foundLoading, setFoundLoading] = useState(false)
  const [foundEmail, setfoundEmail] = useState(false)
  const [searches, setSearches] = useState([]);
  const [loading, setLoading] = useState(true);

  const sendFoundEmail = async (buddyData, callback) => {
    try {
      setfoundEmail(true)

      const ownerService = OwnerService.getInstance();
      const currentOwner = await ownerService.findOne(ownerId)

      const buddyOwnerId = buddyData.ownerId
      const buddyOwner = await ownerService.findOne(buddyOwnerId)

      const email = EmailService.getInstance()

      const mailData = {
        reply_to: currentOwner.email,
        from_name: currentOwner.name,
        to_name: buddyOwner.name,
        pet_type: buddyData.type.toLowerCase(),
        email: buddyOwner.email,
        phoneNumber: buddyOwner.phoneNumber,
        to_email: buddyOwner.email
      }

      const emailResult = await email.sendFoundEmail(mailData)

      const searchesService = SearchService.getInstance();
      await searchesService.deleteSearchbyId(buddyData.searchId)
      const buddyService = BuddyService.getInstance()
      await buddyService.update(buddyData.ownerId, buddyData.buddyId, { ...buddyData, status: 'SAFE' })
      Toast.success('Buddy labeled as found! Email sent to owner.')
      callback && callback(true)
      return emailResult;
    } catch (error) {
      throw error;
    } finally {
      setfoundEmail(false)
    }
  }
  /**
   * Retrieves all searches for a given owner ID.
   *
   * @param {number} ownerId - The ID of the owner.
   * @return {Promise<void>} - A promise that resolves when the operation is complete.
   */
  const getAllSearches = async () => {

    try {
      const locationService = LocationService.getInstance();
      const location = await locationService.getLocation();
      const searchService = SearchService.getInstance();
      const result = await searchService.findAll(location.latitude, location.longitude);
      setSearches(result);
    } catch (error) {
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
      callback && callback(true)
    } catch (error) {
      Toast.error(error.message)
      throw error
    }
    finally {
      setLoadingCreate(false)
    }
  }

  const foundBuddy = async (buddyData, callback) => {
    try {
      setFoundLoading(true)
      const searchService = SearchService.getInstance();
      await searchService.deleteSearchbyBuddyId(
        buddyData.buddyId
      )
      const buddyService = BuddyService.getInstance();
      const result = await buddyService.update(buddyData.ownerId, buddyData.buddyId, { ...buddyData, status: 'SAFE' })
      Toast.success('Buddy found!')
      callback && callback(result)
    } catch (error) {
      Toast.error(error.message)
    } finally {
      setFoundLoading(false)
    }
  }

  useEffect(() => {
    setLoading(true);
    getAllSearches();
    return () => {
      setSearches([]);
      setLoading(true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return {
    searches,
    createSearch, loadingCreate,
    getAllSearches,
    loading,
    foundBuddy,
    sendFoundEmail,
    foundEmail,
    foundLoading
  };
};

export default useSearches;

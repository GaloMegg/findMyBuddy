import { useCallback, useEffect, useState } from 'react';
import uuid from 'react-native-uuid';
import { Toast } from 'toastify-react-native';
import BuddyService from '../services/buddy.service';
import EmailService from '../services/email.service';
import LocationService from '../services/location.service';
import OwnerService from '../services/owner.service';
import SearchService from '../services/search.service';
import useGetCurrentUser from './useGetCurrentUser';
const buddyService = BuddyService.getInstance()
const email = EmailService.getInstance()
const locationService = LocationService.getInstance();
const ownerService = OwnerService.getInstance();
const searchService = SearchService.getInstance();

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

  /**
   * Sends an email to the owner of a lost pet when the pet is found.
   *
   * @param {Object} buddyData - The data of the lost pet.
   * @param {string} buddyData.ownerId - The ID of the owner of the lost pet.
   * @param {string} buddyData.buddyId - The ID of the lost pet.
   * @param {string} buddyData.type - The type of the lost pet.
   * @param {string} buddyData.searchId - The ID of the search for the lost pet.
   * @param {Function} callback - An optional callback function to be called after the email is sent.
   * @return {Promise<Object>} A promise that resolves to the result of sending the email.
   * @throws {Error} If there is an error sending the email.
   */
  const sendFoundEmail = useCallback(
    async (buddyData, callback) => {
      try {
        setfoundEmail(true)
        //get the current user data for the email 
        const currentOwner = await ownerService.findOne(ownerId)
        // get the buddy owner data for the email
        const buddyOwnerId = buddyData.ownerId
        const buddyOwner = await ownerService.findOne(buddyOwnerId)
        const mailData = {
          reply_to: currentOwner.email,
          from_name: currentOwner.name,
          to_name: buddyOwner.name,
          pet_type: buddyData.type.toLowerCase(),
          email: buddyOwner.email,
          phoneNumber: buddyOwner.phoneNumber,
          to_email: buddyOwner.email
        }
        //send found email
        const emailResult = await email.sendFoundEmail(mailData)
        // delete the existing search
        await searchService.deleteSearchbyId(buddyData.searchId)
        // update the buddy
        await buddyService.update(buddyData.ownerId, buddyData.buddyId, { ...buddyData, status: 'SAFE' })

        Toast.success('Buddy labeled as found! Email sent to owner.')
        callback && callback(true)
        return emailResult;
      } catch (error) {
        Toast.error(error.message)
      } finally {
        setfoundEmail(false)
      }
    }, [])

  /**
   * Retrieves all searches based on the current location.
   *
   * @return {Promise<void>} - A promise that resolves when the searches are retrieved successfully.
   * @throws {Error} - If there is an error retrieving the searches.
   */
  const getAllSearches = useCallback(async () => {
    try {
      const location = await locationService.getLocation();
      const result = await searchService.findAll(location.latitude, location.longitude);
      setSearches(result);
    } catch (error) {
      Toast.error(error.message)
    } finally {
      setLoading(false);
    }
  }, [])

  /**
   * Creates a search for a lost buddy and updates the buddy's status to 'LOST'.
   *
   * @param {Object} buddyData - The data of the lost buddy.
   * @param {string} buddyData.name - The name of the lost buddy.
   * @param {string} buddyData.type - The type of the lost buddy.
   * @param {Function} callback - An optional callback function to be called after the search is created.
   * @return {Promise<void>} A promise that resolves when the search is created and the buddy's status is updated.
   * @throws {Error} If the buddy data is missing the name or type.
   */
  const createSearch = useCallback(
    async (buddyData, callback) => {
      setLoadingCreate(true)
      try {
        if (!buddyData.name || !buddyData.type) { throw new Error('Missing buddy data') }
        const searchId = uuid.v4();
        result = await searchService.create(searchId, { ...location, ...buddyData })
        await buddyService.update(buddyData.ownerId, buddyData.buddyId, { ...buddyData, status: 'LOST' })
        Toast.success('Search created!')
        callback && callback(true)
      } catch (error) {
        Toast.error(error.message)
      }
      finally {
        setLoadingCreate(false)
      }
    }, [])

  /**
   * Asynchronously marks a buddy as found and updates its status in the database.
   *
   * @param {Object} buddyData - An object containing the buddy's data, including its ID and owner's ID.
   * @param {Function} [callback] - An optional callback function to be called with the updated buddy data.
   * @return {Promise<void>} A promise that resolves when the buddy is marked as found and its status is updated.
   * @throws {Error} If there is an error updating the buddy's status.
   */
  const foundBuddy = useCallback(
    async (buddyData, callback) => {
      try {
        setFoundLoading(true)
        await searchService.deleteSearchbyBuddyId(
          buddyData.buddyId
        )
        const result = await buddyService.update(buddyData.ownerId, buddyData.buddyId, { ...buddyData, status: 'SAFE' })
        Toast.success('Buddy found!')
        callback && callback(result)
      } catch (error) {
        Toast.error(error.message)
      } finally {
        setFoundLoading(false)
      }
    }, [])

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
    createSearch,
    foundBuddy,
    foundEmail,
    foundLoading,
    getAllSearches,
    loading,
    loadingCreate,
    searches,
    sendFoundEmail,
  };
};

export default useSearches;

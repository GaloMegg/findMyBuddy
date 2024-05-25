import { useCallback, useEffect, useState } from 'react';
import { Toast } from 'toastify-react-native';
import OwnerService from '~/services/owner.service';
import { validateOwner } from './helper';
const ownerService = OwnerService.getInstance();


/**
 * Custom hook that fetches and manages the owner data for a given owner ID.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.ownerId - The ID of the owner to find.
 * @return {Object} - An object containing the owner data, a function to find the owner data, and a loading state.
 * @throws {Error} - If there is an error finding the owner data.
 */
const useOwners = ({ ownerId }) => {
  const [owner, setOwner] = useState([]);
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(true);
  const [updateOwnerLoader, setUpdateOwnerLoader] = useState(false)
  /**
   * Finds and sets the owner data for a given owner ID.
   *
   * @param {string} ownerId - The ID of the owner to find.
   * @return {Promise<void>} - A promise that resolves when the owner data is set.
   * @throws {Error} - If there is an error finding the owner data.
   */
  const findOne = useCallback(async (ownerId) => {
    try {
      setLoading(true);
      const result = await ownerService.findOne(ownerId);
      setOwner(result);
    } catch (error) {
      Toast.error(error.message)
    } finally {
      setLoading(false);
    }
  }, [])

  /**
   * Updates the owner data asynchronously.
   *
   * @param {Object} ownerData - The data of the owner to be updated. It should have the properties 'name' and 'email'.
   * @return {Promise<void>} - A promise that resolves when the owner data is updated.
   * @throws {Error} - If the 'ownerData' parameter is missing the required 'name' or 'email' property.
   */
  const updateOwner = useCallback(
    async (ownerData, callback) => {
      try {
        setUpdateOwnerLoader(true)
        validateOwner(ownerData)
        result = await ownerService.update(ownerData.ownerId, ownerData)
        callback && callback(true)
      } catch (error) {
        if (error.cause) {
          setErrors(error.cause)
        } else {
          Toast.error(error.message)
        }
      }
      finally {
        setUpdateOwnerLoader(false)
      }
    }, []
  )

  useEffect(() => {
    setLoading(true);
    if (ownerId) {
      findOne(ownerId);
    } else {
      setLoading(false)
    }
    return () => {
      setOwner({});
      setLoading(true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ownerId]);

  return {
    findOne,
    loading,
    owner,
    updateOwnerLoader,
    updateOwner, errors
  };
};

export default useOwners;

import { useEffect, useState } from 'react';
import OwnerService from '~/services/owner.service';


const ownerService = OwnerService.getInstance();
const useOwners = ({ ownerId }) => {
  const [owner, setOwner] = useState([]);
  const [loading, setLoading] = useState(true);


  /**
   * Finds and sets the owner data for a given owner ID.
   *
   * @param {string} ownerId - The ID of the owner to find.
   * @return {Promise<void>} - A promise that resolves when the owner data is set.
   * @throws {Error} - If there is an error finding the owner data.
   */
  const findOne = async (ownerId) => {
    try {
      setLoading(true);
      const result = await ownerService.findOne(ownerId);
      setOwner(result);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // const deleteowner = async (ownerData) => {
  //   setLoading(true)
  //   try {
  //     //delete the owners too
  //     if (!ownerData.name || !ownerData.type || !ownerData.status) { throw new Error('Missing owner data') }
  //     result = await ownerService.delete(ownerData.ownerId, ownerData.ownerId)
  //   } catch (error) {
  //     console.error(error)
  //     throw error
  //   }
  //   finally {
  //     setLoading(false)
  //   }
  // }


  const updateowner = async (ownerData) => {
    setLoading(true)
    try {
      if (!ownerData.name || !ownerData.type || !ownerData.status) { throw new Error('Missing owner data') }
      result = await ownerService.update(ownerData.ownerId, ownerData.ownerId, ownerData)
    } catch (error) {
      console.error(error)
      throw error
    }
    finally {
      setLoading(false)
    }
  }



  // const createowner = async (ownerData) => {
  //   setLoading(true)
  //   try {
  //     if (!ownerData.name || !ownerData.type || !ownerData.status) { throw new Error('Missing owner data') }
  //     const ownerId = uuid.v4();
  //     result = await ownerService.create(ownerId, ownerData)
  //   } catch (error) {
  //     console.error(error)
  //     throw error
  //   }
  //   finally {
  //     setLoading(false)
  //   }
  // }

  useEffect(() => {
    setLoading(true);
    if (ownerId) {
      findOne(ownerId);
    } else {
      setLoading(false)
    }
    return () => {
      setOwner([]);
      setLoading(true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ownerId]);

  return {
    owner,
    // createowner,/
    // deleteowner,
    findOne,
    // updateowner,
    loading,
  };
};

export default useOwners;

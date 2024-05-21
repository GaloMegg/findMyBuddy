import { useState } from 'react';

/**
 * Set user data handler function.
 *
 * @param {string} prop - the property to set
 * @param {string} value - the value to set for the property
 */
const useUserData = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
  });
  /**
   * Set user data handler function.
   *
   * @param {string} prop - the property to set
   * @param {string} value - the value to set for the property
   * @return {void}
   */
  const setUserDataHandler = (prop, value) => {
    setUserData({ ...userData, [prop]: value });
  };
  return { userData, setUserDataHandler };
};

export default useUserData;

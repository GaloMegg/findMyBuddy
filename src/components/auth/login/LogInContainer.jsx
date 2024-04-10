import React from 'react';
import SignUp from './LogIn';
import useUserData from './useUserData';

const LogInContainer = () => {
  const { userData, setUserDataHandler } = useUserData();
  return <SignUp {...userData} setUserDataHandler={setUserDataHandler} />;
};

export default LogInContainer;

// const styles = StyleSheet.create({});

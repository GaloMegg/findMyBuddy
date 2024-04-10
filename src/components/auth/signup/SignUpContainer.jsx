import React, { ReactNode } from 'react';
import { SafeAreaView } from 'react-native';
import SignUp from './SignUp';
import useUserData from './useUserData';

/**
 * This function is a container component for signing up. It uses the useUserData hook to retrieve user data and a handler function. It then renders the SignUp component with the user data and handler function as props within a SafeAreaView.
 *
 * @return {ReactNode} The rendered SignUpContainer component.
 */
const SignUpContainer = () => {
  const {userData, setUserDataHandler} = useUserData();
  return (
    <SafeAreaView>
      <SignUp {...userData} setUserDataHandler={setUserDataHandler} />
    </SafeAreaView>
  );
};

export default SignUpContainer;

// const styles = StyleSheet.create({});

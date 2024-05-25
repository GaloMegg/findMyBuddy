import React from 'react';
import { SafeAreaView } from 'react-native';
import SignUp from './SignUp';
import useUserData from './useUserData';


/**
 * Renders the SignUp component within a SafeAreaView component, passing user data and a handler function as props.
 *
 * @param {Object} route - The route object containing information about the current route.
 * @param {Object} navigation - The navigation object used to navigate between screens.
 * @return {JSX.Element} The rendered SignUp component within a SafeAreaView.
 */
const SignUpContainer = ({ route, navigation }) => {
  const { userData, setUserDataHandler } = useUserData();
  return (
    <SafeAreaView>
      <SignUp
        {...userData}
        setUserDataHandler={setUserDataHandler}
        route={route}
        navigation={navigation}
      />
    </SafeAreaView>
  );
};

export default SignUpContainer;

// const styles = StyleSheet.create({});

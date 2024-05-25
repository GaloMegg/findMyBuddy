import React from 'react';
import { SafeAreaView } from 'react-native';
import LogIn from './LogIn';
import useUserData from './useUserData';

/**
 * Renders the LogIn component within a Stack.Screen component named "Log in" with user data and handler function as props.
 *
 * @return {JSX.Element} The rendered LogIn component within Stack.Screen
 */
const LogInContainer = ({ route, navigation }) => {
  const { userData, setUserDataHandler } = useUserData();
  return (
    <SafeAreaView>
      <LogIn
        {...userData}
        setUserDataHandler={setUserDataHandler}
        route={route}
        navigation={navigation}
      />
    </SafeAreaView>
  );
};

export default LogInContainer;

// const styles = StyleSheet.create({});

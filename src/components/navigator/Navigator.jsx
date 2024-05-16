import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import useGetCurrentUser from '../../hooks/useGetCurrentUser';
import AppNavigation from './appNavigation/AppNavigation';
import AuthNavigation from './authNavigation/AuthNavigation';


/**
 * Renders a navigator component
 *
 * @return {JSX.Element} The rendered navigator component.
 */
const Navigator = () => {
  const { ownerId } = useGetCurrentUser()
  return (
    <NavigationContainer>{
      ownerId ?
        <AppNavigation />
        :
        <AuthNavigation />
    }
    </NavigationContainer>
  );
};
export default Navigator;
const styles = StyleSheet.create({});

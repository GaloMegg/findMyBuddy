import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import AppNavigation from './appNavigation/AppNavigation';
import AuthNavigation from './authNavigation/AuthNavigation';


/**
 * Renders a navigator component
 *
 * @return {JSX.Element} The rendered navigator component.
 */
const Navigator = () => {
  const { ownerId } = useSelector(state => state.user)
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

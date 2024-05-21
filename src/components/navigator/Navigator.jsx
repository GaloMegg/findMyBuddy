import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import useGetCurrentUser from '../../hooks/useGetCurrentUser';
import { COLORS } from '../../utils/constants';
import AppNavigation from './appNavigation/AppNavigation';
import AuthNavigation from './authNavigation/AuthNavigation';


/**
 * Renders a navigator component
 *
 * @return {JSX.Element} The rendered navigator component.
 */
const Navigator = () => {
  const { ownerId } = useGetCurrentUser()
  console.log(ownerId)
  return (
    <NavigationContainer theme={{ colors: { background: COLORS.WHITE }, }}>{
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

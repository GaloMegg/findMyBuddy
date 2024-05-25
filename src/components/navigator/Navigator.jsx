import { StyleSheet } from 'react-native';
import AppNavigation from './appNavigation/AppNavigation';
import AuthNavigation from './authNavigation/AuthNavigation';


/**
 * Renders a navigator component
 *
 * @return {JSX.Element} The rendered navigator component.
 */
const Navigator = ({ ownerId }) => {
  return ownerId ?
    <AppNavigation />
    :
    <AuthNavigation />
};
export default Navigator;
const styles = StyleSheet.create({});

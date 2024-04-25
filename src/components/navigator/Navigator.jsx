import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import AppNavigation from './appNavigation/AppNavigation';

/**
 * Renders a navigator component with the provided children.
 *
 * @param {Object} props - The props object.
 * @param {ReactNode} props.children - The children components to render.
 * @return {JSX.Element} The rendered navigator component.
 */
const Navigator = ({ children }) => {
  return (
    <NavigationContainer>
      {/* <AuthNavigation /> */}
      <AppNavigation />
    </NavigationContainer>
  );
};
export default Navigator;
const styles = StyleSheet.create({});

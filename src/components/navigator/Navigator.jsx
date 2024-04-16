import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { STACK } from '../../utils/navigationStack';
import LogInContainer from '../auth/login/LogInContainer';
import SignUpContainer from '../auth/signup/SignUpContainer';
import { SCREENS_CONSTANTS } from "./helper";

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
      <STACK.Navigator>
        <STACK.Screen name={SCREENS_CONSTANTS.LOG_IN}>
          {({ route, navigation }) => {
            return <LogInContainer route={route} navigation={navigation} />;
          }}
        </STACK.Screen>
        <STACK.Screen name={SCREENS_CONSTANTS.SIGN_UP}>
          {({ route, navigation }) => {
            return <SignUpContainer route={route} navigation={navigation} />;
          }}
        </STACK.Screen>
      </STACK.Navigator>
    </NavigationContainer>
  );
};
export default Navigator;
const styles = StyleSheet.create({});

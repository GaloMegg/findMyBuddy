import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import useGetCurrentUser from '../../hooks/useGetCurrentUser';
import { COLORS } from '../../utils/constants';
import Navigator from './Navigator';


/**
 * Renders a navigator container component
 *
 * @return {JSX.Element} The rendered navigator component.
 */
const NavigatorContainer = ({ }) => {
    const { ownerId } = useGetCurrentUser()
    return (
        <NavigationContainer theme={{ colors: { background: COLORS.WHITE }, }}>{
            <Navigator ownerId={ownerId} />
        }
        </NavigationContainer>

    );
};
export default NavigatorContainer;
const styles = StyleSheet.create({});

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet } from 'react-native';
import { COLORS } from '../../../utils/constants';
/**
 * Renders a SwipeTickIcon component that can be pressed.
 *
 * @param {Function} onPress - The function to be called when the component is pressed.
 * @return {JSX.Element} The rendered SwipeTickIcon component.
 */
const SwipeTickIcon = ({ onPress }) => {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                {
                    backgroundColor: pressed ? COLORS.GREEN : COLORS.LIGHT_GREEN
                },
                styles.container
            ]}
        >
            <MaterialCommunityIcons name="shield-search" size={24} color="white" />


        </Pressable>
    )
}
export default SwipeTickIcon

const styles = StyleSheet.create({
    container: {
        borderBottomLeftRadius: 17,
        borderTopLeftRadius: 17,
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
        height: '88%',
        justifyContent: 'center',
        width: '100%',
    }
})
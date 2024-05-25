import { FontAwesome } from '@expo/vector-icons';
import { Pressable, StyleSheet } from 'react-native';
import { COLORS } from '../../../utils/constants';
/**
 * Renders a SwipeTrashIcon component that can be pressed.
 *
 * @param {Function} onPress - The function to be called when the component is pressed.
 * @return {JSX.Element} The rendered SwipeTrashIcon component.
 */
const SwipeTrashIcon = ({ onPress }) => {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                {
                    backgroundColor: pressed ? COLORS.RED
                        : COLORS.LIGHT_RED
                },
                styles.container
            ]}
        >
            <FontAwesome name="trash" size={24} color="#FFFFFF" />
        </Pressable>
    )
}
export default SwipeTrashIcon

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        height: '88%',
        width: '50%'
    }
})
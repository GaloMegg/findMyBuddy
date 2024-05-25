import { MaterialIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet } from 'react-native';
import { COLORS } from '../../../utils/constants';
/**
 * Renders a SwipePencilIcon component that can be pressed.
 *
 * @param {Function} onPress - The function to be called when the component is pressed.
 * @return {JSX.Element} The rendered SwipePencilIcon component.
 */
const SwipePencilIcon = ({ onPress }) => {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                {
                    backgroundColor: pressed ? COLORS.BLUE : COLORS.LIGHT_BLUE
                },
                styles.container
            ]}
        >
            <MaterialIcons name="edit" size={24} color="white" />
        </Pressable>
    )
}
export default SwipePencilIcon

const styles = StyleSheet.create({
    container: {
        borderBottomRightRadius: 17,
        borderTopRightRadius: 17,
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
        height: '88%',

        justifyContent: 'center',
        width: '50%',
    }
})
import { MaterialIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet } from 'react-native';
import { COLORS } from '../../../utils/constants';
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
            <MaterialIcons name="edit" size={24} color="white" />
        </Pressable>
    )
}
export default SwipeTickIcon

const styles = StyleSheet.create({
    container: {
        borderBottomRightRadius: 17,
        borderTopRightRadius: 17,
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
        height: '100%',
        justifyContent: 'center',
        width: '50%',
    }
})
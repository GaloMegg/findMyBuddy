import { FontAwesome } from '@expo/vector-icons';
import { Pressable, StyleSheet } from 'react-native';
import { COLORS } from '../../../utils/constants';
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
        // borderBottomLeftRadius: 17,
        // borderTopLeftRadius: 17,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        // marginLeft: '50%',
        height: '88%',

        width: '50%'
    }
})
import { FontAwesome } from '@expo/vector-icons';
import { Pressable, StyleSheet } from 'react-native';
const SwipeTrashIcon = ({ onPress }) => {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                {
                    backgroundColor: pressed ? '#cf3e36' : '#FF3B30'
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
        borderBottomLeftRadius: 17,
        borderTopLeftRadius: 17,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        height: '100%',
        width: '50%'
    }
})
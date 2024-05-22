import { MaterialIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet } from 'react-native';
const SwipePencilIcon = ({ onPress }) => {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                {
                    backgroundColor: pressed ? '#1b6bc2' : '#007AFF'
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
        height: '100%',
        justifyContent: 'center',
        width: '50%',
    }
})
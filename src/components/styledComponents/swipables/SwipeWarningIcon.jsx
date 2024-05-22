import { Pressable, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SwipeWarningIcon = ({ onPress }) => {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                {
                    backgroundColor: pressed ? '#baa057' : '#f4d03f'
                },
                styles.container
            ]}
        >
            <Icon name='alert' size={24} color="#FFFFFF" />
        </Pressable>
    )
}
export default SwipeWarningIcon

const styles = StyleSheet.create({
    container: {

        borderBottomRightRadius: 17,
        borderTopRightRadius: 17,
        borderBottomLeftRadius: 17,
        borderTopLeftRadius: 17,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        height: '100%',
        width: '100%',

    }
})
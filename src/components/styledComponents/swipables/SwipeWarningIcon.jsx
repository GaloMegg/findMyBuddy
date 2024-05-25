import { Pressable, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../../../utils/constants';

const SwipeWarningIcon = ({ onPress }) => {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                {
                    backgroundColor: pressed ?
                        COLORS.YELLOW : COLORS.LIGHT_YELLOW
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

        borderBottomLeftRadius: 17,
        borderTopLeftRadius: 17,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        height: '88%',
        width: '100%',

    }
})
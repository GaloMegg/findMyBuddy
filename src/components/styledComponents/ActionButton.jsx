import React from 'react'
import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native'
import { COLORS } from '../../utils/constants'

const ActionButton = ({ text, onPress, disabled, loading }) => {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed, }) => [
                {
                    backgroundColor: pressed ? COLORS.DARK_BROWN : disabled ? COLORS.LIGH_BROWN : COLORS.BROWN

                },
                styles.button
            ]}
            disabled={disabled}
        >
            {loading ? <ActivityIndicator color={COLORS.WHITE} /> : <Text style={styles.text}>{text}</Text>}
        </Pressable>
    )
}

export default ActionButton

const styles = StyleSheet.create({
    button: {
        width: '100%',
        borderRadius: 8,
        padding: 8,
        fontSize: 18,
        fontWeight: '500',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontSize: 20,
    }
})
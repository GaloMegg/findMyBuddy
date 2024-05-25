import React from 'react'
import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native'
import { COLORS } from '../../utils/constants'

/**
 * Renders an ActionButton component.
 *
 * @param {Object} props - The properties for the ActionButton component.
 * @param {string} props.text - The text to display on the button.
 * @param {function} props.onPress - The function to call when the button is pressed.
 * @param {boolean} props.disabled - Whether the button is disabled.
 * @param {boolean} props.loading - Whether the button is in a loading state.
 * @return {JSX.Element} The rendered ActionButton component.
 */
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
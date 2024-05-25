import React from 'react'
import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native'
import { COLORS } from '../../utils/constants'

/**
 * Renders a CancelButton component.
 *
 * @param {Object} props - The properties for the CancelButton component.
 * @param {string} props.text - The text to display on the button.
 * @param {function} props.onPress - The function to call when the button is pressed.
 * @param {boolean} props.disabled - Whether the button is disabled.
 * @param {boolean} props.loading - Whether the button is in a loading state.
 * @return {JSX.Element} The rendered CancelButton component.
 */
const CancelButton = ({ text, onPress, disabled, loading }) => {
    return (
        <Pressable
            onPress={()=>onPress()}
            style={({ pressed, }) => [
                {
                    backgroundColor: pressed ? COLORS.GREY : disabled ? COLORS.GREY : COLORS.LIGHT_GREY
                },
                styles.button
            ]}
            disabled={disabled}
        >
            {loading ? <ActivityIndicator /> : <Text style={styles.text}>{text}</Text>}
        </Pressable>
    )
}

export default CancelButton

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
        color: COLORS.DARK_BROWN,
        fontSize: 20,
    }
})
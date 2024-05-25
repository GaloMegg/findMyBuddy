import React from 'react'
import { StyleSheet, Text } from 'react-native'

/**
 * Renders a text error component if the provided `text` prop is truthy.
 *
 * @param {Object} props - The props object containing the following properties:
 *   @param {string} text - The text to be displayed as an error.
 * @return {JSX.Element|null} The rendered text error component or null if `text` is falsy.
 */
const TextError = ({ text }) => {
    if (text) return <Text style={styles.errorText}>{text}</Text>
    return (
        null
    )
}

export default TextError

const styles = StyleSheet.create({
    errorText: {
        color: 'red',
        fontSize: 12,
        fontFamily: 'Roboto',
        width: '100%',
        
    }
})
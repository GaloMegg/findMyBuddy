import React from 'react'
import { StyleSheet, Text } from 'react-native'

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
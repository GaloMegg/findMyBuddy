import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'
import { COLORS } from '../../utils/constants'

const ActionButton = ({ text, onPress }) => {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                {
                    backgroundColor: pressed ? COLORS.DARK_BROWN : COLORS.BROWN
                },
                styles.button
            ]}
        >
            <Text style={styles.text}>{text}</Text>
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
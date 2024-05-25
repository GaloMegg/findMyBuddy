import { FontAwesome } from '@expo/vector-icons'
import React from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'

/**
 * Renders a profile image input component.
 *
 * @param {Object} props - The component props.
 * @param {string} props.value - The URI of the image to display. If empty, a default icon is displayed.
 * @param {function} props.onPress - The function to be called when the component is pressed.
 * @return {JSX.Element} The rendered profile image input component.
 */
const ProfileImageInput = ({ value, onPress }) => {
    if (!value) {
        return (
            <FontAwesome
                name="user-circle-o"
                size={100}
                color="black" style={styles.icon} onPress={onPress} />

        )
    }
    return (
        <TouchableOpacity style={styles.image.container} onPress={onPress}>
            <Image
                source={{ uri: value }}
                style={styles.image.image}
                resizeMode='contain'
            />
        </TouchableOpacity>

    )
}

export default ProfileImageInput

const styles = StyleSheet.create({
    icon: {
        borderRadius: 200
    },
    image: {
        container: {
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 300
        },
        image: {
            width: 150,
            height: 150,
            borderRadius: 300
        }
    }
})
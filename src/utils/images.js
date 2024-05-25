import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

/**
 * Creates a custom hook that provides functionality for picking an image from the device's media library and setting it as the selected image.
 *
 * @return {Object} An object containing the `pickImage` function and the `selectedImage` state variable.
 *                  - `pickImage` (Function): Asynchronously picks an image from the device's media library and sets it as the selected image.
 *                                          Returns a promise that resolves with the selected image in base64 format.
 *                                          Throws an error if the user does not grant permission to access the camera roll.
 *                  - `selectedImage` (null | string): The selected image in base64 format.
 */
export default function useGetImagePicker() {
    const [selectedImage, setSelectedImage] = useState(null);

    /**
     * Asynchronously picks an image from the device's media library and sets it as the selected image.
     *
     * @return {Promise<string>} A promise that resolves with the selected image in base64 format.
     * @throws {Error} If the user does not grant permission to access the camera roll.
     */
    const pickImage = async () => {
        try {
            const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (!granted) {
                throw new Error('Permission to access camera roll is required!')
            }
            setSelectedImage(null)
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.2,
                base64: true
            });
            if (!result.cancelled) {
                setSelectedImage('data:image/jpeg;base64,' + result.assets[0].base64);
            }
            return 'data:image/jpeg;base64,' + result.assets[0].base64
        } catch (error) {
            throw error
        }
    };
    return {
        pickImage,
        selectedImage
    }
}


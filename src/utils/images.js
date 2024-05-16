import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

export default function useGetImagePicker() {
    const [selectedImage, setSelectedImage] = useState(null);

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
                quality: 0.5,
                base64: true
            });
            console.log(result)
            if (!result.cancelled) {
                setSelectedImage('data:image/jpeg;base64,' + result.assets[0].base64);
            }
            return
        } catch (error) {
            console.error(error)
        }
    };
    return {
        pickImage,
        selectedImage
    }
}


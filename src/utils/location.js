import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
const useGetLocation = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    /**
     * Requests foreground permissions for the location.
     *
     * @return {string} The status of the permission request.
     */
    const requestPermissions = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        return status
    }

    /**
     * Retrieves the current position of the user's device.
     *
     * This function first requests permission to access the user's location. If the permission is granted,
     * it uses the `Location.getCurrentPositionAsync` function to get the current position of the device.
     * The retrieved location is then set using the `setLocation` function.
     *
     * @return {Promise<location>} A promise that resolves when the current position is successfully retrieved and set.
     */
    const getCurrentPosition = async () => {
        const status = await requestPermissions();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        return location
    }


    useEffect(() => {
        getCurrentPosition();
    }, []);
    return { location, error, requestPermissions, getCurrentPosition };
}
export default useGetLocation
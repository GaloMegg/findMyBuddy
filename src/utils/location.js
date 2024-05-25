import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import LocationService from '../services/location.service';
/**
 * Returns an object containing the current location, error message, permission request function, and current position retrieval function.
 *
 * @return {Object} An object with the following properties:
 *   - location: The current location of the user's device. Initially null.
 *   - errorMsg: The error message if there was an issue retrieving the location. Initially null.
 *   - requestPermissions: An asynchronous function that requests foreground permissions for the location. Returns a promise that resolves with the status of the permission request.
 *   - getCurrentPosition: An asynchronous function that retrieves the current position of the user's device. Returns a promise that resolves with the current position.
 */
const useGetLocation = () => {
    const [location, setLocation] = useState(null);

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
        const locationService = LocationService.getInstance()
        const location = await locationService.getLocation()
        setLocation(location);
        return location
    }


    useEffect(() => {
        getCurrentPosition();
    }, []);
    return { location, requestPermissions, getCurrentPosition };
}
export default useGetLocation
import * as Location from 'expo-location';

export default class LocationService {
    static instance;
    constructor() { }
    /**
     * Returns an instance of LocationService, creating a new one if it doesn't exist.
     * This method is a way to get the instance of the LocationService class, as this class is a
     * singleton (only one instance of it is needed in the whole application).
     *
     * @return {LocationService} The instance of LocationService
     */
    static getInstance() {
        if (!LocationService.instance) {

            // if there is no instance of LocationService yet
            LocationService.instance = new LocationService(); // create a new instance and assign it to the static field
        }
        return LocationService.instance; // return the instance that was either just created or is already existing
    }
    /**
     * Asynchronously requests foreground permissions for the location.
     *
     * @return {Promise<void>} Returns a promise that resolves with no value if the permission is granted, or rejects with an error if the permission is not granted.
     */
    async requestLocationPermission() {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.error('Location permission not granted');
            return;
        }
    }
    /**
     * Asynchronously reverse geocodes the given latitude and longitude coordinates to retrieve
     * the corresponding location information.
     *
     * @param {Object} coordinates - An object containing the latitude and longitude coordinates.
     * @param {number} coordinates.latitude - The latitude coordinate to reverse geocode.
     * @param {number} coordinates.longitude - The longitude coordinate to reverse geocode.
     * @return {Promise<Object>} A promise that resolves to the location information as an object.
     * The object has the following properties:
     * - city: The name of the city.
     * - country: The name of the country.
     * - district: The name of the district.
     * - isoCountryCode: The ISO country code.
     * - name: The name of the location.
     * - postalCode: The postal code.
     * - region: The name of the region.
     * - street: The name of the street.
     * - streetNumber: The street number.
     * - subregion: The name of the subregion (null if not available).
     * - timezone: The timezone of the location.
     * @throws {Error} If there is an error fetching the location.
     */
    async reverseGeocode({ latitude, longitude }) {
        try {
            await this.requestLocationPermission()
            let location = await Location.reverseGeocodeAsync({ latitude, longitude });
            console.log(location[0])
            return location[0]
            // {"city": "Buenos Aires", "country": "Argentina", "district": "Comuna 2", "isoCountryCode": "AR", "name": "Avenida Córdoba 2077", "postalCode": "C1120", "region": "CABA", "street": "Avenida Córdoba", "streetNumber": "2077", "subregion": null, "timezone": "America/Argentina/Buenos_Aires"}
        } catch (error) {
            console.error('Error fetching location:', error);
        }
    };

    /**
     * Asynchronously retrieves the current location coordinates.
     *
     * @return {Promise<{latitude: number, longitude: number}>} A promise that resolves to an object containing the latitude and longitude coordinates of the current location.
     * @throws {Error} If there is an error fetching the location.
     */
    async getLocation() {
        try {
            await this.requestLocationPermission()
            let location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;
            return { latitude, longitude }
        } catch (error) {
            console.error('Error fetching location:', error);
        }
    };
}

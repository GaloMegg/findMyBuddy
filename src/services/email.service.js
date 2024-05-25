import emailjs from 'emailjs-com';
import LocationService from "./location.service";
export default class EmailService {
    static instance;
    constructor() { }
    #TEMPLATE_ID = "template_rb4pua1"
    #SERVICE_ID = "service_nr9li5i"
    /**
     * Returns an instance of EmailService, creating a new one if it doesn't exist.
     * This method is a way to get the instance of the EmailService class, as this class is a
     * singleton (only one instance of it is needed in the whole application).
     *
     * @return {EmailService} The instance of EmailService
     */
    static getInstance() {
        if (!EmailService.instance) {

            // if there is no instance of EmailService yet
            EmailService.instance = new EmailService(); // create a new instance and assign it to the static field
        }
        return EmailService.instance; // return the instance that was either just created or is already existing
    }
    /**
     * Asynchronously requests foreground permissions for the location.
     *
     * @return {Promise<void>} Returns a promise that resolves with no value if the permission is granted, or rejects with an error if the permission is not granted.
     */
    async sendFoundEmail({ reply_to, from_name, to_name, pet_type, email, phoneNumber, to_email }) {
        const locationService = LocationService.getInstance();
        const location = await locationService.getLocation();
        const address = await locationService.getFormattedLocation(location);

        await emailjs.send(this.#SERVICE_ID, this.#TEMPLATE_ID, {
            from_name,
            to_name,
            pet_type,
            address,
            email,
            phoneNumber,
            to_email,
            reply_to,
        }, 'JC2xaQI3Fj6qyb6zT');
    }
}

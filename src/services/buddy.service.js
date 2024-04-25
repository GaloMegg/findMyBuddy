import BuddyDA from '../dataAccess/buddy.da';

export default class BuddyService {
  static instance;
  constructor() {}
  /**
   * Returns an instance of BuddyService, creating a new one if it doesn't exist.
   * This method is a way to get the instance of the BuddyService class, as this class is a
   * singleton (only one instance of it is needed in the whole application).
   *
   * @return {BuddyService} The instance of BuddyService
   */
  static getInstance() {
    if (!BuddyService.instance) {
      // if there is no instance of BuddyService yet
      BuddyService.instance = new BuddyService(); // create a new instance and assign it to the static field
    }
    return BuddyService.instance; // return the instance that was either just created or is already existing
  }
  BuddyDA = BuddyDA.getInstance();
  /**
   * Creates a new buddy document in the database.
   *
   * @param {string} buddyId - The id of the buddy to create. This id should be the
   * owner's id.
   * @param {Partial<IBuddy>} buddyData - The data of the buddy to create. This data
   * should include the name, bred, status and image of the buddy.
   *
   * @return {Promise<void>} A promise that resolves when the document is successfully
   * added to the database.
   */
  async create(buddyId, buddyData) {
    return this.BuddyDA.create(buddyId, buddyData);
  }
  /**
   * Retrieve all buddy documents of a specific owner from the database.
   *
   * This method retrieves all buddy documents of the owner with the specified ID
   * from the database.
   *
   * @param {string} ownerId - The ID of the owner of the buddies to retrieve.
   * @return {Promise<IBuddy[]>} A promise that resolves with an array of all
   * buddies of the specified owner.
   */
  async findAll(ownerId) {
    return this.BuddyDA.findAll(ownerId);
  }
}

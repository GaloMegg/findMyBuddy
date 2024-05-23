import SearchDA from "../dataAccess/search.da";

export default class SearchService {
  static instance;
  constructor() { }
  /**
   * Returns an instance of SearchService, creating a new one if it doesn't exist.
   * This method is a way to get the instance of the SearchService class, as this class is a
   * singleton (only one instance of it is needed in the whole application).
   *
   * @return {SearchService} The instance of SearchService
   */
  static getInstance() {
    if (!SearchService.instance) {
      // if there is no instance of SearchService yet
      SearchService.instance = new SearchService(); // create a new instance and assign it to the static field
    }
    return SearchService.instance; // return the instance that was either just created or is already existing
  }
  SearchDA = SearchDA.getInstance();
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
  async create(searchId, searchData) {
    try {
      return this.SearchDA.create(searchId, searchData);
    } catch (error) {
      throw error
    }
  }
  /**
   * Retrieve all buddy documents of a specific owner from the database.
   *
   * This method retrieves all buddy documents of the owner with the specified ID
   * from the database.
   *
   * @param {string} ownerId - The ID of the owner of the buddies to retrieve.
   * @return {Promise<ISearch[]>} A promise that resolves with an array of all
   * buddies of the specified owner.
   */
  async findAll(latitude, longitude) {
    return this.SearchDA.findAll(latitude, longitude);
  }

  /**
   * Deletes a buddy document from the database based on owner ID and buddy ID.
   *
   * @param {string} ownerId - The ID of the owner.
   * @param {string} buddyId - The ID of the buddy document to delete.
   * @return {Promise<void>} A promise that resolves once the deletion is complete.
   */
  async deleteSearchbyBuddyId(buddyId) {
    return await this.SearchDA.deleteSearchbyBuddyId(buddyId);
  }

  /**
   * Deletes a buddy document from the database based on owner ID and buddy ID.
   *
   * @param {string} ownerId - The ID of the owner.
   * @param {string} buddyId - The ID of the buddy document to delete.
   * @return {Promise<void>} A promise that resolves once the deletion is complete.
   */
  async deleteSearchbyId(searchId) {
    return await this.SearchDA.deleteSearchbyId(searchId);
  }
  /**
   * Updates a buddy document in the database.
   *
   * @param {string} ownerId - The ID of the owner.
   * @param {string} buddyId - The ID of the buddy document to update.
   * @param {Object} buddyData - The data to update in the buddy document.
   * @return {Promise<void>} A promise that resolves when the update is complete.
   */
  async update(ownerId, buddyId, buddyData) {
    return await this.SearchDA.updateBuddy(ownerId, buddyId, buddyData)
  }
}

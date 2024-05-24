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
   * Asynchronously creates a new buddy document in the database.
   *
   * @param {string} searchId - The id of the buddy to create. This id should be the
   * owner's id.
   * @param {Partial<IBuddy>} searchData - The data of the buddy to create. This data
   * should include the name, bred, status and image of the buddy.
   * @return {Promise<void>} A promise that resolves when the document is successfully
   * added to the database.
   * @throws {Error} If an error occurs while creating the document.
   */
  async create(searchId, searchData) {
    try {
      return this.SearchDA.create(searchId, searchData);
    } catch (error) {
      throw error
    }
  }

  /**
   * Asynchronously finds all items based on latitude and longitude.
   *
   * @param {number} latitude - The latitude coordinate.
   * @param {number} longitude - The longitude coordinate.
   * @return {Promise<Array>} A promise that resolves to an array of items.
   */
  async findAll(latitude, longitude) {
    return this.SearchDA.findAll(latitude, longitude);
  }

  /**
   * Deletes a buddy document from the database based on buddy ID.
   *
   * @param {string} buddyId - The ID of the buddy document to delete.
   * @return {Promise<void>} A promise that resolves once the deletion is complete.
   */
  async deleteSearchbyBuddyId(buddyId) {
    return await this.SearchDA.deleteSearchbyBuddyId(buddyId);
  }

  /**
   * Deletes a search document by its ID.
   *
   * @param {string} searchId - The ID of the search document to delete.
   * @return {Promise<void>} A Promise that resolves once the search document is deleted.
   * @throws {Error} If the search document does not exist or does not belong to the owner.
   */
  async deleteSearchbyId(searchId) {
    return await this.SearchDA.deleteSearchbyId(searchId);
  }
}

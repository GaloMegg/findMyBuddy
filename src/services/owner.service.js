import OwnerDA from '../dataAccess/owner.da';

export default class OwnerService {
  static instance;
  constructor() { }
  /**
   * Returns an instance of OwnerService, creating a new one if it doesn't exist.
   *
   * @return {OwnerService} The instance of OwnerService
   */
  static getInstance() {
    if (!OwnerService.instance) {
      OwnerService.instance = new OwnerService();
    }
    return OwnerService.instance;
  }
  ownerDA = OwnerDA.getInstance();

  /**
   * A description of the entire function.
   *
   * @param {string} ownerId - description of parameter
   * @param {Partial<IOwner>} ownerData - description of parameter
   * @return {Partial<IOwner>} description of return value
   */
  async create(ownerId, ownerData) {
    return await this.ownerDA.create(ownerId, ownerData);
  }


  /**
   * Asynchronously finds and returns the owner with the given ownerId.
   *
   * @param {string} ownerId - The ID of the owner to find.
   * @return {Promise<IOwner>} A Promise that resolves with the data of the found owner, if it exists.
   */
  async findOne(ownerId) {
    return await this.ownerDA.findOne(ownerId);
  }

  /**
   * Asynchronously updates the owner with the specified ownerId using the provided ownerData.
   *
   * @param {string} ownerId - The ID of the owner to update.
   * @param {object} ownerData - The data to update the owner with.
   * @return {Promise<object>} A Promise that resolves with the updated owner data.
   */
  async update(ownerId, ownerData) {
    return await this.ownerDA.update(ownerId, ownerData)
  }
}

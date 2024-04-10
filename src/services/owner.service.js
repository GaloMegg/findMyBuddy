import OwnerDA from 'dataAccess/owner.da'
import { IOwner } from 'models/owner.model'

export default class OwnerService {
  static instance
  constructor() { }
  /**
   * Returns an instance of OwnerService, creating a new one if it doesn't exist.
   *
   * @return {OwnerService} The instance of OwnerService
   */
  static getInstance() {
    if (!OwnerService.instance) {
      OwnerService.instance = new OwnerService()
    }
    return OwnerService.instance
  }
  ownerDA = OwnerDA.getInstance()

  /**
   * A description of the entire function.
   *
   * @param {string} ownerId - description of parameter
   * @param {Partial<IOwner>} ownerData - description of parameter
   * @return {Partial<IOwner>} description of return value
   */
  async create(ownerId, ownerData) {
    return await this.ownerDA.create(ownerId, ownerData)
  }
}


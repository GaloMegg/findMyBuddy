
/**
 * Validates the given buddy data object.
 *
 * @param {Object} buddyData - The buddy data object to be validated.
 * @throws {Error} Throws an error if any required field is missing in the buddy data object.
 */
export const validateBuddy = (buddyData) => {
  const errors = {}
  if (!buddyData.name) {
    errors.name = 'Required'
  }
  if (!buddyData.type) {
    errors.type = 'Required'
  }
  if (!buddyData.age) {
    errors.age = 'Required'
  }
  if (Object.keys(errors).length) {
    throw new Error("Missing buddy data", { cause: errors });
  }
}

/**
 * Validates the given owner data object.
 *
 * @param {Object} ownerData - The owner data object to be validated.
 * @throws {Error} Throws an error if any required field is missing in the owner data object.
 */
export const validateOwner = (ownerData) => {
  const errors = {}
  if (!ownerData.name) {
    errors.name = 'Required'
  }
  if (!ownerData.email) {
    errors.email = 'Required'
  }
  if (Object.keys(errors).length) {
    throw new Error("Missing buddy data", { cause: errors });
  }
}
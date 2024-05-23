
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
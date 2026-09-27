/**
 * Recursively merges properties from a source object into a target object.
 * If a property in both objects is a non-array object, it deeply traverses and merges
 * nested keys rather than performing a shallow overwrite.
 *
 * @param {Object} target - The destination object that will receive the merged properties.
 * @param {Object} source - The source object whose properties will be copied into target.
 * @returns {Object} The mutated target object containing merged properties from source.
 */
function deepMerge(target, source) {
  for (const key in source) {
    if (source[key] instanceof Object && !Array.isArray(source[key])) {
      if (!target[key]) target[key] = {};
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

module.exports = { deepMerge };

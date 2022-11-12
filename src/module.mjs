// @ts-nocheck
/**
 * Function to use another FicusJS module
 * @param {object} module
 * @param {function} renderer
 * @param {*} args
 * @returns {*}
 */
export function use (module, { ...args }) {
  if (module.create && typeof module.create === 'function') {
    return module.create({
      ...args,
      use
    })
  }
}

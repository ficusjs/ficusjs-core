/* global CustomEvent */

export function emit (elem, name, opts = {}) {
  const defs = {
    bubbles: true,
    cancelable: true,
    composed: false
  }
  const eventOptions = Object.assign({}, defs, opts)
  const e = new CustomEvent(name, {
    bubbles: eventOptions.bubbles,
    cancelable: eventOptions.cancelable,
    composed: eventOptions.composed,
    detail: eventOptions.detail
  })
  return elem.dispatchEvent(e)
}

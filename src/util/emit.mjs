export function emit (elem, name, opts = {}) {
  const defs = {
    bubbles: true,
    cancelable: true,
    composed: false
  }
  const eventOptions = Object.assign({}, defs, opts)
  const e = globalThis.document.createEvent('CustomEvent')
  e.initCustomEvent(
    name,
    eventOptions.bubbles,
    eventOptions.cancelable,
    eventOptions.detail
  )
  Object.defineProperty(e, 'composed', { value: eventOptions.composed })
  return elem.dispatchEvent(e)
}

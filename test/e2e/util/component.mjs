import { renderer, html } from 'https://cdn.skypack.dev/@ficusjs/renderers@3/uhtml'
import { withLocalState } from 'https://cdn.skypack.dev/@ficusjs/state@3/with-local-state'
import { createCustomElement as customElementCreator } from '../../../src/index.mjs'

function createCustomElement (tagName, options) {
  customElementCreator(tagName, withLocalState({ ...options, renderer }))
}

const nothing = ''

export {
  createCustomElement,
  html,
  nothing
}

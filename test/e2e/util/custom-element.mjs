import { renderer, html } from 'https://cdn.skypack.dev/@ficusjs/renderers@3/htm'
import { createCustomElement as customElementCreator } from '../../../src/index.mjs'

function createCustomElement (tagName, options) {
  customElementCreator(tagName, { ...options, renderer })
}

const nothing = ''

export {
  createCustomElement,
  html,
  nothing
}

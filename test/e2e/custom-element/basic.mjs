import { createCustomElement, html } from '../util/component.mjs'

createCustomElement('mock-basic', {
  render () {
    return html`<span>Basic component</span>`
  }
})

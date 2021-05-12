import { createCustomElement, html } from '../util/custom-element.mjs'

createCustomElement('mock-basic', {
  mounted () {
    console.log('mounted!')
  },
  render () {
    return html`<span>Basic custom element</span>`
  }
})

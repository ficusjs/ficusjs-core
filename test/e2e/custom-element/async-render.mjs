import { createCustomElement, html } from '../util/component.mjs'

createCustomElement('mock-async-render', {
  render () {
    return new Promise(resolve => {
      setTimeout(() => resolve(html`<span>Async render component</span>`), 1000)
    })
  }
})

import { createCustomElement, html } from '../util/component.mjs'

createCustomElement('mock-slots', {
  render () {
    return html`<span>Slots component with default slot of <strong>${this.slots.default}</strong></span>`
  }
})

createCustomElement('mock-slot-named', {
  render () {
    return html`<span>Slots component with named slots of <strong>${this.slots.first}</strong> and <strong>${this.slots.second}</strong></span>`
  }
})

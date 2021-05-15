import { createCustomElement, html } from '../util/component.mjs'
import { emit } from '../util/emit.mjs'

createCustomElement('mock-methods', {
  formatName (name, family, title) {
    return `${title} ${name} ${family}`
  },
  render () {
    return html`<span>Methods component that formats the name <strong>${this.formatName('Indiana', 'Jones', 'Dr')}</strong></span>`
  }
})

createCustomElement('mock-method-event', {
  buttonClick (e) {
    emit('clicked')
    this.emit('has-clicked')
  },
  render () {
    return html`<button type="button" onclick=${this.buttonClick}>Methods component that listens for a click and emits &nbsp;<code>has-clicked</code>&nbsp; event</button>`
  }
})

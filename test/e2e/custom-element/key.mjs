import { createCustomElement, html } from '../util/component.mjs'

createCustomElement('mock-key', {
  setKey (key) {
    const child = this.querySelector('mock-key-child')
    child.key = key
  },
  render () {
    return html`
    <div>
      <button id="mock-key-button" type="button" onclick="${() => this.setKey('Hello')}">Set Key</button>
      <mock-key-child></mock-key-child>
    </div>
    `
  }
})

createCustomElement('mock-key-child', {
  updateKey (key) {
    this.key = key
  },
  render () {
    return html`
    <div>
      <button id="mock-key-child-button" type="button" onclick="${() => this.updateKey('Goodbye')}">Update Key</button>
      <span>${this.props.key}</span>
    </div>
      `
  }
})

import { JSDOM } from 'jsdom'
import test from 'ava'
import sinon from 'sinon'
import { createCustomElement } from '../../src/index.mjs'
import { loadRenderer } from '../helpers/renderer.mjs'

let window
let document

test.before(t => {
  const dom = new JSDOM('<!DOCTYPE html><html><head></head><body></body></html>')
  window = dom.window
  document = dom.window.document
  globalThis.CustomEvent = window.CustomEvent
  globalThis.customElements = window.customElements
  globalThis.HTMLElement = window.HTMLElement
  globalThis.document = document
})

test('emitting events', t => {
  return loadRenderer()
    .then(({ html, renderer }) => {
      const body = document.body
      const eventHandler = sinon.spy()
      createCustomElement('basic-comp', {
        renderer,
        onButtonClick () {
          this.emit('button_clicked')
        },
        render () {
          return html`<button type="button" onclick="${this.onButtonClick}">Emit event</button>`
        }
      })
      const basicComp = document.createElement('basic-comp')
      basicComp.addEventListener('button_clicked', eventHandler)
      body.appendChild(basicComp)
      const button = document.querySelector('basic-comp button')
      t.is(button.textContent, 'Emit event')
      button.click()
      t.truthy(eventHandler.called)
    })
})

import { JSDOM } from 'jsdom'
import test from 'ava'
import { createCustomElement } from '../../src/index.mjs'
import { loadRenderer, elementFromString } from '../helpers/renderer.mjs'

let window
let document

test.before(t => {
  const dom = new JSDOM('<!DOCTYPE html><html><head></head><body></body></html>')
  window = dom.window
  document = dom.window.document
  globalThis.customElements = window.customElements
  globalThis.HTMLElement = window.HTMLElement
  globalThis.document = document
})

test('render default slot', t => {
  return loadRenderer()
    .then(({ html, renderer }) => {
      const body = document.body
      createCustomElement('default-slot-comp', {
        renderer,
        render () {
          return html`<p>${this.slots.default}</p>`
        }
      })
      const basicComp = elementFromString('<default-slot-comp><span>This is the default slot</span></default-slot-comp>')
      body.appendChild(basicComp)
      t.is(document.querySelector('default-slot-comp p').textContent, 'This is the default slot')
      basicComp.remove()
    })
})

test('render named slot', t => {
  return loadRenderer()
    .then(({ html, renderer }) => {
      const body = document.body
      createCustomElement('named-slot-comp', {
        renderer,
        render () {
          return html`
            <p>
              ${this.slots.first}
              <span>This is existing content</span>
            </p>
          `
        }
      })
      const basicComp = elementFromString('<named-slot-comp><span slot="first">This is the named slot</span></named-slot-comp>')
      body.appendChild(basicComp)
      t.is(document.querySelector('named-slot-comp span:first-child').textContent, 'This is the named slot')
      basicComp.remove()
    })
})

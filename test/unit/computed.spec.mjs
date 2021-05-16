import { JSDOM } from 'jsdom'
import test from 'ava'
import { createCustomElement } from '../../src/index.mjs'
import { loadRenderer } from '../helpers/renderer.mjs'

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

test('computed getters', t => {
  return loadRenderer()
    .then(({ html, renderer }) => {
      const body = document.body
      createCustomElement('basic-computed', {
        renderer,
        props: {
          name: {
            type: String
          },
          age: {
            type: Number
          }
        },
        computed: {
          formattedName () {
            return `Hi there, ${this.props.name}. You do not look ${this.props.age}!`
          }
        },
        render () {
          return html`<p>${this.formattedName}</p>`
        }
      })
      const comp = document.createElement('basic-computed')
      comp.setAttribute('name', 'Matt')
      comp.setAttribute('age', '40')
      body.appendChild(comp)
      t.is(document.querySelector('basic-computed p').textContent, 'Hi there, Matt. You do not look 40!')
    })
})

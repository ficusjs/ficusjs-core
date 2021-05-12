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
  globalThis.customElements = window.customElements
  globalThis.HTMLElement = window.HTMLElement
  globalThis.document = document
})

test('render props', t => {
  return loadRenderer()
    .then(({ html, renderer }) => {
      const body = document.body
      const created = sinon.spy()
      const mounted = sinon.spy()
      createCustomElement('basic-props', {
        renderer,
        props: {
          name: {
            type: String
          },
          age: {
            type: Number
          },
          isMarried: {
            type: Boolean
          },
          kids: {
            type: Object
          }
        },
        created,
        mounted,
        render () {
          return html`
            <ul>
              <li id="name">Hi there, ${this.props.name}</li>
              <li id="age">You are ${this.props.age} years old</li>
              <li id="is-married">You are ${this.props.isMarried ? 'married' : 'not married'}</li>
              <li id="kids">You have ${this.props.kids ? this.props.kids.length : 'no'} kids</li>
            </ul>
          `
        }
      })
      const comp = document.createElement('basic-props')
      comp.setAttribute('name', 'Matt')
      comp.setAttribute('age', '40')
      body.appendChild(comp)
      t.is(document.querySelector('basic-props #name').textContent, 'Hi there, Matt')
      t.is(document.querySelector('basic-props #age').textContent, 'You are 40 years old')
      t.is(document.querySelector('basic-props #is-married').textContent, 'You are not married')
      t.is(document.querySelector('basic-props #kids').textContent, 'You have no kids')
      t.truthy(created.called)
      t.truthy(mounted.called)
    })
})

test('update props', t => {
  return loadRenderer()
    .then(({ html, renderer }) => {
      const body = document.body
      const updated = sinon.spy()
      createCustomElement('update-props', {
        renderer,
        props: {
          name: {
            type: String
          }
        },
        updated,
        render () {
          return html`<p>Hi there, ${this.props.name}</p>`
        }
      })
      const comp = document.createElement('update-props')
      comp.setAttribute('name', 'Matt')
      body.appendChild(comp)
      t.is(document.querySelector('update-props p').textContent, 'Hi there, Matt')
      comp.setAttribute('name', 'Fred')
      t.is(document.querySelector('update-props p').textContent, 'Hi there, Fred')
      t.truthy(updated.called)
    })
})

test('default props', t => {
  return loadRenderer()
    .then(({ html, renderer }) => {
      const body = document.body
      const updated = sinon.spy()
      createCustomElement('default-props', {
        renderer,
        props: {
          name: {
            type: String,
            default: 'Matt'
          },
          age: {
            type: Number,
            default: 10,
            required: true
          },
          isMarried: {
            type: Boolean,
            required: true
          }
        },
        updated,
        render () {
          return html`<p>Hi there, ${this.props.name}. No way you look ${this.props.age}!</p>`
        }
      })
      const comp = document.createElement('default-props')
      body.appendChild(comp)
      t.is(document.querySelector('default-props p').textContent, 'Hi there, Matt. No way you look 10!')
    })
})

test('object prop error', t => {
  return loadRenderer()
    .then(({ html, renderer }) => {
      const body = document.body
      createCustomElement('object-props', {
        renderer,
        props: {
          kids: {
            type: Object
          }
        },
        render () {
          return html`<p>You have ${this.props.kids ? this.props.kids.length : 'no'} kids</p>`
        }
      })
      const comp = document.createElement('object-props')
      comp.setAttribute('kids', '---xxx---')
      body.appendChild(comp)
      t.is(document.querySelector('object-props p').textContent, 'You have no kids')
    })
})

test('instance props', t => {
  return loadRenderer()
    .then(({ html, renderer }) => {
      const body = document.body
      createCustomElement('instance-props', {
        renderer,
        props: {
          kids: {
            type: Object
          }
        },
        render () {
          return html`<p>You have ${this.props.kids ? this.props.kids.length : 'no'} kids</p>`
        }
      })
      const comp = document.createElement('instance-props')
      body.appendChild(comp)
      t.is(document.querySelector('instance-props p').textContent, 'You have no kids')
      const kids = [{ name: 'Matt' }]
      comp.kids = kids
      t.is(document.querySelector('instance-props p').textContent, 'You have 1 kids')
      const k = comp.kids
      t.deepEqual(k, kids)
    })
})

import { JSDOM } from 'jsdom'
import test from 'ava'
import sinon from 'sinon'
import { createCustomElement } from '../../src/index.mjs'
import { loadRenderer, waitFor } from '../helpers/renderer.mjs'

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

test('no render provided', t => {
  return loadRenderer()
    .then(({ html, renderer }) => {
      const body = document.body
      createCustomElement('no-render-comp', {
        renderer
      })
      const basicComp = document.createElement('no-render-comp')
      body.appendChild(basicComp)
      t.is(basicComp.componentTagName, 'no-render-comp')
      t.is(document.querySelector('no-render-comp').children.length, 0)
      basicComp.remove()
    })
})

test('render custom element', t => {
  return loadRenderer()
    .then(({ html, renderer }) => {
      const body = document.body
      const created = sinon.spy()
      const mounted = sinon.spy()
      const removed = sinon.spy()
      createCustomElement('basic-comp', {
        renderer,
        created,
        mounted,
        removed,
        render () {
          return html`<p>Basic component</p>`
        }
      })
      const basicComp = document.createElement('basic-comp')
      body.appendChild(basicComp)
      t.is(basicComp.componentTagName, 'basic-comp')
      t.is(document.querySelector('basic-comp p').textContent, 'Basic component')
      t.truthy(created.called)
      t.truthy(mounted.called)
      basicComp.remove()
      t.truthy(removed.called)
    })
})

test('render custom element with open shadow dom', t => {
  return loadRenderer()
    .then(({ html, renderer }) => {
      const body = document.body
      const created = sinon.spy()
      const mounted = sinon.spy()
      const removed = sinon.spy()
      createCustomElement('shadow-comp', {
        renderer,
        created,
        mounted,
        removed,
        root: 'shadow',
        render () {
          return html`<p>Basic component</p>`
        }
      })
      const basicComp = document.createElement('shadow-comp')
      body.appendChild(basicComp)
      t.is(basicComp.componentTagName, 'shadow-comp')
      t.throws(() => document.querySelector('shadow-comp p').textContent)
      t.truthy(created.called)
      t.truthy(mounted.called)
      basicComp.remove()
      t.truthy(removed.called)
    })
})

test('render custom element with closed shadow dom', t => {
  return loadRenderer()
    .then(({ html, renderer }) => {
      const body = document.body
      const created = sinon.spy()
      const mounted = sinon.spy()
      const removed = sinon.spy()
      createCustomElement('shadow-closed-comp', {
        renderer,
        created,
        mounted,
        removed,
        root: 'shadow:closed',
        render () {
          return html`<p>Basic component</p>`
        }
      })
      const basicComp = document.createElement('shadow-closed-comp')
      body.appendChild(basicComp)
      t.is(basicComp.componentTagName, 'shadow-closed-comp')
      t.throws(() => document.querySelector('shadow-closed p').textContent)
      t.truthy(created.called)
      t.truthy(mounted.called)
      basicComp.remove()
      t.truthy(removed.called)
    })
})

test('async render custom element', t => {
  return loadRenderer()
    .then(({ html, renderer }) => {
      const body = document.body
      createCustomElement('async-render-comp', {
        renderer,
        render () {
          return new Promise(resolve => resolve(html`<p>Async render component</p>`))
        }
      })
      const basicComp = document.createElement('async-render-comp')
      body.appendChild(basicComp)
      return waitFor(() => document.querySelector('async-render-comp p'))
    })
    .then(() => {
      t.is(document.querySelector('async-render-comp p').textContent, 'Async render component')
    })
})

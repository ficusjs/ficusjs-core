import { createCustomElement, html } from '../util/component.mjs'
import { emit } from '../util/emit.mjs'

createCustomElement('mock-lifecycle', {
  mounted () {
    emit('mounted')
  },
  removed () {
    emit('removed')
  },
  render () {
    return html`<span>Lifecycle component</span>`
  }
})

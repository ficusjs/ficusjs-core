/* global describe cy before beforeEach it expect  */
/* eslint-disable no-unused-expressions */
describe('Lifecycle component', () => {
  const spies = {
    mounted: null,
    removed: null
  }

  beforeEach(() => {
    spies.mounted = cy.spy()
    spies.removed = cy.spy()
    cy.visit('custom-element')
    cy.document().then((doc) => {
      doc.addEventListener('mounted', () => spies.mounted())
      doc.addEventListener('removed', () => spies.removed())
    })
  })

  describe('adding the lifecycle component', () => {
    beforeEach(() => {
      cy.get('#add-lifecycle').click()
    })

    it('should emit the mounted event', () => {
      expect(spies.mounted).to.be.called
    })

    it('should add and render the component', () => {
      cy.get('mock-lifecycle')
        .should('have.text', 'Lifecycle component')
    })
  })

  describe('removing the component', () => {
    beforeEach(() => {
      cy.get('#add-lifecycle').click()
      cy.get('#remove-lifecycle').click()
    })

    it('should emit the removed event', () => {
      expect(spies.removed).to.be.called
    })

    it('should remove the component', () => {
      cy.get('mock-lifecycle')
        .should('not.exist')
    })
  })
})

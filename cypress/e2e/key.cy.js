/* global describe cy before it  */
describe('Key Prop', () => {
  before(() => {
    cy.visit('custom-element')
  })

  it('is rendered', () => {
    cy.get('mock-key')
      .should('exist')
  })

  describe('when the key is set', () => {
    it('is rendered', () => {
      cy.get('mock-key button#mock-key-button')
        .click()
      cy.get('mock-key-child span')
        .should('have.text', 'Hello')
    })
  })

  describe('when the key is updated', () => {
    it('is rendered', () => {
      cy.get('mock-key-child button#mock-key-child-button')
        .click()
      cy.get('mock-key-child span')
        .should('have.text', 'Goodbye')
    })
  })
})

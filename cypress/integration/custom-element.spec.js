/* global describe cy before it  */
describe('Custom element', () => {
  before(() => {
    cy.visit('custom-element')
  })

  it('is rendered', () => {
    cy.get('mock-basic')
      .should('have.text', 'Basic custom element')
  })
})

/* global describe cy before it  */
describe('Basic component', () => {
  before(() => {
    cy.visit('custom-element')
  })

  it('is rendered', () => {
    cy.get('mock-basic')
      .should('have.text', 'Basic component')
  })
})

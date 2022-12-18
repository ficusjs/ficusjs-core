/* global describe cy beforeEach it  */
describe('Basic component', () => {
  beforeEach(() => {
    cy.visit('custom-element')
  })

  it('is rendered', () => {
    cy.get('mock-basic')
      .should('have.text', 'Basic component')
  })
})

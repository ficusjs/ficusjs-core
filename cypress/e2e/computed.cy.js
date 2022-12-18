/* global describe cy beforeEach it  */
describe('Getters component', () => {
  beforeEach(() => {
    cy.visit('custom-element')
  })

  it('is rendered', () => {
    cy.get('mock-computed')
      .should('have.text', 'Computed component')
  })

  it('cached is rendered', () => {
    cy.get('mock-cached-computed')
      .should('contain.text', 'Cached computed component')
  })
})

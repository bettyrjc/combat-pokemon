

describe('Pokemon List', () => {
  beforeEach(() => {
    cy.visit('/');
  });


  it('should filter pokemon by name', () => {
    cy.get('#search-input').type('pikachu');
    cy.wait(500);
    cy.get('.card').should('have.length', 1);
  });
});
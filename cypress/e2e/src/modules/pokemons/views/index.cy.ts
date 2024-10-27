describe("Pokemon List", () => {
  it("should filter pokemon by name", () => {
    cy.visit("/");
    cy.get("#search-input").type("pikachu");
    cy.get('[data-cy="pikachu"]').should("exist");
  });
  it("Not found pokemon", () => {
    cy.visit("/");
    cy.visit("/");
    cy.get("#search-input").type("pikachuuuu");
    cy.get('[data-cy="pikachuuuu"]').should("not.exist");
  });

});

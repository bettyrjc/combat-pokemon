describe("List all pokemons", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Search a pokemon", async () => {
    cy.get('[id="search-input"]').type("pikachu");
    cy.get(".card").should("have.length", 1);
  });
  it("Add a pokemon to the combat", async () => {
    cy.get(".card").first().find("button").click();
    cy.get("[data-cy='combat-card]").should("have.length", 1);
  });
  it("Go to detail of a pokemon", async () => {
    cy.get(".card").first().find("a").click();
    cy.url().should("include", "/pokemons/");
  })
});

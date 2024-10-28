describe("Combat list test", () => {

  it("not have data", () => {
    cy.visit("/");
    cy.get('[data-cy="combat-card"]').should("have.length", 0);
  });

  it("add pokemon max combat list", () => {
    cy.visit("/");
    let clickCount = 0;

    cy.get('[data-cy="add-pokemon"]').each(($el) => {
      if (clickCount < 6) {
        cy.wrap($el).click();
        clickCount++;
      }
    });
    cy.get('[data-cy="combat-card"]').should("have.length", 6);
  });

  it("add pokemon and delete to combat list", () => {
    cy.visit("/");

    cy.get('[data-cy="add-pokemon"]').first().click();
    cy.get('[data-cy="combat-card"]').first().trigger("mouseover");
    cy.get('[data-cy="delete-pokemon"]').first().should("be.visible").click();
  });

  it("add pokemon and go to detail", () => {
    cy.visit("/");

    cy.get('[data-cy="add-pokemon"]').first().click();
    cy.get('[data-cy="combat-card"]').first().trigger("mouseover");
    cy.get('[data-cy="detail-link"]').first().click();
    cy.url().should("include", "/pokemons/");
  });

  it("Not exceed the maximum number of pokemons", () => {
    cy.visit("/");

    let clickCount = 1;

    cy.get('[data-cy="add-pokemon"]').each(($el) => {
      if (clickCount < 7) {
        cy.wrap($el).click();
        clickCount++;
      }
    });
    cy.get('[data-cy="add-pokemon"]').first().click();
    cy.get('[data-cy="combat-card"]').should("have.length", 6);
  });
});

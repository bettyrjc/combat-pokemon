describe("Pokemon detail", () => {
  beforeEach(() => {
    cy.window().then((win) => {
      win.document.documentElement.style.setProperty(
        "--animation-duration",
        "0s"
      );
    });

    cy.intercept("GET", "https://pokeapi.co/api/v2/pokemon/ivysaur", {
      statusCode: 200,
      body: {
        name: "ivysaur",
        id: 2,
        height: 1,
        types: [{ type: { name: "grass" } }],
        stats: [
          { base_stat: 60 },
          { base_stat: 62 },
          { base_stat: 63 },
          { base_stat: 80 },
          { base_stat: 80 },
          { base_stat: 60 },
        ],
        sprites: {
          other: {
            dream_world: {
              front_default:
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/2.svg",
            },
          },
        },
        // ... otros datos necesarios
      },
    }).as("getPokemon");
    cy.visit("/pokemons/ivysaur");

    cy.get('[data-cy="combat-button"]')
      .should("be.visible")
      .should("be.enabled");
  });

  it("handle add and delete from list", () => {
    cy.get('[data-cy="combat-button"]').click();
    cy.get('[data-cy="combat-button"]').should(
      "have.text",
      "Eliminar de la lista"
    );

    cy.get('[data-cy="combat-button"]')
    .should("have.text", "Eliminar de la lista");
    cy.get('[data-cy="combat-button"]').click();
  });

  it("pokemon has name", () => {
    cy.get('[cy-data="pokemon-name"]').should("have.text", "ivysaur");
  });

  it("Back to list", () => {
    cy.get('[data-cy="back-link"]').click();
    cy.url().should("eq", Cypress.config().baseUrl + "/");
  });


});

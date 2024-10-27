/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }


export const MOCK_POKEMON_LIST: any[] = [
  {
    name: "ivysaur",
    url: "https://pokeapi.co/api/v2/pokemon/2/"
  },
  {
    name: "venusaur",
    url: "https://pokeapi.co/api/v2/pokemon/3/"
  },
  {
    name: "pikachu",
    url: "https://pokeapi.co/api/v2/pokemon/25/"
  }
];

declare global {
  namespace Cypress {
    interface Chainable {
      setupPokemonList: typeof setupPokemonList
    }
  }
}

const setupPokemonList = () => {
  cy.window().then((win: any) => {
    // Usamos la acción correcta de tu reducer
    win.store.dispatch({
      type: 'pokemons/setPokemonsSuccess',
      payload: MOCK_POKEMON_LIST
    });
  });
};

// Comando adicional para simular estados de carga y error
const setupPokemonLoading = () => {
  cy.window().then((win: any) => {
    win.store.dispatch({
      type: 'pokemons/setPokemonsLoading'
    });
  });
};

const setupPokemonError = () => {
  cy.window().then((win: any) => {
    win.store.dispatch({
      type: 'pokemons/setPokemonsError',
      payload: 'Error al cargar pokemones'
    });
  });
};

Cypress.Commands.add('setupPokemonList', setupPokemonList);
Cypress.Commands.add('setupPokemonLoading', setupPokemonLoading);
Cypress.Commands.add('setupPokemonError', setupPokemonError);

// Agregamos los tipos para los nuevos comandos
declare global {
  namespace Cypress {
    interface Chainable {
      setupPokemonList: typeof setupPokemonList
      setupPokemonLoading: typeof setupPokemonLoading
      setupPokemonError: typeof setupPokemonError
    }
  }
}
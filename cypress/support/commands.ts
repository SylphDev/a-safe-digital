/// <reference types="cypress" />

Cypress.Commands.add("login", () => {
  cy.visit("/");
  cy.get("input[name=email]").type("user@example.com");
  cy.get("input[name=password]").type("password");
  cy.get("button[type=submit]").click();
  cy.url().should("include", "/dashboard");
});

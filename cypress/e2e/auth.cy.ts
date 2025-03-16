describe("Authentication", () => {
  it("Logs in with correct credentials", () => {
    cy.visit("/");
    cy.get("input[name=email]").type("user@example.com");
    cy.get("input[name=password]").type("password");
    cy.get("button[type=submit]").click();
    cy.url().should("include", "/dashboard");
  });

  it("Fails with incorrect credentials", () => {
    cy.visit("/");
    cy.get("input[name=email]").type("wrong@example.com");
    cy.get("input[name=password]").type("wrongpassword");
    cy.get("button[type=submit]").click();
    cy.contains("Invalid email or password").should("be.visible");
  });

  it("Redirects to login when accessing protected page without authentication", () => {
    cy.visit("/dashboard");
    cy.url().should("eq", `${Cypress.config("baseUrl")}/`);
  });
});

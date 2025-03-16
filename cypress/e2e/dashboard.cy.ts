describe("Dashboard", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/dashboard");
  });

  it("Displays dashboard correctly", () => {
    cy.contains("Age Distribution of your Users").should("be.visible");
    cy.contains("Country Distribution of your Users").should("be.visible");
    cy.contains("Users").should("be.visible");
  });
});

describe("Dashboard Graphs", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/dashboard");
  });
  it("Renders age distribution line graph", () => {
    cy.contains("Age Distribution of your Users").should("be.visible");
    cy.get("#age-graph").should("exist");
  });

  it("Renders country distribution bar graph", () => {
    cy.contains("Country Distribution of your Users").should("be.visible");
    cy.get("#country-graph").should("exist");
  });

  it("Renders premium distribution semi circular graph", () => {
    cy.contains("Premium Distribution of your Users").should("be.visible");
    cy.get("#premium-graph").should("exist");
  });
});

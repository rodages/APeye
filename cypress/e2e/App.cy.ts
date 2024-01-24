describe("page loads", () => {
  beforeEach(() => {
    cy.setCookie("mock_token", "");
  });

  it("loads home page", () => {
    cy.visit("/");

    cy.contains("Homepage");
  });

  it("loads 404 page", () => {
    cy.visit("/invalidpage");

    cy.contains("404");
    cy.contains("This page doesn't exist");
  });
});

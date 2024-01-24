import Home from "..";

describe("Page - Home", () => {
  it("should render", () => {
    cy.mountWithWrappers(<Home />);

    cy.contains("h1", "Homepage");
  });
});

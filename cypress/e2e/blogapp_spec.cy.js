const baseUrl = "http://localhost:3000";
const serverUrl = "http://localhost:3003";

describe("Blog app", () => {
  beforeEach(() => {
    // reset db
    cy.request("POST", `${serverUrl}/api/testing/reset`);

    // create a test user
    const user = {
      name: `testuser-${Date.now()}}`,
      username: `testusername-${Date.now()}}`,
      password: `testpassword-${Date.now()}}`,
    };
    cy.request("POST", `${serverUrl}/api/users/`, user);

    cy.visit(baseUrl);
  });

  it("front page can be opened", () => {
    cy.contains("Blog App");
    cy.get("login").click();
    cy.get("#username").type("test");
    cy.get("#password").type("test");
  });
});

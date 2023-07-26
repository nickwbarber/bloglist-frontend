/* eslint-disable space-before-function-paren */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
const baseUrl = "http://localhost:3000";
const serverUrl = "http://localhost:3003";

const login = async (user) => {
  const { name, username, password } = user;

  cy.contains("login").click();
  cy.get("#username").type(username);
  cy.get("#password").type(password);
  cy.get("#login-button").click();
  cy.contains(`${name} logged in`);
};

describe("Blog app", function() {
  let user;

  beforeEach(function() {
    // test user config
    user = {
      name: `testuser-${Date.now()}`,
      username: `testusername-${Date.now()}`,
      password: `testpassword-${Date.now()}`,
    };

    // reset db
    cy.request("POST", `${serverUrl}/api/testing/reset`, { numOfUsers: 2, numOfBlogs: 3 });
    // create a test user
    cy.request("POST", `${serverUrl}/api/users/`, user);
    // visit the app
    cy.visit(baseUrl);
  });

  it("login form is shown", function() {
    cy.contains("Blog App");
    cy.contains("login").click();
    cy.get("#username");
    cy.get("#password");
  });

  describe("Login", function() {
    it("succeeds with correct credentials", function() {
      cy.contains("login").click();
      cy.get("#username").type(user.username);
      cy.get("#password").type(user.password);
      cy.get("#login-button").click();
      cy.contains(`${user.name} logged in`);
    });

    it("fails with incorrect credentials", function() {
      cy.contains("login").click();
      cy.get("#username").type("unknown");
      cy.get("#password").type("unknown");
      cy.get("#login-button").click();
      cy.contains(/wrong credentials/i);
    });
  });

  describe("When logged in", function() {
    beforeEach(function() {
      login(user);
      cy.visit(baseUrl);
    });

    it("A blog can be created", function() {
      cy.get("#toggle-blog-form").click();
      cy.get("#title").type("test title");
      cy.get("#author").type("test author");
      cy.get("#url").type("test url");
      cy.get("#create-blog-button").click();
      cy.contains("test title");
    });
  });
});

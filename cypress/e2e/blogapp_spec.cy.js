/* eslint-disable space-before-function-paren */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
const baseUrl = "http://localhost:3000";
const serverUrl = "http://localhost:3003";

const login = async (username, password) => {
  const body = await cy.request("POST", `${serverUrl}/api/login`, { username, password });
  localStorage.setItem("loggedBlogAppUser", JSON.stringify(body));
};

describe("Blog app", function() {
  // test user config
  const user = {
    name: `testuser-${Date.now()}`,
    username: `testusername-${Date.now()}`,
    password: `testpassword-${Date.now()}`,
  };

  beforeEach(function() {
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
      login(user.username, user.password);
      cy.visit(baseUrl);
      cy.contains(`${user.name} logged in`);
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

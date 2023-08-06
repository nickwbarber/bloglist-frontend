/* eslint-disable space-before-function-paren */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
const BASEURL = "http://localhost:3000";
const BACKEND = "http://localhost:3003/api";

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
    cy.request("POST", `${BACKEND}/testing/reset`, { numOfUsers: 2, numOfBlogs: 3 });
    // create a test user
    cy.request("POST", `${BACKEND}/users/`, user);
    // visit the app
    cy.visit(BASEURL);
  });

  it("login form is shown", function() {
    cy.contains("Blog App");
    cy.contains("login").click();
    cy.get("#usernameInput");
    cy.get("#passwordInput");
  });

  describe("Login", function() {
    it("succeeds with correct credentials", function() {
      cy.get("#toggle-login-form").click();
      cy.get("#loginForm").within(() => {
        cy.get("#usernameInput").type(user.username);
        cy.get("#passwordInput").type(user.password);
        cy.get("#login-button").click();
      });
    });

    it("fails with incorrect credentials", function() {
      cy.contains("login").click();
      cy.get("#usernameInput").type("unknown");
      cy.get("#passwordInput").type("unknown");
      cy.get("#login-button").click();
      cy.contains(/wrong credentials/i);
    });
  });

  describe("When logged in", function() {
    beforeEach(function() {
      cy.login(user);
    });

    it("A blog can be created", function() {
      // create a blog
      cy.get("#toggle-blog-form").click();
      cy.get("#title").type("test title");
      cy.get("#author").type("test author");
      cy.get("#url").type("test url");
      cy.get("#create-blog-button").click();

      cy.contains("test title");
    });

    it("A blog can be liked", function() {
      // create a blog
      cy.get("#toggle-blog-form").click();
      cy.get("#title").type("test title");
      cy.get("#author").type("test author");
      cy.get("#url").type("test url");
      cy.get("#create-blog-button").click();

      // try clicking the like button
      cy.contains("test title").closest(".blogContent").within(() => {
        cy.get(".showButton").click();
        cy.get(".likes").contains("0");
        cy.get(".likeButton").click();
        cy.get(".likes").contains("1");
      });
    });

    it("A blog can be deleted", function() {
      // create a blog
      cy.get("#toggle-blog-form").click();
      cy.get("#title").type("test title");
      cy.get("#author").type("test author");
      cy.get("#url").type("test url");
      cy.get("#create-blog-button").click();

      // try deleting the blog
      cy.contains("test title").closest(".blogContent").within(() => {
        cy.get(".showButton").click();
        cy.get(".deleteButton").click();
      });

      cy.get(".blogContent").should("not.contain", "test title");
    });

    // TODO: test that a blog can only be deleted by the user who created it
    it.only("A blog can only be deleted by the user who created it", function() {
      // create a blog
      cy.get("#toggle-blog-form").click();
      cy.get("#title").type("test title");
      cy.get("#author").type("test author");
      cy.get("#url").type("test url");
      cy.get("#create-blog-button").click();

      // try finding delete buttons for all blogs
      // TODO:
      cy.wait(3000);

      const getBlogContent = () => cy.get(".blogContent");
      const newBlog = getBlogContent().filter(":contains('test title')").first();
      const firstOldBlog = getBlogContent().not(":contains('test title')").first();

      firstOldBlog.within(() => {
        cy.get(".showButton").click();
        cy.get(".username").should("not.contain", user.username);
        cy.get(".deleteButton").should("not.exist");
      });

      newBlog.within(() => {
        cy.get(".showButton").click();
        cy.get(".deleteButton");
      });
    });
  });
});

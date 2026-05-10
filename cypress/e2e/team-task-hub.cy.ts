/// <reference types="cypress" />

describe("Team Task Hub", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit("/");
  });

  it("creates a project, adds a task, edits it and marks it as done", () => {
    cy.contains("Team Task Hub").should("be.visible");
    cy.contains("Add a project to get started").should("be.visible");

    // Create project
    cy.contains("button", "Add project").click();

    cy.get('input[name="name"]').type("Website");
    cy.get('input[name="description"]').type("Build website");

    cy.contains('[role="dialog"] button', "Add project").click();

    cy.contains("Website").should("be.visible");
    cy.contains("Build website").should("be.visible");

    // Select project
    cy.contains("Website").click();

    // Add task
    cy.contains("button", "Add task").click();

    cy.get('input[name="title"]').type("Write Cypress test");
    cy.get('input[name="description"]').type("Test real user flow");

    cy.contains('[role="dialog"] button', "Add task").click();

    cy.contains("Write Cypress test").should("be.visible");
    cy.contains("Test real user flow").should("be.visible");

    // Edit task
    cy.contains("Write Cypress test")
      .parents("tr")
      .within(() => {
        cy.get("button").eq(1).click();
      });

    cy.get('input[name="title"]').clear().type("Updated Cypress task");
    cy.get('input[name="description"]')
      .clear()
      .type("Updated task description");

    cy.contains("button", "Save changes").click();

    cy.contains("Updated Cypress task").should("be.visible");
    cy.contains("Updated task description").should("be.visible");
    cy.contains("Write Cypress test").should("not.exist");
  });
});

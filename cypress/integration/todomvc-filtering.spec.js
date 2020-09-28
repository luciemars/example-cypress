/// <reference types="cypress" />

import * as todoPage from "../page-objects/todo-page";

describe("filtering", () => {
  const todoList = ["clean room", "learn javascript", "use cypress"];

  beforeEach(() => {
    todoPage.navigate();

    // add 3 todos in the list
    todoList.forEach((element) => {
      todoPage.addTodo(element);
    });

    // tick the second one
    todoPage.markTodoAsDone(todoList[1]);
  });

  it('should filter "active" todos', () => {
    todoPage.applyFilter("Active");

    // Validate liste length
    todoPage.getTodoItems().should("have.length", 2);

    // Validate completed element is not displayed
    todoPage.getTodoItems().contains(todoList[1]).should("not.exist");

    // Validate active elements are displayed with the proper style
    validateItemActive(todoList[0], true);
    validateItemActive(todoList[2], true);
  });

  it('should filter "completed" todos', () => {
    todoPage.applyFilter("Completed");
    todoPage.getTodoItems().should("have.length", 1);

    // Validate completed element is displayed with the proper style
    validateItemActive(todoList[1], false);
  });

  it('should filter "all" todos', () => {
    todoPage.applyFilter("All");
    todoPage.getTodoItems().should("have.length", 3);

    // Validate active and completed elements are displayed with the proper style
    validateItemActive(todoList[0], true);
    validateItemActive(todoList[1], false);
    validateItemActive(todoList[2], true);
  });
});

function validateItemActive(itemText, isActive) {
  todoPage.getTodoItemWithText(itemText).as("item");
  todoPage
    .getItemToggle(cy.get("@item"))
    .should(isActive ? "not.be.checked" : "to.be.checked");
  todoPage
    .getItemLabel(cy.get("@item"))
    .should(
      isActive ? "not.have.css" : "have.css",
      "text-decoration-line",
      "line-through"
    );
}

/// <reference types="cypress" />

import * as todoPage from "../page-objects/todo-page";
import testData from "../fixtures/test-data";

describe("to do actions", () => {
  const todoValue = testData.todoList[0];

  beforeEach(() => {
    todoPage.navigate();
    todoPage.addTodo(todoValue);
  });

  it("should be able to add a new todo to the list", () => {
    todoPage
      .getItemLabel(todoPage.getTodoItemWithIndex(1))
      .should("have.text", todoValue);

    todoPage
      .getItemToggle(todoPage.getTodoItemWithText(todoValue))
      .should("not.be.checked");
  });

  it("should mark a todo as completed", () => {
    todoPage.markTodoAsDone(todoValue);
    todoPage.getTodoItemWithText(todoValue).as("item");
    todoPage.getItemToggle(cy.get("@item")).should("be.checked");
    todoPage
      .getItemLabel(cy.get("@item"))
      .should("have.css", "text-decoration-line", "line-through");
  });

  it("should clear completed todos", () => {
    todoPage.markTodoAsDone(todoValue);
    todoPage.clearCompleted();
    todoPage.getTodoItems().should("not.exist");
  });
});

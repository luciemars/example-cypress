const locators = {
  newToDo: ".new-todo",
  todoList: ".todo-list",
  item: "li",
  label: "label",
  toggle: ".toggle",
  clearCompleted: "button.clear-completed",
};

export function navigate() {
  cy.visit("http://todomvc-app-for-testing.surge.sh");
}

export function addTodo(todoText) {
  // add a todo in the list
  cy.get(locators.newToDo).type(todoText + "{enter}");
}

export function getTodoItems() {
  return cy.get(`${locators.todoList} ${locators.item}`);
}

export function getTodoItemWithIndex(todoIndex) {
  return cy.get(
    `${locators.todoList} ${locators.item}:nth-child(${todoIndex})`
  );
}

export function getItemLabel(item) {
  return item.find(locators.label);
}

export function getItemToggle(item) {
  return item.find(locators.toggle);
}

export function getTodoItemWithText(todoText) {
  return getTodoItems().within(() => {
    cy.contains(todoText).parent();
  });
}

export function markTodoAsDone(todoText) {
  getTodoItemWithText(todoText).children(locators.toggle).click();
}

export function clearCompleted() {
  cy.get(locators.clearCompleted).click();
}

export function applyFilter(filterName) {
  cy.contains(filterName).click();
}

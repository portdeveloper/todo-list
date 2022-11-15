import "./style.css";

class TodoList {
  constructor() {
    this.projects = []
  }

  addProject(project) {
    this.projects.push(project)
  }
  getProject(projectName) {
    return this.projects.find(project => project.name === projectName)
  }
  updateProject(projectName, newName) {
    this.projects.splice(this.projects.indexOf(projectName), 1, newName)
  }
  removeProject(projectName) {
    this.projects.splice(this.projects.indexOf(projectName), 1)
  }
}

class Project {
  constructor(name) {
    this.name = name
    this.todos = []
  }

  addTodo(todo) {
    this.todos.push(todo)
  }
  getTodo(todoName) {
    return this.todos.find(todo => todo.name === todoName)
  }
  updateTodo(todoName, newName) {
    this.todos.splice(this.todos.indexOf(todoName), 1, newName)
  }
  removeTodo(todoName) {
    this.todos.splice(this.todos.indexOf(todoName), 1)
  }
}

class Todo {
  constructor(name, dueDate, priority) {
    this.name = name
    this.dueDate = dueDate
    this.priority = priority
  }
}

const todolist = new TodoList()
const defaultProject = new Project("defaultProject")
const school = new Project("school")
const todo1 = new Todo("study js", "12.12.2022", "Important")
const todo2 = new Todo("math hw", "09.01.2023", "Important")

defaultProject.addTodo(todo1)
school.addTodo(todo2)
todolist.addProject(defaultProject)
todolist.addProject(school)

let currentProject = defaultProject

// MAIN CONTAINER

const todoContainer = document.querySelector(".todo-container");

function displayTodos(project) {
  const h2 = document.querySelector(".project-name")
  h2.textContent = project.name
  todoContainer.innerHTML = "";
  for (let i = 0; i < project.todos.length; i++) {
    const outerDiv = document.createElement("div");
    outerDiv.classList.add("todo");
    const innerDiv = document.createElement("div");
    const input = document.createElement("input");
    input.type = "checkbox";
    const nameButton = document.createElement("button");
    nameButton.classList.add("todo-btn");
    const innerDiv2 = document.createElement("div");
    const dateButton = document.createElement("button");
    const closeButton = document.createElement("span");
    closeButton.innerHTML = "&times;";
    closeButton.classList.add("delete-todo");

    nameButton.textContent = `${project.todos[i].name}`;
    dateButton.textContent = `${project.todos[i].dueDate}`;

    innerDiv.appendChild(input);
    innerDiv.appendChild(nameButton);
    outerDiv.appendChild(innerDiv);
    innerDiv2.appendChild(dateButton);
    innerDiv2.appendChild(closeButton);
    outerDiv.appendChild(innerDiv2);
    todoContainer.appendChild(outerDiv);
  }
}

todoContainer.addEventListener("click", (e) => {
  deleteTodo(e);
  displayTodos(currentProject);
});

function deleteTodo(e) {
  if (e.target.classList.contains("delete-todo")) {
    const todoName = document.querySelector(".todo-btn")
    e.target.parentElement.parentElement.remove();
    currentProject.removeTodo(todoName.textContent)
    console.log(defaultProject)
  }
}

function cleanTodoContainer() {
  const container = document.querySelector(".todo-container");
  container.innerHTML = "";
}

// SIDEBAR

function changeProject(e) {
  if (e.target.classList.contains("project-button")) {
    cleanTodoContainer();
    currentProject = todolist.getProject(e.target.textContent)
    displayTodos(currentProject);
  }
}

function addNewProject(e) {
  if (e.target.classList.contains("new-project-button")) {
    const projects = document.querySelector(".projects");
    const pbtn = document.createElement("button");
    pbtn.classList.add("project-button");
    const pbtnText = prompt("project name?")
    todolist.addProject(new Project(pbtnText))
    pbtn.textContent = pbtnText;
    projects.appendChild(pbtn);
  }
}

document.querySelector(".sidebar").addEventListener("click", (e) => {
  changeProject(e)
  addNewProject(e)
});

// MODAL

const modal = document.querySelector("#modal");
const btn = document.querySelector("#modal-btn");
const span = document.querySelector(".close");

function getTodoFromForm(project) {
  const form = document.querySelector("form");
  const name = document.getElementById("todo-name").value;
  const date = document.getElementById("todo-date").value;
  const priority = document.getElementById("todo-priority").value;

  project.addTodo(new Todo(name, date, priority))
  form.reset();
}

document.querySelector(".modal-form").addEventListener("submit", (e) => {
  e.preventDefault();
  getTodoFromForm(currentProject);
  displayTodos(currentProject)
});

btn.addEventListener("click", () => {
  modal.style.display = "block";
});

span.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target == modal) {
    modal.style.display = "none";
  }
});
const todoInput = document.querySelector("#todoTask");
const btnAdd = document.querySelector(`#addBtn`);
const list = document.querySelector(`#todoList`);

class Todo {
  constructor(task) {
    this.task = task;
    this.id = crypto.randomUUID();
  }

  static deleteTodo(id) {
    const todoArray = getFromLocalStorage();
    const updatedArray = todoArray.filter((todo) => todo.id !== id);
    addToLocalStorage(updatedArray);
    renderTodos();
  }
}

let userInput = "";

btnAdd.addEventListener("click", () => {
  if (userInput !== "") {
    addTodo(userInput);
    todoInput.value = "";
    renderTodos();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  renderTodos();
  listStyle();
});

todoInput.addEventListener("change", (e) => {
  userInput = e.target.value;
});

function addTodo(task) {
  const todo = new Todo(task);
  const todoArray = getFromLocalStorage();
  todoArray.push(todo);
  addToLocalStorage(todoArray);
  userInput = "";
}

function renderTodos() {
  list.innerHTML = "";
  let todos = getFromLocalStorage();
  todos.map((item) => {
    let todoElement = createElements(item);
    list.appendChild(todoElement);
  });

  listStyle();
}

function addToLocalStorage(item) {
  return localStorage.setItem("todos", JSON.stringify(item));
}

function getFromLocalStorage() {
  const storedData = localStorage.getItem("todos");
  return storedData ? JSON.parse(storedData) : [];
}

function createElements(todo) {
  const li = document.createElement("li");
  const div = document.createElement("div");
  div.innerText = todo.task;

  const delBtn = document.createElement("button");
  delBtn.innerText = "x";
  delBtn.classList.add("del-btn");

  delBtn.addEventListener("click", () => Todo.deleteTodo(todo.id));

  li.appendChild(div);
  li.append(delBtn);
  editTask(div, todo);

  return li;
}

function editTask(div, todo) {
  div.addEventListener("dblclick", () => {
    const input = document.createElement("input");
    input.type = "text";
    input.classList = "edit";
    input.value = div.innerText;

    div.replaceWith(input);
    input.focus();

    input.addEventListener("blur", () => {
      replaceInput(input, todo);
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        replaceInput(input, todo);
      }
    });
  });
}

function replaceInput(input, todo) {
  const updateText = input.value.trim();

  if (updateText === "") return;

  let todos = getFromLocalStorage();
  const updateTodos = todos.map((i) =>
    i.id === todo.id ? { ...i, task: updateText } : i
  );
  addToLocalStorage(updateTodos);

  renderTodos();
}

function listStyle() {
  let todos = getFromLocalStorage();
  if (todos.length > 0) {
    list.classList.add("notEmpty");
    list.classList.remove("empty");
  } else {
    list.classList.add("empty");
    list.classList.remove("notEmpty");
  }
}

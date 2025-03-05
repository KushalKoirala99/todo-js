const todoInput = document.querySelector('#todoTask');
const btnAdd = document.querySelector(`#addBtn`);
const list = document.querySelector(`#todoList`);




class Todo {
    constructor(task){
        this.task = task;
        this.id = crypto.randomUUID();
    }

    static deleteTodo(id){
        const todoArray = getFromLocalStorage();
        const updatedArray = todoArray.filter(todo => todo.id !== id);
        addToLocalStorage(updatedArray);
        renderTodos();
    }
}

let userInput = '';



btnAdd.addEventListener('click',()=>{
    if(userInput !== ""){
        addTodo(userInput);
        todoInput.value = "";
        renderTodos()
    }
});

document.addEventListener('DOMContentLoaded', renderTodos);

todoInput.addEventListener('change',(e) => {
      userInput =  e.target.value;
})


 function addTodo (task){
    const todo = new Todo(task);
    const todoArray = getFromLocalStorage();
    todoArray.push(todo);
    addToLocalStorage(todoArray);
 }


 function renderTodos(){
     list.innerHTML = "";
     let todos = getFromLocalStorage()
     todos.map((item) =>{
      let todoElement = createElements(item);
      list.appendChild(todoElement);
     })
 }

 function addToLocalStorage(item){
return localStorage.setItem('todos',JSON.stringify(item))
 }

 function getFromLocalStorage(){
    const storedData = localStorage.getItem('todos');
    return storedData ? JSON.parse(storedData) : [];
 };


 function createElements(todo){
   const li = document.createElement('li');
   li.innerText = todo.task;

   const delBtn = document.createElement('button');
   delBtn.innerText = 'x';
   delBtn.classList.add('del-btn')

   delBtn.addEventListener('click', () => Todo.deleteTodo(todo.id))
   li.append(delBtn);

   return li
 }
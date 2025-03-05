const todoInput = document.querySelector('#todoTask');
const btnAdd = document.querySelector(`#addBtn`);
const list = document.querySelector(`#todoList`);




class Todo {
    constructor(task){
        this.task = task;
        this.id = crypto.randomUUID();
    }
}

let todoArray = [];
let userInput = '';



btnAdd.addEventListener('click',()=>{
    if(userInput !== ""){
        addTodo(userInput);
        todoInput.value = "";
        addToLocalStorage(todoArray);
        renderTodos()
    }
});

todoInput.addEventListener('change',(e) => {
      userInput =  e.target.value;
})


 function addTodo (task){
    todoArray.push(new Todo(task));
 }


 function renderTodos(){
     list.innerHTML = "";
     let todos = getFromLocalStorage(todoArray)
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
   li.append(delBtn);

   return li
 }
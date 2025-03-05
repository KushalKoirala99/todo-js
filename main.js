const todoInput = document.querySelector('#todoTask');
const btnAdd = document.querySelector(`#addBtn`);
const list = document.querySelector(`#todoList`);




class Todo {
    constructor(task){
        this.task = task;
        this.id = crypto.randomUUID();
    }
}

let todoList = [];
let userInput = '';



btnAdd.addEventListener('click',()=>{
    if(userInput !== ""){
        addTodo(userInput);
        userInput = "";
    }
});

todoInput.addEventListener('change',(e) => {
      userInput =  e.target.value;
      e.target.value = "";
})


 function addTodo (task){
    todoList.push(new Todo(task));
    renderTodos();
 }


 function renderTodos(){
     list.innerHTML = "";
     todoList.map((item) =>{
        let li = document.createElement("li");
        let delBtn = document.createElement('button');

        delBtn.innerText = 'X';
        delBtn.classList = 'del-btn';
        console.dir(delBtn);
        li.innerText = item.task;

        li.append(delBtn)
        list.appendChild(li);
     })
 }
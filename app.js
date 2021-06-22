const todos = document.querySelectorAll(".todo");
const allStatus = document.querySelectorAll(".status");
const addBtn = document.querySelector("#add-btn");
const backdrop = document.querySelector(".backdrop");
const modal = document.querySelector(".modal");
const modalCloser = document.querySelector(".close-modal");
const addedTodo = document.querySelector("#added-todo");
const plannerTitles = document.querySelector(".planner-header__titles");


let draggableTodo = null;
// event listeners


allStatus.forEach((status) => {
    status.addEventListener("dragover", dragOver);
    status.addEventListener("dragenter", dragEnter);
    status.addEventListener("dragleave", dragleave);
    status.addEventListener("drop", dragDrop);
})

addBtn.addEventListener("click", showModal);
modalCloser.addEventListener("click", closeModal);
backdrop.addEventListener("click", closeModal);
addedTodo.addEventListener("keyup", (e) => {
    if (e.which === 13) {
        addTodo();
    }
})

//variables

let todoList = {};


// functions


function dragStart() {
    draggableTodo = this;
    console.log('drag started');
}


function dragEnd() {
    draggableTodo = null;
    console.log('drag ended');
}

function dragOver(e) {
    e.preventDefault();
    console.log("drag over");
}

function dragEnter() {
    this.style.border = "2px deeppink solid";
    console.log("drag enter");
}

function dragleave() {
    this.style.border = "none";
    console.log("drag leave");
    let classes = ["not-started", "in-progress", "completed"];
    classes.forEach((classname) => {
        draggableTodo.classList.remove(classname);
    })
}

function dragDrop() {
    this.style.border = "none";
    this.appendChild(draggableTodo);
    console.log("target dropped");
    switch(this.id) {
        case "created-todo":
            draggableTodo.setAttribute("id", 0);
            console.log(draggableTodo.innerText);
            todoList[draggableTodo.innerText] = 0;
            break;
        case "not-started":
            draggableTodo.classList.add("not-started");
            draggableTodo.setAttribute("id", 1);
            console.log(draggableTodo.id);
            todoList[draggableTodo.innerText] = 1;
            saveTodos();
            break;
        case "in-progress":
            draggableTodo.classList.add("in-progress");
            draggableTodo.setAttribute("id", 2);
            todoList[draggableTodo.innerText] = 2;
            saveTodos();
            break;
        case "completed":
            draggableTodo.classList.add("completed");
            draggableTodo.setAttribute("id", 3);
            todoList[draggableTodo.innerText] = 3;
            saveTodos();
            break;
    }
}

function showModal() {
    modal.classList.add("slide");
    backdrop.style.display = "block";
}

function closeModal() {
    modal.classList.remove("slide");
    backdrop.style.display = "none";
}


// adding a todo

function addTodo(task) {
    if (task !== "") {
        const todoItem = document.createElement("div");
        todoItem.setAttribute("class", "todo");
        
        todoItem.setAttribute("draggable", "true");
        todoItem.innerText = task;
        todoItem.addEventListener("dragstart", dragStart);
        todoItem.addEventListener("dragend", dragEnd);
        const todoRemove = document.createElement("span");
        todoRemove.setAttribute("class", "close"); 
        todoRemove.innerText = "X"; 
        todoRemove.addEventListener("click", removeTodo);
        todoItem.appendChild(todoRemove);
        allStatus[todoItem.id].appendChild(todoItem);
        todoList[addedTodo.value ]= todoItem.id;
        console.log(todoList);
        saveTodos();
        addedTodo.value = "";
    }
}

function removeTodo() {
    let itemName = this.parentElement.innerText.toString();
    todoList.delete(itemName);
    localStorage.setItem("todoList", JSON.stringify(savedTodoList));
    this.parentElement.remove();
}

function saveTodos() {
    if (localStorage.length !== 0) {
        localStorage.removeItem("todoList");
    }else
    {
        localStorage.setItem("todoList", JSON.stringify(todoList));
    }
}

function renderTodos() {
    let savedTodoList = JSON.parse(localStorage.getItem("todoList"));
    if (allStatus[0].childElementCount <= 2 && savedTodoList !== null) {
        for (keys in savedTodoList) {
            addTodo(keys);
        }
    }
}

renderTodos();
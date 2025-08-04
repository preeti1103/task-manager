//when loading the page load from local storage
// create a new array, array with no value or empty array
const todoList = JSON.parse(localStorage.getItem('todoList')) || [];

renderTodoList()

function renderTodoList() { //render = display
    let todoListHTML = [];

    todoList.forEach((todoObject, index) => {
        //const name = todoObject.name;
        //const dueDate = todoObject.dueDate;
        const { name, dueDate } = todoObject;

        //generating html using js 1st save the dta 2nd use the data to genreate html 3rd make website interactive this is main idea of js
        const html = `
    <div class="todo-item">
        <div class="todo-name">${name}</div>
        <div class="todo-date">${dueDate}</div>
        <button class="delete-todo-button js-delete-todo-button">X</button>
    </div>`;

        todoListHTML += html;
    });

    document.querySelector('.js-todo-list').innerHTML = todoListHTML;


    //delete button
    document.querySelectorAll('.js-delete-todo-button').forEach((deleteButton, index) => {
        deleteButton.addEventListener('click', () => {
            todoList.splice(index, 1);
            renderTodoList();
            saveToStorage();
        });
    });
}

//add button
document.querySelector('.js-add-todo-button').addEventListener('click', () => {
    addTodo();
});

//keyboard support
document.querySelector('.js-name-input').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addTodo();
    }
});


function addTodo() {
    const inputElement = document.querySelector('.js-name-input'); //get text from txtbox using doc.querysel and store it in var
    const name = inputElement.value.trim(); // we need inside value so .value now we will get inside and save it inside a var

    const dateInputElement = document.querySelector('.js-due-date-input');
    const dueDate = dateInputElement.value;

    if (!name) {
        alert('Please enter a task name');
        return;
    }

    if (!dueDate) {
        alert('Please select a due date');
        return;
    }

    // now we add the name to our array
    todoList.push({
        // name: name, dueDate: dueDate same as below
        name, dueDate
    });

    inputElement.value = ''; // every time it will disappear and we can write new thing
    dateInputElement.value = '';

    renderTodoList();
    saveToStorage();
}

function saveToStorage() {
    localStorage.setItem('todoList', JSON.stringify(todoList));
}
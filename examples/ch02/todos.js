const todos = ["Walk the dog", "Water the plant", "Sand the chairs"];

const addTodoInput = document.getElementById("todo-input");
const addTodoButton = document.getElementById("add-todo-btn");
const todosList = document.getElementById("todos-list");

for(const todo of todos) {
    todosList.append(renderTodoInReadMode(todo));
}

addTodoInput.addEventListener('input', () => {
    addTodoButton.disabled = addTodoInput.value.length < 3
});
addTodoInput.addEventListener('keydown', ({key}) => {
    if (key === 'Enter' && addTodoInput.value.length >= 3) {
        addTodo();
    }
});
addTodoButton.addEventListener('click', () => {addTodo();});

function renderTodoInReadMode(todo) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = todo;
    span.addEventListener('dblclick', () => {
        const idx = todos.indexOf(todo);
        todosList.replaceChild(renderTodoInEditMode(todo), todosList.childNodes[idx+1]);
    });
    li.append(span);

    const doneButton = document.createElement('button');
    doneButton.textContent = 'Done';
    doneButton.addEventListener('click', () => {
        const idx = todos.indexOf(todo);
        removeTodo(idx);
    });
    li.append(doneButton);
    return li;
}

function renderTodoInEditMode(todo) {
    const li = document.createElement('li');
    const input = document.createElement('input');
    input.type = 'text';
    input.value = todo;
    li.append(input);

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.addEventListener('click', () => {
        const idx = todos.indexOf(todo);
        updateTodo(idx, input.value);
    });
    li.append(saveButton);

    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.addEventListener('click', () => {
        const idx = todos.indexOf(todo);
        todosList.replaceChild(
            renderTodoInReadMode(todos[idx]), 
            todosList.childNodes[idx+1]
        );
    });
    li.append(cancelButton);
    return li;
}

function addTodo() {
    const todo = addTodoInput.value;
    todos.push(todo);
    const newTodo = renderTodoInReadMode(todo);
    todosList.append(newTodo);
    addTodoInput.value = '';
    addTodoButton.disabled = true;
}

function removeTodo(idx) {
    todos.splice(idx, 1);
    todosList.childNodes[idx+1].remove();
}

function updateTodo(idx, newValue) {
    todos[idx] = newValue;
    todosList.replaceChild(renderTodoInReadMode(newValue), todosList.childNodes[idx+1]);
}
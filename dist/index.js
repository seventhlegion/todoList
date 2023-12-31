"use strict";
const todoList = [];
function formatDate(timestamp) {
    const date = new Date(timestamp);
    const timeString = date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
    });
    const dateString = date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
    return `${timeString} - ${dateString}`;
}
function renderTodoList() {
    const list = document.getElementById('todo-list');
    list.innerHTML = '';
    todoList.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <h3 class="item-title ${item.done ? 'done' : ''}">${item.title}</h3>
            <p class="item-description">${item.description}</p>
            <div class="btn-section">
            <span>${formatDate(item.lastUpdateDate)}</span>
            <button class="toggle-btn">${item.done ? 'Undo' : 'Done'}</button>
            <button class="remove-btn">Remove</button>
            </div>
    `;
        li.querySelector('.toggle-btn').addEventListener('click', () => toggleTodoItem(index));
        li.querySelector('.remove-btn').addEventListener('click', () => removeTodoItem(index));
        list.appendChild(li);
    });
}
function addTodoItem(title, description) {
    const now = Date.now();
    const newItem = {
        title,
        description,
        done: false,
        creationDate: now,
        lastUpdateDate: now,
    };
    todoList.push(newItem);
    renderTodoList();
}
function toggleTodoItem(index) {
    todoList[index].done = !todoList[index].done;
    todoList[index].lastUpdateDate = Date.now();
    renderTodoList();
}
function removeTodoItem(index) {
    todoList.splice(index, 1);
    renderTodoList();
}
document.getElementById('add-btn').addEventListener('click', () => {
    const titleInput = document.getElementById('title');
    const descriptionInput = (document.getElementById('description'));
    const title = titleInput.value;
    const description = descriptionInput.value;
    if (title && description) {
        addTodoItem(title, description);
        titleInput.value = '';
        descriptionInput.value = '';
    }
});
renderTodoList();

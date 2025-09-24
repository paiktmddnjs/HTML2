let todos = [];  // 변경: const → let

const todoList = document.getElementById('todo-list'); // 할일 목록 ul
const clearCompletedBtn = document.getElementById('clear-completed-btn'); // 완료 목록 삭제 버튼
const todoInput = document.getElementById('todo-input'); // todo 입력창

function init() {
    bindEvents();
    render();
}

function bindEvents() {
    const addBtn = document.getElementById('todo-add-btn');
    addBtn.addEventListener('click', addTodo);

    todoInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            addTodo();
        }
    });

    clearCompletedBtn.addEventListener('click', clearCompletedTodos); // 오타 수정
}

function clearCompletedTodos() {
    let newTodos = [];

    for (let todo of todos) {
        if (!todo.completed) {
            newTodos.push(todo);
        }
    }

    todos = newTodos;
    render();
}

function addTodo() {
    const text = todoInput.value.trim();
    if (!text) return;

    const todo = {
        id: Date.now(),
        content: text,  // 오타 수정
        completed: false,
        createdAt: new Date().toLocaleString()
    };

    todos.push(todo);
    todoInput.value = "";
    render();
}

function deleteTodo(id) {
    let newTodo = [];

    for (let todo of todos) {
        if (todo.id === id) continue;
        newTodo.push(todo);
    }

    todos = newTodo;
    render();
}

function toggleTodo(id) {
    for (let todo of todos) {
        if (todo.id === id) {
            todo.completed = !todo.completed;
            break;
        }
    }
    render();
}

function render() {
    todoList.innerHTML = "";

    if (todos.length === 0) {
        emptyStateRender();
    } else {
        todos.forEach(function (todo) {
            todoItemRender(todo);
        });
    }

    updateCount();
    updateClearButton();
}

function emptyStateRender() {
    const emptyEl = document.createElement('div');
    emptyEl.className = 'empty-state';
    emptyEl.innerHTML = '할 일이 없습니다.';
    todoList.appendChild(emptyEl);
}

function todoItemRender(todo) {
    const todoItem = document.createElement('li');
    todoItem.className = 'todo-item' + (todo.completed ? ' completed' : '');

    todoItem.innerHTML = `
        <div class="todo-checkbox ${todo.completed ? 'checked' : ''}"></div>
        <span>${todo.content}</span>
        <button class="delete-btn">삭제</button>
    `;

    const checkBox = todoItem.querySelector('.todo-checkbox');
    checkBox.addEventListener('click', function () {
        toggleTodo(todo.id);
    });

    const deleteBtn = todoItem.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', function () {
        deleteTodo(todo.id);
    });

    todoList.appendChild(todoItem);
}

function updateCount() {
    const todoCount = document.getElementById('todo-count');
    let count = 0;

    for (let todo of todos) {
        if (!todo.completed) count++;
    }

    todoCount.innerHTML = `${count}개 남음`;
}

function updateClearButton() {
    let isView = 'none';

    for (let todo of todos) {
        if (todo.completed) {
            isView = 'block';
            break;
        }
    }

    clearCompletedBtn.style.display = isView;
}

document.addEventListener('DOMContentLoaded', init);

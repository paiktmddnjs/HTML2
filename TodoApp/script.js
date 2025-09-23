let todos = [];

const todoList = document.getElementById('todo-list');
const clearCompletedBtn = document.getElementById('clear-completed-btn');
const todoInput = document.getElementById('todo-input');

function init() {
    bindEvents();
    render();
}


function bindEvents() {
    const addBtn = document.getElementById('todo-add-btn');
    addBtn.addEventListener('click', addTodo); // 버튼이 눌리면 addTodo 실행

    todoInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            addTodo(); // 엔터 입력 시 addTodo 실행
        }
    });

    clearCompletedBtn.addEventListener('click', clearCompletedTodos); 
}

// 새로운 할 일 추가
function addTodo() {
    const text = todoInput.value.trim();
    if (!text) return;

    const todo = {
        id: Date.now(),
        content: text,
        completed: false,
        createAt: new Date().toLocaleString(),
    };
    todos.push(todo);
    todoInput.value = "";
    render();
}

// 화면 다시 그리기
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

function todoItemRender(todo) {
    const todoItem = document.createElement('li');
    todoItem.className = 'todo-item' + (todo.completed ? ' completed' : '');

    todoItem.innerHTML = `
        <div class="todo-checkbox ${todo.completed ? 'checked' : ''}"></div>
        <span>${todo.content}</span>
        <button class="delete-btn">삭제</button>`;

    // 체크박스 클릭
    const checkBox = todoItem.querySelector('.todo-checkbox');
    checkBox.addEventListener('click', function () {
        toggleTodo(todo.id);
    });

    // 삭제 버튼 클릭
    const deleteBtn = todoItem.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', function () {
        deleteTodo(todo.id);
    });

    todoList.appendChild(todoItem);
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

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    render();
}

function deleteTodo(id){
    //해당 ID를 목록에서 제거.
    let newTodo = [];
    for(let todo of todos){
        if(todo.id === id)
            continue;

        newTodo.push(todo);
    }

    todos = newTodo;
    render(); //할일목록을 기준으로 UI에 적용
}

function emptyStateRender() {
    const emptyEl = document.createElement('div');
    emptyEl.className = 'empty-state';
    emptyEl.innerHTML = '할 일이 없습니다.';
    todoList.appendChild(emptyEl);
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

function clearCompletedTodos(){
    let newTodos = [];

    for(let todo of todos){
        if(!todo.completed) {
            newTodos.push(todo); //완료되지 않은 목록만 추가
        }
    }

    todos = newTodos;
    render(); //화면 업데이트
}


document.addEventListener('DOMContentLoaded', init);
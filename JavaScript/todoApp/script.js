//====== 전역 변수 ========
//할일 목록을 저장하는 배열 - 여러 함수에서 공유해야 하기 떄문에 전역 선언
let todos = [];

// ====== DOM 요소 ========
const todoList = document.getElementById('todo-list'); //할일목록 ul
const clearCompletedBtn = document.getElementById('clear-completed-btn'); //완료목록삭제버튼
const todoInput = document.getElementById('todo-input'); //todo입력창


// ===== 초기화 함수 ========
//웹이 시작될 때 실행되는 기본함수
//이벤트 등록과 화면 렌더링을 담당
function init() {
    bindEvents();
    render();
}

function bindEvents() {
    const addBtn = document.getElementById('todo-add-btn');
    addBtn.addEventListener('click', addTodo);

    todoInput.addEventListener('keydown', function(e){
        if(e.key === 'Enter'){
            addTodo();
        }
    })

    clearCompletedBtn.addEventListener('click', clearCompletedTodos);
}

//=========== 데이터 조작 함수 =======================
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

//새로운 할일을 추가하는 함수
function addTodo() {
    const text = todoInput.value.trim();
    if (!text) return; //빈문자열이면 함수 종료

    const todo = {
        id: Date.now(), //현재시간을 ms단위로 변환 -> 고유한 ID로 사용
        content: text,
        completed: false,
        createdAt: new Date().toLocaleString(), //생성시간
    }

    todos.push(todo); //새로운 할일을 목록에 추가
    todoInput.value = "";
    console.log(todos);
    render(); //할일목록을 기준으로 UI에 적용
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

function toggleTodo(id){
    //해당 ID를 통해서 할일을 찾아 완료상태 -> 미완료, 미완료 -> 완료 변경.
    for(let todo of todos){
        if(todo.id === id) {
            todo.completed = !todo.completed;
            break;
        }
    }

    render();
}

//=========== 화면 렌더링을 위한 함수 ====================
//메인 렌더링 함수
function render() {
    todoList.innerHTML = ""; //기존 UI 제거

    if (todos.length === 0) { //할일목록이 비어있다면
        emptyStateRender();
    } else { //할일 목록이 있는 경우
        todos.forEach(function (todo) {
            todoItemRender(todo);
        })
    }

    updateCount();
    updateClearButton();
}

function emptyStateRender(){
   const emptyEl = document.createElement('div');
    emptyEl.className = 'empty-state';
    emptyEl.innerHTML = '할 일이 없습니다.'
    todoList.appendChild(emptyEl);
}

function todoItemRender(todo) {
    const todoItem = document.createElement('li');
    todoItem.className = 'todo-item' + (todo.completed ? ' completed' : '');

    todoItem.innerHTML = `<div class="todo-checkbox ${todo.completed ? 'checked' : ''}"></div>
                            <span>${todo.content}</span>
                            <button class="delete-btn">삭제</button>`;

    //새로 생성된 요소들 중에서 이벤트가 필요한 부분만 가져오기.
    const checkBox = todoItem.querySelector('.todo-checkbox'); //todoItem내부에 있는 checkbox요소
    checkBox.addEventListener('click', function(){
        toggleTodo(todo.id);
    })

    const deleteBtn = todoItem.querySelector('.delete-btn'); //todoItem내부에 있는 deleteBtn요소
    deleteBtn.addEventListener('click', function(){
        deleteTodo(todo.id);
    })
    todoList.appendChild(todoItem);
}

//남은 할일의 갯수를 구해서 화념넹 업데이트.
function updateCount(){
    const todoCount = document.getElementById('todo-count');
    let count = 0;
    for(let todo of todos){
       if(!todo.completed) count++;
    }

    todoCount.innerHTML = `${count}개 남음`;
}

function updateClearButton(){
    let isView = 'none';
    for(let todo of todos){
       if(todo.completed) {
            isView = 'block';
            break;
       }
    }

    //완료된 목록이 있다면 버튼 표시, 없으면 숨김
    clearCompletedBtn.style.display = isView;
}


//========= load 이벤트 함수 ==================
// window.onload = function(){
//     init();
// }

//DOMContentLoaded -> HTML이 전부 로드되어 DOM트리가 완성되면 실행
document.addEventListener('DOMContentLoaded', init);
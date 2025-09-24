
let todos = [];

const List = document.getElementById('todo-list');
const outputRadios = document.querySelectorAll('input[name="type2"]');
const InputContent = document.getElementById('expense-content');
const InputAmount = document.getElementById('expense-amount');
const showexpense = document.getElementsByClassName('expense');
const showbalance = document.getElementsByClassName('balance');


function init() {

    bindEvent();
    render();
}


function bindEvent() {

    const addBtn = document.getElementById('todo-add-btn');
    addBtn.addEventListener('click', addTodo);

    outputRadios.forEach(function (radio) {
        radio.addEventListener('change', render);
    });

}

function addTodo() {
    const text1 = InputContent.value.trim();
    const text2 = InputAmount.value.trim();
    const option = document.querySelector('input[name="type1"]:checked')?.value || null;


    if (!text1 || !text2) return;

    const todo = {
        id: Date.now(),
        content: text1,
        amount: text2,
        type: option,
        date: new Date().toLocaleString(),
    };



    todos.push(todo);
    InputContent.value = "";
    InputAmount.value = "";
    console.log(todos);
    render();
}

function render() {
    List.innerHTML = "";

    if (todos.length === 0) {
        emptyStateRender();
    } else { //할일 목록이 있는 경우
        const filter = document.querySelector('input[name="type2"]:checked')?.value || "all";

        todos.forEach(function (todo) {
            if (filter === "all" || todo.type === filter) {
                todoItemRender(todo);
            }
        })
    }

    showSummary();
}

function todoItemRender(todo) {
    const todoItem = document.createElement('li');
    todoItem.className = 'todo-item';

    todoItem.innerHTML = `
    <div id="todo-item-content">
    <div class="date">${todo.date}</div> 
    <span>${todo.content}</span>
    <div> 
    
    <div id="todo-item-money"><span>${todo.type === "income" ? "+" : "-"}${Number(todo.amount).toLocaleString()}원 &nbsp;&nbsp;</span>
    <button class="delete-btn">삭제</button>
    </div>`;


    // 삭제 버튼 클릭
    const deleteBtn = todoItem.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', function () {
        deleteTodo(todo.id);
    });

    List.appendChild(todoItem);
}

function deleteTodo(id) {
    //해당 ID를 목록에서 제거.
    let newTodo = [];
    for (let todo of todos) {
        if (todo.id === id)
            continue;

        newTodo.push(todo);
    }

    todos = newTodo;
    render(); //할일목록을 기준으로 UI에 적용
}


function showSummary() {
    let incomeSum = 0;
    let expenseSum = 0;

    // 수입인진 지출인지에 따른 todo 판별
    for (let todo of todos) {
        if (todo.type === "income") {
            incomeSum += Number(todo.amount);
        } else if (todo.type === "expense") {
            expenseSum += Number(todo.amount);
        }
    }

    // 요소 선택 (querySelector 권장)
    const incomeEl = document.querySelector('.showincome');
    const expenseEl = document.querySelector('.showexpense');
    const balanceEl = document.querySelector('.showbalance');
    const balanceHead = document.querySelector('.headbalance')

    // 값 반영
    if (incomeEl) incomeEl.textContent = incomeSum.toLocaleString() + "원";
    if (expenseEl) expenseEl.textContent = expenseSum.toLocaleString() + "원";
    if (balanceEl) {
        balanceEl.textContent = (incomeSum - expenseSum).toLocaleString() + "원";

        balanceHead.textContent = balanceEl.textContent;
    }


}



function emptyStateRender() {
    const emptyEl = document.createElement('div');
    emptyEl.className = 'empty-state';
    emptyEl.innerHTML = '항목이 없습니다.'
    List.appendChild(emptyEl);
}


document.addEventListener('DOMContentLoaded', init);
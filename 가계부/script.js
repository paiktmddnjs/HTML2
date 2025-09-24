

let todos = []; //todo 객체를 담을 배열이다.

const List = document.getElementById('todo-list');
const outputRadios = document.querySelectorAll('input[name="type2"]');
const InputContent = document.getElementById('input-content');
const InputAmount = document.getElementById('input-amount');
const showexpense = document.getElementsByClassName('expense');
const showbalance = document.getElementsByClassName('balance');


function init() {

    bindEvent();
    render();
}


function bindEvent() { // 추가버튼에 대한 이벤트와 라디오버튼 상태에 따른 이벤트를 설정해준다.

    const addBtn = document.getElementById('todo-add-btn'); // 추가버튼에 대한 클릭 이벤트이다.
    addBtn.addEventListener('click', addTodo);

    outputRadios.forEach(function (radio) { //type2에 대한 라디오 요소들에 대해 라디오 버튼의 상태가 바뀔때마다 render를 실행한다. 
        radio.addEventListener('change', render);
    });

}

// "추가하기"버튼을 누를시 실행한다.
function addTodo() {
    const text1 = InputContent.value.trim(); //내용 값을 가져와 저장해준다.
    const text2 = InputAmount.value.trim(); //금액 값을 가져와 저장해준다.
    const option = document.querySelector('input[name="type1"]:checked')?.value || null;
    // type1의 체크된 요소의 값에 대해 값이 있으면 value를 가져오고 null이면 null로 가져와 저장한다.

    if (!text1 || !text2) return; // 아무것도 입력하지 않으면 진행되지 않는다.

    const todo = { // list 안의 하나의 객체
        id: Date.now(), // 날짜로 고유번호 설정
        content: text1, // 내용에 대한 저장
        amount: text2, // 금액에 대한 저장
        type: option, // 수입/지출 타입에 대해 결정
        date: new Date().toLocaleString(),
    };



    todos.push(todo);
    InputContent.value = ""; // 입력 필드를 비운다.
    InputAmount.value = "";
    console.log(todos);
    render();
}

// 화면을 재구성한다.
function render() {
    List.innerHTML = ""; // 리스트를 비운다.

    if (todos.length === 0) { //todos에 객체가 존재하지 않으면 emptyStateRender()을 호츨한다.
        emptyStateRender();
    } else { //todos에 객체가 존재하는 경우 (목록이 있는 경우)

        // type2의 체크된 요소의 값이 존재하면 그 값을 불러와 저장하거나 없으면 "all"을 반환한다.  
        const filter = document.querySelector('input[name="type2"]:checked')?.value || "all";

        todos.forEach(function (todo) { // forEach로 todos배열의 객체들에 대해 하나씩 순환하며 진행한다.

            // all이 체크되있거나 수입/지출이 체크되있으면 호출한다.
            if (filter === "all" || todo.type === filter) {
                todoItemRender(todo);
            }
        })
    }

    showSummary(); // 총 수입, 지출, 총액을 보여주는 메소드이다.
}

function todoItemRender(todo) { // List에 대한 아이템들을 생성해준다.

    const todoItem = document.createElement('li'); // li요소를 생성한다.
    todoItem.className = 'todo-item';

    // 두개의 div를 만들어준후 첫번째에는 추가시점 날짜와 내용을 두번째에는 추가한 금액과 삭제 버튼을 만들어주었다.
    todoItem.innerHTML = `
    <div class="todo-item-content">
    <div id="date">${todo.date}</div>
    <span>${todo.content}</span>
    </div>
    
    <div id="todo-item-balance">
    <span style="color: ${todo.type === "income" ? "green" : "red"};">${todo.type === "income" ? "+ " : "- "}${Number(todo.amount).toLocaleString()}원 &nbsp;&nbsp;</span>
    <button class="delete-btn">삭제</button>
    </div>`;


    // 삭제 버튼 클릭
    const deleteBtn = todoItem.querySelector('.delete-btn');

    deleteBtn.addEventListener('click', function () {
        deleteTodo(todo.id);
    });

    List.appendChild(todoItem); // record-list에 대한 자식 요소로 todoItem을 추가해준다.
}

function deleteTodo(id) {
    //해당 ID를 목록에서 제거.
    let newTodo = [];

    for (let todo of todos) { // todos배열을 순회한다.
        if (todo.id === id) // 삭제할 id랑 같으면 continue로 해당 객체를 제외한다.
            continue;

        newTodo.push(todo); // 새로만든 배열에 추가한다.
    }

    todos = newTodo; // todos를 초기화시켜준다.
    render();
}


function showSummary() { //추가한 수입/지출/잔액을 계산하여 보여주는 역할이다.
    let incomeSum = 0;
    let expenseSum = 0;

    // 수입인진 지출인지에 따른 todo 판별한후 해당 타입에 맞게 금액을 더해준다.
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

        balanceHead.textContent = balanceEl.textContent; //header 부분의 잔액표시에도 값을 전달한다.
    }


}



function emptyStateRender() { //todos에 아무것도 존재하지 않으면 '항목없음'표시를 해준다.
    const emptyEl = document.createElement('div');
    emptyEl.className = 'empty-state';
    emptyEl.innerHTML = '항목이 없습니다.'
    List.appendChild(emptyEl);
}


document.addEventListener('DOMContentLoaded', init); //페이지가 로드된 직후 init 함수를 호출합니다.
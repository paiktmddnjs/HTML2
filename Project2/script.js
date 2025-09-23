//------------------------ 슬라이드 쇼 구현 -------------------------------

const container = document.getElementById("container");
const totalSections = document.querySelectorAll(".section").length;
let currentIndex = 0;
let isScrolling = false;

function scrollToSection(index) {
  if (index < 0 || index >= totalSections) return;

  isScrolling = true;
  currentIndex = index;
  container.style.transform = `translateY(-${index * 100}vh)`;

  setTimeout(() => {
    isScrolling = false;
  }, 700); // transition과 동일하거나 살짝 더 긴 시간
}

window.addEventListener("wheel", (e) => {
  if (isScrolling) return;

  if (e.deltaY > 0) {
    scrollToSection(currentIndex + 1);
  } else if (e.deltaY < 0) {
    scrollToSection(currentIndex - 1);
  }
});

// 초기 진입 시 맨 위로
scrollToSection(0);

//----------- 오목 테이블 생성 ------------------

const table = document.getElementById("Gomoku-area");
const size = 15;

for (let i = 0; i < size; i++) {
  const row = document.createElement("tr");

  for (let j = 0; j < size; j++) {
    const cell = document.createElement("td");
    // (선택) 좌표나 스타일 지정 가능
    cell.dataset.row = i;
    cell.dataset.col = j;

    cell.style.width = "40px";
    cell.style.height = "40px";
    cell.style.border = "1px solid black";
    cell.style.textAlign = "center";
    cell.style.verticalAlign = "middle";
    cell.style.position = "relative";


    const stone = document.createElement("div");
    stone.className = "stone";
    stone.style.width = "27px";
    stone.style.height = "27px";
    stone.style.border = "1px solid black";
    stone.style.borderRadius = "20%";
    stone.style.margin = "auto";


    row.appendChild(cell);
    cell.appendChild(stone);
  }

  table.appendChild(row);
}




let currentPlayer = "black";  // 변수명 수정

table.addEventListener("click", function (e) {
  const cell = e.target.closest("td");


  const row = parseInt(cell.dataset.row);
  const col = parseInt(cell.dataset.col);

  if (checkWin(row, col, currentPlayer)) {
    alert(`${currentPlayer === "black" ? "흑" : "백"}돌 승리!`);
    table.removeEventListener("click", arguments.callee); // 게임 종료
  }
  if (!cell) return;

  const stone = cell.querySelector(".stone");
  if (!stone) return;

  // 이미 돌이 놓였으면 무시
  if (stone.classList.contains("black") || stone.classList.contains("white")) return;

  // 현재 플레이어 색상 적용
  stone.classList.add(currentPlayer);

  // 다음 플레이어로 변경
  currentPlayer = currentPlayer === "black" ? "white" : "black";


});

function checkWin(row, col, color) {
  const directions = [
    { dr: 0, dc: 1 },   // →
    { dr: 1, dc: 0 },   // ↓
    { dr: 1, dc: 1 },   // ↘
    { dr: 1, dc: -1 },  // ↙
  ];

  for (const { dr, dc } of directions) {
    let count = 1;

    // 한 방향으로 연속 돌 세기
    count += countStones(row, col, dr, dc, color);
    // 반대 방향으로도 세기
    count += countStones(row, col, -dr, -dc, color);

    if (count >= 5) {
      return true;
    }
  }

  return false;
}

function countStones(row, col, dr, dc, color) {
  let count = 0;
  let r = row + dr;
  let c = col + dc;

  while (r >= 0 && r < size && c >= 0 && c < size) {
    const nextCell = table.rows[r].cells[c];
    const stone = nextCell.querySelector(".stone");

    if (stone && stone.classList.contains(color)) {
      count++;
      r += dr;
      c += dc;
    } else {
      break;
    }
  }

  return count;
}


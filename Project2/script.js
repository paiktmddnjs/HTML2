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

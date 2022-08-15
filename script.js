const 카드묶음 = document.querySelectorAll(".memory-card");
const 카드판 = document.querySelector(".memory-game");
const 모달 = document.querySelector(".modal");
const 재시작버튼 = document.querySelector(".resetButton");

let 카드뒤집힌상태 = false;
let 첫번째카드, 두번째카드;
let 보드잠금 = false;
let 카드매칭횟수 = 0;

카드묶음.forEach((카드) => {
  카드.addEventListener("click", 카드뒤집기);
});

function 카드뒤집기() {
  if (보드잠금) return;
  if (this === 첫번째카드) return;

  this.classList.add("flip");

  if (!카드뒤집힌상태) {
    카드뒤집힌상태 = true;
    첫번째카드 = this;

    return;
  }
  카드뒤집힌상태 = false;
  두번째카드 = this;

  같은카드인가();
}

function 같은카드인가() {
  let 카드일치여부 = 첫번째카드.dataset.framework === 두번째카드.dataset.framework;

  if (카드일치여부) 카드매칭횟수++;

  if (카드매칭횟수 > 0 && 카드매칭횟수 === 6) {
    모달.style.display = "inline-block";
    카드판.style.opacity = 0;
  }

  console.log(카드매칭횟수);

  카드일치여부 ? 카드비활성화() : 카드불일치();
}

function 카드비활성화() {
  첫번째카드.removeEventListener("click", 카드뒤집기);
  두번째카드.removeEventListener("click", 카드뒤집기);

  보드초기화();
}

function 카드불일치() {
  보드잠금 = true;

  setTimeout(() => {
    첫번째카드.classList.remove("flip");
    두번째카드.classList.remove("flip");

    보드초기화();
  }, 1500);
}

function 보드초기화() {
  [카드뒤집힌상태, 보드잠금] = [false, false];
  [첫번째카드, 두번째카드] = [null, null];
}

function 카드섞기() {
  카드묶음.forEach((카드) => {
    let 랜덤위치 = Math.floor(Math.random() * 12);
    카드.style.order = 랜덤위치;

    console.log("랜덤위치: " + 랜덤위치);
    카드매칭횟수 = 0;
  });
}

재시작버튼.addEventListener("click", () => {
  모달.style.display = "none";
  카드판.style.opacity = 1;

  카드묶음.forEach((카드) => {
    카드.classList.remove("flip");

    보드초기화();
  });

  카드묶음.forEach((카드) => {
    카드.addEventListener("click", 카드뒤집기);
  });

  카드섞기();
});

카드섞기();

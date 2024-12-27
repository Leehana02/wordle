const 정답 = "APPLE";

let attempts = 0;
let index = 0;
let timer;

function appStart() {
  const dispalyGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료됐습니다.";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:40vh; left:45vw; background-color:white; width:200px; height: 100px";
    document.body.appendChild(div);
  };
  const Gameover = () => {
    window.removeEventListener("keydown", handlekeydown);
    dispalyGameover();
    clearInterval(timer);
  };
  const nextLine = () => {
    if (attempts === 6) return Gameover();
    attempts += 1;
    index = 0;
  };
  const handleEnterkey = async () => {
    let 맞은_갯수 = 0;
    const 응답 = await fetch("/answer");
    const 정답 = await 응답.json();

    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );
      const 입력한_글자 = block.innerText;
      const 정답_글자 = 정답[i];
      if (입력한_글자 === 정답_글자) {
        맞은_갯수 += 1;
        block.style.background = " #6aaa64";
      } else if (정답.includes(입력한_글자))
        block.style.background = " #c9b458";
      else block.style.background = " #787c7e";
      block.style.color = "white";
    }

    if (맞은_갯수 === 5) Gameover();
    else nextLine();
  };

  const handlebackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) index -= 1;
  };

  const handlekeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );

    if (event.key === "Backspace") handlebackspace();
    else if (index === 5) {
      if (event.key === "Enter") handleEnterkey(thisBlock);
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index += 1;
    }
  };
  // const keyClick = (event) => {
  //   const cilck = event.cilck;
  //   const clickBlock = document.querySelector("keyboard-block[data-key='Q']");
  //   clickBlock.innerText = cilck;
  // };

  const startTimer = () => {
    const 시작_시간 = new Date();

    function setTime() {
      const 현재_시간 = new Date();
      const 흐른_시간 = new Date(현재_시간 - 시작_시간);
      const 분 = 흐른_시간.getMinutes().toString().padStart(2, 0);
      const 초 = 흐른_시간.getSeconds().toString().padStart(2, 0);
      const timeH1 = document.querySelector("#timer");
      timeH1.innerText = `${분}:${초}`;
    }
    timer = setInterval(setTime, 1000);
  };

  startTimer();
  // window.addEventListener("cilck", keyClick);
  window.addEventListener("keydown", handlekeydown);
}

appStart();

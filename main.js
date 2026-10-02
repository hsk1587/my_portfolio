const 움직임줄임 = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// 1) 카드가 화면에 들어오면 부드럽게 나타나게 함
const 카드들 = document.querySelectorAll("[data-reveal]");

if ("IntersectionObserver" in window) {
  const 관찰자 = new IntersectionObserver(
    (항목들) => {
      항목들.forEach((항목) => {
        if (항목.isIntersecting) {
          항목.target.classList.add("is-visible");
          관찰자.unobserve(항목.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  카드들.forEach((카드) => 관찰자.observe(카드));
} else {
  카드들.forEach((카드) => 카드.classList.add("is-visible"));
}

// 2) 프로젝트 카드들을 선으로 이어서 흐름도처럼 보이게 함
const 묶음 = document.querySelector(".nodes");
const 선판 = document.querySelector(".connectors");
const SVG주소 = "http://www.w3.org/2000/svg";

function 선그리기() {
  if (!묶음 || !선판) return;
  선판.innerHTML = "";
  const 기준 = 묶음.getBoundingClientRect();
  const 판들 = [...묶음.querySelectorAll(".card")].map((카드) => {
    const 상자 = 카드.getBoundingClientRect();
    return {
      x: 상자.left - 기준.left + 상자.width / 2,
      위: 상자.top - 기준.top,
      아래: 상자.bottom - 기준.top,
    };
  });

  for (let i = 0; i < 판들.length - 1; i++) {
    const 시작 = { x: 판들[i].x, y: 판들[i].아래 };
    const 끝 = { x: 판들[i + 1].x, y: 판들[i + 1].위 };
    const 중간 = (시작.y + 끝.y) / 2;

    const 길 = document.createElementNS(SVG주소, "path");
    길.setAttribute("d", `M${시작.x} ${시작.y} C${시작.x} ${중간}, ${끝.x} ${중간}, ${끝.x} ${끝.y}`);
    선판.appendChild(길);

    [시작, 끝].forEach((점) => {
      const 원 = document.createElementNS(SVG주소, "circle");
      원.setAttribute("cx", 점.x);
      원.setAttribute("cy", 점.y);
      원.setAttribute("r", 5);
      선판.appendChild(원);
    });
  }
}

선그리기();
window.addEventListener("load", 선그리기);
window.addEventListener("resize", 선그리기);
if (document.fonts && document.fonts.ready) document.fonts.ready.then(선그리기);

// 3) 마우스를 움직이면 위쪽 3D 블록이 살짝 따라 움직임
const 무대 = document.querySelector(".stage");
if (무대 && !움직임줄임 && window.matchMedia("(hover: hover)").matches) {
  window.addEventListener("pointermove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    무대.style.transform = `perspective(900px) rotateY(${x * 6}deg) rotateX(${-y * 5}deg)`;
  });
}

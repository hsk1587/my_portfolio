// 카드가 화면에 들어오면 부드럽게 나타나게 함
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
    { threshold: 0.15 }
  );
  카드들.forEach((카드) => 관찰자.observe(카드));
} else {
  // 오래된 브라우저에서는 그냥 바로 보여줌
  카드들.forEach((카드) => 카드.classList.add("is-visible"));
}

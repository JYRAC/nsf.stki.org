document.addEventListener("DOMContentLoaded", () => {

  // ===== 現在ページをヘッダーで判定 =====
  const navLinks = document.querySelectorAll(".header-nav a");
  const currentPath = window.location.pathname.split("/").pop() || "index.html";

  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPath) {
      link.classList.add("active");
    }
  });

  // ===== reveal animation =====
  const revealItems = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, {
    threshold: 0.12
  });

  revealItems.forEach(item => revealObserver.observe(item));

  // ===== ステータス文字を少しだけ動かす（応募受付中バージョンへ修正） =====
  const statusText = document.querySelector(".hero-status-text");
  const statusSub = document.querySelector(".hero-status-sub");

  if (statusText && statusSub) {
    const phases = [
      {
        main: "NOW RECRUITING",
        sub: "現在、参加者応募受付中です"
      },
      {
        main: "JOIN FUKUSHIMA 2026",
        sub: "福島の未来を考え、共に学び、行動する仲間を募集中です"
      },
      {
        main: "NEXT STORY — WITH YOU",
        sub: "次世代の視点で、新たな復興の物語を一緒に作りましょう"
      }
    ];

    let index = 0;
    setInterval(() => {
      index = (index + 1) % phases.length;
      statusText.textContent = phases[index].main;
      statusSub.textContent = phases[index].sub;
    }, 3200);
  }
});

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

  // ===== ステータス文字を少しだけ動かす =====

  const statusText = document.querySelector(".hero-status-text");

  const statusSub = document.querySelector(".hero-status-sub");

  if (statusText && statusSub) {

    const phases = [

      {

        main: "FUKUSHIMA — ACTIVE",

        sub: "福島編は現在進行中です"

      },

      {

        main: "FIELD RESEARCH — ONGOING",

        sub: "現地の現在地を学び、次の発信を構想中です"

      },

      {

        main: "NEXT STORY — BUILDING",

        sub: "次世代の視点で、新たな復興の物語を準備しています"

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
 

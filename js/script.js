document.addEventListener("DOMContentLoaded", () => {
  /* MENU MOBILE */
  const mobileBtn = document.querySelector(".mobile-menu-btn");
  const navMenu = document.querySelector(".nav-menu");

  if (mobileBtn) {
    mobileBtn.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }

  /* LÓGICA DA ÓRBITA DE SKILLS  */
  const orbitSection = document.querySelector(".orbit-section");
  const orbitItems = document.querySelectorAll(".orbit-item");
  const spinner = document.querySelector(".orbit-spinner");

  // Elementos do Painel Lateral
  const panelTitle = document.getElementById("panel-title");
  const panelDesc = document.getElementById("panel-desc");
  const panelBadge = document.getElementById("panel-badge");
  const closeBtn = document.getElementById("panel-close");

  // Se existirem elementos de órbita na página
  if (orbitItems.length > 0) {
    orbitItems.forEach((item) => {
      item.addEventListener("click", () => {
        const title = item.getAttribute("data-title");
        const desc = item.getAttribute("data-desc");
        const tag = item.getAttribute("data-tag") || "Habilidade";

        if (panelTitle) panelTitle.innerText = title;
        if (panelDesc) panelDesc.innerText = desc;
        if (panelBadge) panelBadge.innerText = tag;

        orbitSection.classList.add("active-mode");

        orbitItems.forEach((i) => i.classList.remove("selected"));
        item.classList.add("selected");

        spinner.style.animationPlayState = "paused";
        document.querySelectorAll(".orbit-icon-inner").forEach((icon) => {
          icon.style.animationPlayState = "paused";
        });
      });
    });

    const closePanel = () => {
      orbitSection.classList.remove("active-mode");
      orbitItems.forEach((i) => i.classList.remove("selected"));
      spinner.style.animationPlayState = "running";
      document.querySelectorAll(".orbit-icon-inner").forEach((icon) => {
        icon.style.animationPlayState = "running";
      });
    };

    if (closeBtn) {
      closeBtn.addEventListener("click", closePanel);
    }
  }

  /* --- FORMULÁRIO --- */
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Obrigado! Sua mensagem foi enviada com sucesso.");
      form.reset();
    });
  }
});

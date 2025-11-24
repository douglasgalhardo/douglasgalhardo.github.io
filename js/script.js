document.addEventListener("DOMContentLoaded", () => {
  /* --- MENU MOBILE --- */
  const mobileBtn = document.querySelector(".mobile-menu-btn");
  const navMenu = document.querySelector(".nav-menu");

  if (mobileBtn) {
    mobileBtn.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }

  /* --- LÓGICA DA ÓRBITA DE SKILLS --- */
  const orbitSection = document.querySelector(".orbit-section");
  const orbitItems = document.querySelectorAll(".orbit-item");
  const spinner = document.querySelector(".orbit-spinner");

  // Elementos do Painel Lateral
  const panelTitle = document.getElementById("panel-title");
  const panelDesc = document.getElementById("panel-desc");
  const panelBadge = document.getElementById("panel-badge");
  const closeBtn = document.getElementById("panel-close");

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

  /* --- FORMULÁRIO COM REDIRECIONAMENTO VIA JAVASCRIPT --- */
  /* Isso garante que a página 'obrigado.html' abra mesmo testando localmente */
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault(); // Impede o envio padrão que abria a tela feia

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerText;

      // Feedback visual
      submitBtn.innerText = "Enviando...";
      submitBtn.disabled = true;

      const data = new FormData(form);

      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: data,
          headers: {
            Accept: "application/json", // Pede resposta limpa ao Formspree
          },
        });

        if (response.ok) {
          // SUCESSO: Redireciona manualmente para sua página bonita
          window.location.href = "obrigado.html";
          form.reset();
        } else {
          // Erro no Formspree
          const result = await response.json();
          alert(result.error || "Ocorreu um erro ao enviar.");
          submitBtn.innerText = originalText;
          submitBtn.disabled = false;
        }
      } catch (error) {
        // Erro de conexão
        alert("Erro de conexão. Tente novamente.");
        submitBtn.innerText = originalText;
        submitBtn.disabled = false;
      }
    });
  }
});

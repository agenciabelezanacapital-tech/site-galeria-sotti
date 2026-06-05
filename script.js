/* =================================================================
   GALERIA SOTTI — SCRIPT
   JavaScript vanilla, sem dependências.
   ================================================================= */

(function () {
  "use strict";

  /* -----------------------------------------------------------------
     1) LINKS DO WHATSAPP — CENTRALIZADOS (fáceis de editar)
     -----------------------------------------------------------------
     Número e mensagens em um único lugar. Para mudar o número,
     basta alterar WHATSAPP_NUMBER. As mensagens já vêm prontas.
     Cada elemento com a classe .js-whatsapp recebe seu link conforme
     o atributo data-wa ("geral" ou "noiva").
  ------------------------------------------------------------------ */
  var WHATSAPP_NUMBER = "5531996810300";

  var WHATSAPP_MESSAGES = {
    geral: "Olá, fiquei interessada nos serviços e quero mais informações.",
    noiva: "Olá! Sou noiva e gostaria de saber mais sobre os pacotes de noiva da Sotti."
  };

  /** Monta a URL final do WhatsApp para uma chave de mensagem. */
  function buildWhatsAppLink(key) {
    var msg = WHATSAPP_MESSAGES[key] || WHATSAPP_MESSAGES.geral;
    return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(msg);
  }

  /** Aplica os links em todos os botões/CTAs de WhatsApp da página. */
  function applyWhatsAppLinks() {
    var links = document.querySelectorAll(".js-whatsapp");
    links.forEach(function (el) {
      var key = el.getAttribute("data-wa") || "geral";
      el.setAttribute("href", buildWhatsAppLink(key));
    });
  }

  /* -----------------------------------------------------------------
     2) HEADER — sombra ao rolar a página
  ------------------------------------------------------------------ */
  function initHeaderScroll() {
    var header = document.getElementById("header");
    if (!header) return;

    function onScroll() {
      if (window.scrollY > 12) {
        header.classList.add("is-scrolled");
      } else {
        header.classList.remove("is-scrolled");
      }
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* -----------------------------------------------------------------
     3) ANO DINÂMICO NO FOOTER
  ------------------------------------------------------------------ */
  function initYear() {
    var el = document.getElementById("year");
    if (el) el.textContent = new Date().getFullYear();
  }

  /* -----------------------------------------------------------------
     4) REVEAL ON SCROLL — animação de entrada elegante e leve
        (usa IntersectionObserver; degrada bem se indisponível)
  ------------------------------------------------------------------ */
  function initReveal() {
    var targets = document.querySelectorAll(
      ".section__head, .card, .brides__text, .brides__media, .feature, .review, .location__info, .location__map, .finalcta__inner"
    );

    // Fallback: sem IntersectionObserver, mostra tudo.
    if (!("IntersectionObserver" in window)) {
      targets.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    targets.forEach(function (el) { el.classList.add("reveal"); });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    targets.forEach(function (el) { observer.observe(el); });
  }

  /* -----------------------------------------------------------------
     INICIALIZAÇÃO
  ------------------------------------------------------------------ */
  function init() {
    applyWhatsAppLinks();
    initHeaderScroll();
    initYear();
    initReveal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

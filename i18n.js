// imports o objeto translations
import { translations } from './translations.js'; 

let currentLang = "en";

export function getCurrentLang() {
    return currentLang;
}

export function changeLanguage(lang) {
  currentLang = lang;

  // 1. Atualiza botões de idioma
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    if (btn.getAttribute("data-lang") === lang) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  // 2. Atualiza elementos com data-i18n
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    if (translations[lang] && translations[lang][key]) {
      if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
        element.value = translations[lang][key];
      } else {
        element.innerHTML = translations[lang][key];
      }
    }
  });
  
  // 3. (OPCIONAL) Dispara um evento para UI/API saberem que a língua mudou
  document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: lang } }));
}
// Objeto que contém todas as traduções.
// Note que as chaves de idioma (ex: "en", "pt") estão no nível superior.
const ALL_TRANSLATIONS = {
    "en":{
      "form": {
        "title": "BLURT Account Creator",
        "label_name": "BLURT Account Username",
        "choose_name": "Choose a username",
        "username-status": "Enter a valid username and check availability.",
        "check_av": "Check Availability",
        "voucher_label": "Voucher Code",
        "voucher_info": "Enter a valid voucher code.",
        "generate_keys": "🔐 Generate Keys",
        "master":"Generated Master Password",
        "owner":"Owner Key",
        "active":"Active Key",
        "posting":"Posting Key",
        "memo":"Memo Key",
        "email_refuse": "I don't want to receive keys by email.",
        "submit": "Create Account",
        "step": "➡️ Next Step",
        "username_placeholder": "Enter desired username",
        "email_placeholder": "Your Email Address",
        "encryption_password": "Encryption password for email message:",
        "alert-encryption": "Used to encrypt the email that contains your keys. Only you can decrypt it thanks to this password so remember it!",
        "create_account_button": "✅ Create Account",
        "blurt_account": "Blurt Username",
        "transaction_confirmation": "Waiting for transaction confirmation..."
      },
      "messages": {
        "success": "Your account has been created successfully!",
        "error": "An error occurred. Please try again.",
        "invalid_username": "Invalid username format.",
        "empty_username": "Username is required.",
        "empty_email": "Email address is required.",
        "empty_password": "Encryption password is required.",
        "invalid_email": "Invalid email address.",
        "keys_generated": "Keys generated. Please proceed with the transaction.",
        "copied": "Copied to clipboard!",
        "sending_mail": "Sending confirmation email...",
        "email_sent": "Email sent successfully!",
        "email_error": "Error sending email. Check your address or try again."
      },
      "interface": {
        "contact": "Contact us:",
        "frontend_login": "Login:",
        "back": "<== Back to main page",
        "key_info": "To store your keys safely and conveniently while using the blurt network install WhaleVault extension for:",
        "key_mobile": "Mobile app BlurtKey:"

      },
      "buttons": {
        "next": "Next",
        "copy": "Copy",
        "start_over": "Start Over",
        "confirm": "Confirm"
      },
      "lang_switch": {
        "label": "Language",
        "pl": "Polish",
        "en": "English"
      }
    },
    "pl": {
  "form": {
    "title": "Kreator Konta BLURT",
    "label_name": "Nazwa Użytkownika Konta BLURT",
    "choose_name": "Wybierz nazwę użytkownika",
    "username-status": "Wprowadź prawidłową nazwę użytkownika i sprawdź dostępność.",
    "check_av": "Sprawdź dostępność",
    "voucher_label": "Kod Vouchera",
    "voucher_info": "Wprowadź prawidłowy kod vouchera.",
    "generate_keys": "🔐 Generuj Klucze",
    "master": "Wygenerowane Hasło Główne",
    "owner": "Klucz Właściciela (Owner)",
    "active": "Klucz Aktywny (Active)",
    "posting": "Klucz Postowania (Posting)",
    "memo": "Klucz Memo (Memo)",
    "email_refuse": "Nie chcę otrzymywać kluczy e-mailem.",
    "submit": "Utwórz Konto",
    "step": "➡️ Następny Krok",
    "username_placeholder": "Wprowadź pożądaną nazwę użytkownika",
    "email_placeholder": "Twój Adres E-mail",
    "encryption_password": "Hasło szyfrujące dla wiadomości e-mail:",
    "alert-encryption": "Używane do zaszyfrowania wiadomości e-mail zawierającej Twoje klucze. Tylko Ty możesz ją odszyfrować dzięki temu hasłu, więc zapamiętaj je!",
    "create_account_button": "✅ Utwórz Konto",
    "blurt_account": "Nazwa Użytkownika Blurt",
    "transaction_confirmation": "Oczekiwanie na potwierdzenie transakcji..."
  },
  "messages": {
    "success": "Twoje konto zostało pomyślnie utworzone!",
    "error": "Wystąpił błąd. Proszę spróbować ponownie.",
    "invalid_username": "Nieprawidłowy format nazwy użytkownika.",
    "empty_username": "Nazwa użytkownika jest wymagana.",
    "empty_email": "Adres e-mail jest wymagany.",
    "empty_password": "Hasło szyfrujące jest wymagane.",
    "invalid_email": "Nieprawidłowy adres e-mail.",
    "keys_generated": "Klucze wygenerowane. Proszę kontynuować transakcję.",
    "copied": "Skopiowano do schowka!",
    "sending_mail": "Wysyłanie e-maila z potwierdzeniem...",
    "email_sent": "E-mail został pomyślnie wysłany!",
    "email_error": "Błąd wysyłania e-maila. Sprawdź adres lub spróbuj ponownie."
  },
  "interface": {
    "contact": "Skontaktuj się z nami:",
    "frontend_login": "Logowanie:",
    "back": "<== Powrót do strony głównej",
    "key_info": "Aby bezpiecznie i wygodnie przechowywać klucze podczas korzystania z sieci Blurt, zainstaluj rozszerzenie WhaleVault dla:",
    "key_mobile": "Aplikacja mobilna BlurtKey:"
  },
  "buttons": {
    "next": "Dalej",
    "copy": "Kopiuj",
    "start_over": "Zacznij od nowa",
    "confirm": "Potwierdź"
  },
  "lang_switch": {
    "label": "Język",
    "pl": "Polski",
    "en": "Angielski"
  }
},
    // Você adicionaria outras linguagens aqui, por exemplo:
    // "pt": { ... traduções em português ... },
    // "pl": { ... traduções em polonês ... }
};

// Variável para a tradução ATUALmente ativa. Começa com 'en'.
let currentTranslation = ALL_TRANSLATIONS['en'];

/**
 * Carrega a tradução do objeto ALL_TRANSLATIONS e a aplica.
 * @param {string} lang - O código do idioma (ex: 'en', 'pt').
 */
function loadLanguageFromObject(lang = 'en') {
    const translation = ALL_TRANSLATIONS[lang];
    if (translation) {
        currentTranslation = translation;
        applyTranslations();
    } else {
        console.warn(`Translation for ${lang} not found.`);
        // Opcional: Voltar para 'en' se o idioma não for encontrado
        currentTranslation = ALL_TRANSLATIONS['en'];
        applyTranslations();
    }
}

/**
 * Aplica as traduções baseadas no objeto currentTranslation.
 */
function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    // Usa currentTranslation em vez de 'translations'
    const value = key.split('.').reduce((obj, i) => obj?.[i], currentTranslation);
    if (value) el.innerText = value;
  });
}

/**
 * Função utilitária para acessar uma chave de tradução em qualquer lugar.
 * @param {string} key - A chave (ex: 'form.title').
 * @returns {string} O valor da tradução ou a chave se não for encontrada.
 */
function t(key) {
  return key.split('.').reduce((obj, i) => obj?.[i], currentTranslation) || key;
}

// Inicialização e Event Listener
document.addEventListener('DOMContentLoaded', () => {
  // 1. Inicializa o idioma na carga da página
  const selectedLang = localStorage.getItem('lang') || 'en';
  loadLanguageFromObject(selectedLang);

  // 2. Adiciona o listener para troca de idioma
  document.getElementById('lang-switch').addEventListener('change', (e) => {
    const lang = e.target.value;
    localStorage.setItem('lang', lang);
    loadLanguageFromObject(lang); // Carrega do objeto em vez de fetch
  });
});
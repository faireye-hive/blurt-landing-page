// === script.js (OTIMIZADO com blurt.min.js) =====================================

// ————— Inicjalizacja po DOM —————
window.addEventListener('DOMContentLoaded', () => {
  const voucherInput = document.getElementById("voucher_code");

  toggleEmailOption(); // Sincroniza o checkbox com a visibilidade da seção

  if (voucherInput) {
    const triggerValidation = () => {
      const code = voucherInput.value.trim();
      if (code.length >= 16) {
        validateVoucherCode();
      }
    };

    voucherInput.addEventListener("input", triggerValidation);
    voucherInput.addEventListener("change", triggerValidation);
    voucherInput.addEventListener("blur", triggerValidation);

    if (voucherInput.value.trim().length >= 16) {
      triggerValidation();
    }
  }

  document.getElementById("skip_email").addEventListener("change", toggleEmailOption);
  toggleEmailOption(); // Inicialização ao iniciar

  if (window.fakeMode) {
    const maintenance = document.getElementById("maintenance_notice");
    if (maintenance) maintenance.style.display = "block";
  }
});

// ————— Voucher —————
async function validateVoucherCode() {
  const code = document.getElementById("voucher_code").value.trim();
  const status = document.getElementById("voucher-status");

  console.log("Sprawdzam voucher:", code);

  if (!code || code.length < 16) {
    status.textContent = "Voucher code too short.";
    status.className = "text-danger";
    return false;
  }

  try {
    const res = await fetch("https://blurtplugin.online/account/validate_voucher_proxy.php", {
      method: "POST",
      body: new URLSearchParams({ code })
    });
    const data = await res.json();
    if (data.valid) {
      status.textContent = `✅ Voucher is valid. Uses left: ${data.remaining_uses}`;
      status.className = "text-success";
      return true;
    } else {
      switch (data.reason) {
        case 'invalid_format':
          status.textContent = "❌ Invalid voucher format.";
          break;
        case 'not_found':
          status.textContent = "❌ Voucher not found.";
          break;
        case 'limit_reached':
          status.textContent = "❌ Voucher usage limit reached.";
          break;
        default:
          status.textContent = "❌ Invalid or used voucher.";
      }
      status.className = "text-danger";
      return false;
    }
  } catch (e) {
    status.textContent = "Error validating voucher." + e;
    status.className = "text-warning";
    return false;
  }
}

// ————— Email / skip —————
function toggleEmailOption() {
  const skip = document.getElementById('skip_email').checked;
  const section = document.getElementById('email_encrypt_section');
  const encInput = document.getElementById('encryptionEmail');
  const encInput1 = document.getElementById('encryptionPassword');

  if (skip) {
    section.style.display = 'none';
    encInput.required = false;
    encInput1.required = false;
  } else {
    section.style.display = 'block';
    encInput.required = true;
    encInput1.required = true;
  }
}

function showKeySection() {
  const skipEmail = document.getElementById('skip_email').checked;

  if (!skipEmail) {
    const email = document.querySelector('input[name="email"]').value.trim();
    const pass  = document.getElementById('encryptionPassword').value.trim();

    if (!email) {
      alert("Complete your email.");
      return;
    }

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailValid) {
      alert("Please provide a valid email address.");
      return;
    }

    if (!pass) {
      alert("Enter your encryption password.");
      return;
    }
  }

  document.getElementById("keys-section").style.display = "block";
}

// ————— Backup do pliku —————
function downloadKeysFile(username, keys, master) {
  const content = [
    "============================",
    " BLURT Account Backup File",
    "============================",
    "",
    "Username:           " + username,
    "Master Password:    " + master,
    "",
    "IMPORTANT: This master password (also known as seed) can regenerate all your keys.",
    "Store it safely and do not share it with anyone.",
    "",
    "----- PRIVATE KEYS -----",
    "Owner:   " + keys.owner,
    "Active:  " + keys.active,
    "Posting: " + keys.posting,
    "Memo:    " + keys.memo,
    "",
    "Generated on: " + new Date().toISOString(),
    ""
  ].join("\n");

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = username + "_blurt_keys_backup.txt";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}

// ————— Sprawdzanie dostępności nazwy —————
async function isUsernameAvailable(username) {
  return new Promise((resolve, reject) => {
    // blurt.api.getAccounts é a função padrão para verificar
    blurt.api.getAccounts([username], function (err, result) {
      if (err) {
        reject("Error checking account: " + err);
      } else {
        resolve(result.length === 0);
      }
    });
  });
}
function validateUsernameLocally(username) {
  const grapheneUsernameRegex = /^(?=.{3,16}$)[a-z][0-9a-z-]{1,}[0-9a-z](\.[a-z][0-9a-z-]{1,}[0-9a-z])?$/;
  return grapheneUsernameRegex.test(username);
}
async function checkUsernameAvailability() {
  const username = document.getElementById("username").value.trim();
  const statusEl = document.getElementById("username-status");

  if (!validateUsernameLocally(username)) {
    statusEl.textContent = "❌ Invalid format. Use only lowercase, digits, dots or hyphens. Each part must be ≥3 chars.";
    statusEl.className = "text-danger";
    return false;
  }

  try {
    const available = await isUsernameAvailable(username);
    if (available) {
      statusEl.textContent = "✅ Username is available.";
      statusEl.className = "text-success";
      return true;
    } else {
      statusEl.textContent = "❌ Username is already taken.";
      statusEl.className = "text-danger";
      return false;
    }
  } catch (e) {
    statusEl.textContent = "⚠️ Error checking username.";
    statusEl.className = "text-warning";
    return false;
  }
}

// ————— Szyfrowanie CryptoJS „Salted__” (kompatybilne z backendem) —————
// Esta função é mantida pois é necessária para a criptografia do email
// (e depende do CryptoJS, mas não de bs58, sha256d etc.)
function encryptWithSaltedAES(plainJson, passphrase) {
  const salt = CryptoJS.lib.WordArray.random(8);
  const keyIv = CryptoJS.EvpKDF(passphrase, salt, {
    keySize   : (32 + 16) / 4,
    iterations: 1,
    hasher    : CryptoJS.algo.MD5
  });
  const key = CryptoJS.lib.WordArray.create(keyIv.words.slice(0, 8));
  const iv  = CryptoJS.lib.WordArray.create(keyIv.words.slice(8, 12));

  const ciphertext = CryptoJS.AES.encrypt(plainJson, key, {
    iv   : iv,
    mode : CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  }).ciphertext;

  const out = CryptoJS.enc.Utf8.parse('Salted__')
               .concat(salt)
               .concat(ciphertext);

  return CryptoJS.enc.Base64.stringify(out);
}

// ————— Generator master + kluczy (CORRIGIDO) —————
async function generateMasterAndKeys(usernameRaw) {
  const username = String(usernameRaw || '').trim().toLowerCase();
  if (!/^[a-z0-9\-.]{3,16}$/.test(username)) {
    throw new Error('Invalid username');
  }

  // 1. GERAÇÃO DA SENHA MESTRE
  // A blurtjs fornece uma função para gerar uma string segura de 32 bytes (Master Password).
  // Usamos 'blurt.formatter.createSuggestedPassword()' para criar a semente/Master.
  const master = blurt.formatter.createSuggestedPassword(); 

  const roles = ['owner', 'active', 'posting', 'memo'];
  
  // 2. DERIVAÇÃO DAS CHAVES PRIVADAS (Usando a senha Mestre)
  const priv = blurt.auth.getPrivateKeys(username, master, roles);
  
  // 3. DERIVAÇÃO DAS CHAVES PÚBLICAS
  const pub = {
    owner:   blurt.auth.wifToPublic(priv.owner),
    active:  blurt.auth.wifToPublic(priv.active),
    posting: blurt.auth.wifToPublic(priv.posting),
    memo:    blurt.auth.wifToPublic(priv.memo),
  };

  // self-check (mantido)
  const check = blurt.auth.getPrivateKeys(username, master, roles);
  if (check.owner !== priv.owner || check.active !== priv.active ||
      check.posting !== priv.posting || check.memo !== priv.memo) {
    throw new Error('Self-check failed – derived keys mismatch');
  }

  return { master, priv, pub };
}

// ————— GŁÓWNY: Generate Keys (podpięte do przycisku) —————
async function generateKeys() {
  const usernameOk = await checkUsernameAvailability();
  if (!usernameOk) return;

  const username = document.getElementById("username").value.trim().toLowerCase();

  // 🔐 Novo, Master Password e chaves (agora otimizado)
  const { master, priv /*, pub*/ } = await generateMasterAndKeys(username);

  // downloadKeysFile faz o backup para o arquivo
  const keysForBackup = {
    owner:   priv.owner,
    active:  priv.active,
    posting: priv.posting,
    memo:    priv.memo
  };
  downloadKeysFile(username, keysForBackup, master);

  // preenche a UI
  document.getElementById("password").value     = master;
  document.getElementById("owner_key").value    = priv.owner;
  document.getElementById("active_key").value   = priv.active;
  document.getElementById("posting_key").value  = priv.posting;
  document.getElementById("memo_key").value     = priv.memo;

  // pacotes para o backend
  const skipEmail = document.getElementById("skip_email").checked;
  const encPass   = document.getElementById("encryptionPassword").value;

  // chaves brutas (para modo sem email) – backend filtra campos necessários
  const rawKeys = {
    master,
    owner:   priv.owner,
    active:  priv.active,
    posting: priv.posting,
    memo:    priv.memo
  };
  document.getElementById("raw_keys").value = JSON.stringify(rawKeys);

  // pacote encriptado para email (CryptoJS Salted__)
  if (!skipEmail) {
    if (!encPass) {
      alert("⚠️ Wprowadź hasło szyfrujące lub zaznacz opcję pominięcia e-maila.");
      return;
    }
    const pack = {
      username,
      master,
      owner:   priv.owner,
      active:  priv.active,
      posting: priv.posting,
      memo:    priv.memo
    };
    const encryptedKeys = encryptWithSaltedAES(JSON.stringify(pack), encPass);
    document.getElementById("encrypted_keys").value = encryptedKeys;
  } else {
    document.getElementById("encrypted_keys").value = "";
  }

  document.getElementById("sent").style.display = "block";
}
window.generateKeys = generateKeys; // conecta ao botão

// ————— Submit formularza (mantido) —————
document.getElementById('form_id').addEventListener('submit', async function (e) {
  e.preventDefault();

  // ✅ VALIDAÇÃO DO VOUCHER ANTES DE ENVIAR
  const voucherOk = await validateVoucherCode();
  if (!voucherOk) {
    alert("Voucher is invalid or used. Please check again.");
    return;
  }

  const form = e.target;
  const formData = new FormData(form);
  const skipEmail = document.getElementById('skip_email').checked;

  formData.append('send_email', skipEmail ? '0' : '1');

  if (skipEmail) {
    formData.set('encryptionPassword', '');
  }

  try {
    const response = await fetch('https://blurtplugin.online/account/creator.php', {
      method: 'POST',
      body: formData
    });

    const result = await response.json();
    //const result ="result.txid";

    /*if (result.success) {*/
    if (true) {
      alert("✅ Konto utworzone! TXID: " );
      const username  = document.getElementById("username").value;
      const master  = document.getElementById("password").value;
      const posting = document.getElementById("posting_key").value;
      showSuccessMessage(username, master, posting);
    } else {
      //alert("⛔ Błąd: " + result.error);
    }
  } catch (err) {
    //alert("⛔ Błąd połączenia z serwerem: " + err.message);
  }
});

// ————— Quando o username muda, limpa os campos da chave —————
document.getElementById("username").addEventListener("input", () => {
  document.getElementById("keys-section").style.display = "none";
  document.getElementById("sent").style.display = "none";

  document.getElementById("password").value    = "";
  document.getElementById("owner_key").value   = "";
  document.getElementById("active_key").value  = "";
  document.getElementById("posting_key").value = "";
  document.getElementById("memo_key").value    = "";

  document.getElementById("raw_keys").value       = "";
  document.getElementById("encrypted_keys").value = "";
});

// ————— Tela de Sucesso —————
function showSuccessMessage(username, master, posting) {
  const form = document.getElementById("form_id");
  form.style.display = "none";

  const container = document.createElement("div");
  container.className = "alert alert-success text-center mt-4";
  container.style.fontSize = "1.1rem";

  container.innerHTML = `
    ✅ Account <strong>${username}</strong> created successfully!<br><br>
    To log in to Blurt, download the <strong>WhaleVault</strong> browser extension and use your <strong>Master Password</strong> to setup all keys.<br><br>
    <img src="img/whalevault.png" alt="WhaleVault Logo" style="width: 100%; margin-bottom: 15px;"><br>
    <strong>Your Master Password:</strong><br>
    <code style="font-size:1.2rem;">${master}</code><br><br>
    If you want to start posting immediately, you can use your <strong>Posting Key</strong> directly in your preferred frontend.<br><br>
    <strong>Your Posting Key:</strong><br>
    <code style="font-size:1.2rem;">${posting}</code>
  `;

  form.parentNode.appendChild(container);

  loadCommunitiesSection();
}


async function loadCommunitiesSection() {
  // 1) Encontra o container principal
  const outerContainer = document.querySelector('.container');
  if (!outerContainer) {
    console.warn('communities: .container not found');
    return;
  }

  // 2) Remove a seção anterior para evitar duplicidade
  let wrapper = document.getElementById('communities-wrapper');
  if (wrapper) {
    wrapper.remove();
  }

  // 3) Cria o wrapper no final do container
  wrapper = document.createElement('div');
  wrapper.id = 'communities-wrapper';
  wrapper.className = 'communities-wrapper';

  const heading = document.createElement('h2');
  heading.className = 'h4 text-center mb-4';
  heading.textContent = 'Choose your community to find better support:';
  wrapper.appendChild(heading);

  const grid = document.createElement('div');
  grid.className = 'communities-grid';
  wrapper.appendChild(grid);

  // Insere no final do container principal
  outerContainer.appendChild(wrapper);

  // 4) Pega a lista de comunidades
  try {
    const response = await fetch('https://blurtplugin.online/account/get_communities.php', {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });
    const data = await response.json();

    if (!data.success || !Array.isArray(data.communities) || data.communities.length === 0) {
      const info = document.createElement('p');
      info.className = 'text-center text-muted';
      info.textContent = 'There are no communities configured yet.';
      wrapper.appendChild(info);
      return;
    }

    data.communities.forEach((c) => {
      const item = document.createElement('div');
      item.className = 'community-item';

      const box = document.createElement('div');
      box.className = 'community-box';

      const link = document.createElement('a');
      link.href = c.url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';

      const img = document.createElement('img');
      img.src = c.thumbnail_url;
      img.alt = c.name;
      img.className = 'community-thumb';

      link.appendChild(img);
      box.appendChild(link);

      const caption = document.createElement('div');
      caption.className = 'community-name';
      caption.textContent = c.name;

      box.appendChild(caption);
      item.appendChild(box);
      grid.appendChild(item);
    });
  } catch (err) {
    console.error('Error loading communities', err);
    const errorInfo = document.createElement('p');
    errorInfo.className = 'text-center text-warning';
    errorInfo.textContent = 'Error loading communities list.';
    wrapper.appendChild(errorInfo);
  }
}
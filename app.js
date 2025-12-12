// app.js

import { changeLanguage } from './i18n.js';
import * as UI from './ui-updates.js';
import * as Utils from './utils.js';

// Lista de arquivos de seção para carregamento modular
const sections = [
    { id: 'header-container', file: 'header.html' },
    { id: 'mobile-menu-container', file: 'mobile-menu.html' },
    { id: 'hero-stream-container', file: 'hero-stream.html' },
    { id: 'features-container', file: 'features.html' },
    { id: 'stats-container', file: 'stats.html' },
    { id: 'guide-container', file: 'guide.html' },
    { id: 'resources-container', file: 'resources.html' },
    { id: 'footer-container', file: 'footer.html' },
];

function createParticles() {
    const container = document.getElementById("particles-bg");

    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 25 : 80; // reduzir no mobile

    for (let i = 0; i < particleCount; i++) {
        const p = document.createElement("div");
        p.classList.add("particle");

        p.style.left = Math.random() * 100 + "vw";
        p.style.top = Math.random() * 100 + "vh";
        p.style.animationDuration = 8 + Math.random() * 10 + "s";
        p.style.transform = `scale(${0.3 + Math.random() * 1.2})`;

        container.appendChild(p);
    }
}


document.addEventListener("DOMContentLoaded", createParticles);
/**
 * Configura todos os Listeners de Evento (depois que o HTML é carregado).
 * Alterado para Arrow Function (const) para consistência moderna.
 */
const setupEventListeners = () => {
    // Listeners de idioma (Os botões estão no header.html)
    document.querySelectorAll(".lang-btn").forEach(btn => {
        btn.onclick = () => {
            changeLanguage(btn.getAttribute("data-lang"));
            // Recarrega os dados para atualizar textos dependentes da API (ex: transações)
            UI.updateBlockchainData(); 
        };
    });
    
    // Inicializa a navegação (Smooth Scroll e links ativos)
    Utils.initNavigation();
    
    // Aqui iriam os listeners para formulários ou botões específicos
    // Ex: if (Utils.$('btnFetch')) Utils.$('btnFetch').addEventListener('click', handleDownloadUser);
}; // <--- Note o ponto e vírgula aqui, pois agora é uma atribuição de variável


// ---------- window.load (Executa após todos os assets carregarem) ----------
window.addEventListener('load', async () => {
    // 1. CARREGAR AS SEÇÕES HTML
    Utils.updateApiStatus(false, "Carregando componentes...");
    
    // Carrega todas as seções em paralelo para maior velocidade
    await Promise.all(sections.map(s => Utils.loadSection(s.id, s.file)));
    
    Utils.updateApiStatus(true, "Interface carregada");

    // 2. INICIALIZAÇÃO DA INTERFACE E EVENT LISTENERS
    
    // Aplica o idioma inicial (deve ser chamado APÓS o HTML ser injetado)
    changeLanguage("pt"); 
    
    // Configura listeners de eventos e navegação
    setupEventListeners();
    
    // Inicializar o sistema de animações de scroll
    Utils.initScrollAnimations();
    
    // 3. INICIALIZAÇÃO DA BLOCKCHAIN
    
    // Inicializa os dados da blockchain pela primeira vez
    Utils.updateApiStatus(false, "Conectando à Blurt API...");
    await UI.updateBlockchainData(); 
    
    // Configura as atualizações periódicas (a cada 10 segundos)
    setInterval(UI.updateBlockchainData, 10000); 

    // O status da API será atualizado DENTRO do blurt-api.js/ui-updates.js após a primeira conexão bem-sucedida.
});
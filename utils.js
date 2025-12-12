// utils.js

/**
 * Utilitário para obter elemento por ID.
 * @param {string} id - ID do elemento.
 * @returns {HTMLElement | null}
 */
export function $(id) {
    return document.getElementById(id);
}

/**
 * Carrega uma seção de HTML externa e a insere no DOM.
 * @param {string} id - ID do container onde o HTML será inserido.
 * @param {string} file - Nome do arquivo HTML (ex: 'header.html').
 */
export async function loadSection(id, file) {
    try {
        const response = await fetch(`./sections/${file}`);
        if (!response.ok) {
            throw new Error(`Não foi possível carregar ${file}: Status ${response.status}`);
        }
        const html = await response.text();
        const container = $(id);
        if (container) {
            container.innerHTML = html;
        } else {
            console.warn(`Container com ID '${id}' não encontrado no DOM.`);
        }
    } catch (error) {
        console.error(`Erro ao carregar seção ${id}:`, error);
        if ($(id)) {
            $(id).innerHTML = `<p style="color: red;">Erro ao carregar a seção: ${file}</p>`;
        }
    }
}

/**
 * Inicializa a observação de elementos para animações de scroll (fade-in).
 */
export function initScrollAnimations() {
    const fadeElements = document.querySelectorAll(".fade-in");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px",
        }
    );

    fadeElements.forEach((element) => {
        observer.observe(element);
    });
}

/**
 * Configura o Smooth Scroll e a atualização do link de navegação ativo.
 */
export function initNavigation() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            const href = this.getAttribute("href");

            if (href === "#") return;

            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();

                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Ajuste para o header fixo
                    behavior: "smooth",
                });
            }
        });
    });

    // Update active nav link on scroll
    window.addEventListener("scroll", function () {
        const scrollPosition = window.scrollY + 100;

        // Get all sections (necessário que as seções tenham o ID após o carregamento)
        const sections = document.querySelectorAll("section[id]");

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute("id");

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionTop + sectionHeight
            ) {
                document.querySelectorAll(".nav-link").forEach((link) => {
                    link.classList.remove("active");
                });

                const targetLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (targetLink) {
                    targetLink.classList.add("active");
                }
            }
        });
    });
}

/**
 * Atualiza o status visual da conexão com a API.
 * @param {boolean} isConnected - Status da conexão.
 * @param {string} message - Mensagem para exibir no status.
 */
export function updateApiStatus(isConnected, message) {
    const statusDot = $("apiStatusDot");
    const statusText = $("apiStatusText");
    const badge = $("apiStatusBadge");

    if (statusDot) {
        statusDot.className =
            "status-dot " + (isConnected ? "status-online" : "status-syncing");
    }

    if (statusText) {
        statusText.textContent = message;
    }

    if (badge) {
        badge.style.background = isConnected
            ? "rgba(0, 100, 0, 0.8)"
            : "rgba(200, 100, 0, 0.8)";
    }
}
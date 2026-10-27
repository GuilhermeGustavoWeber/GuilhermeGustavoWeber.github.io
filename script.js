/**
 * Guilherme Gustavo Weber — Portfolio Interativo v3.0
 * Arquitetura Sovereign Client-Side (Zero dependencias, 100% Vanilla ES6)
 */

document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initCursorSpotlight();
  initInteractiveTerminal();
  initThariumHeatmapSimulation();
  initEmailCopy();
  initNavScrollSpy();
});

/* ==========================================================================
   1. GERENCIADOR DE TEMA DARK / LIGHT (SEM FLASH)
   ========================================================================== */

function initThemeToggle() {
  const toggleBtn = document.getElementById("theme-toggle-btn");
  const htmlEl = document.documentElement;
  const themeIcon = document.getElementById("theme-toggle-icon");

  const savedTheme = localStorage.getItem("gw-theme") || "dark";
  applyTheme(savedTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const current = htmlEl.getAttribute("data-theme") === "light" ? "light" : "dark";
      const nextTheme = current === "light" ? "dark" : "light";
      applyTheme(nextTheme);
      localStorage.setItem("gw-theme", nextTheme);
    });
  }

  function applyTheme(theme) {
    if (theme === "light") {
      htmlEl.setAttribute("data-theme", "light");
      if (themeIcon) {
        // Ícone da Lua para alternar para Dark
        themeIcon.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
      }
    } else {
      htmlEl.removeAttribute("data-theme");
      if (themeIcon) {
        // Ícone do Sol para alternar para Light
        themeIcon.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
      }
    }
  }
}

/* ==========================================================================
   2. SPOTLIGHT E AURORA REATIVA AO CURSOR
   ========================================================================== */

function initCursorSpotlight() {
  const aurora = document.querySelector(".ambient-aurora");
  window.addEventListener("pointermove", (e) => {
    document.documentElement.style.setProperty("--page-mx", `${e.clientX}px`);
    document.documentElement.style.setProperty("--page-my", `${e.clientY}px`);
  });
}

/* ==========================================================================
   3. CONSOLE COGNITIVO / TERMINAL INTERATIVO AO VIVO
   ========================================================================== */

function initInteractiveTerminal() {
  const termBody = document.getElementById("terminal-output");
  const termInput = document.getElementById("terminal-cli-input");
  const cmdPills = document.querySelectorAll(".cmd-pill");

  if (!termBody || !termInput) return;

  const COMMANDS = {
    help: () => [
      `<span style="color: var(--green-ink); font-weight: 700;">COMANDOS DISPONÍVEIS:</span>`,
      `  <span style="color: var(--peach);">tharium</span>    — Arquitetura de IA por Mapa de Calor do jogo (1º Lugar TechDay)`,
      `  <span style="color: var(--peach);">sidi</span>       — Especificações do copiloto cognitivo e cadeia Merkle`,
      `  <span style="color: var(--peach);">novastore</span>  — Arquitetura comercial E2E e stack FastAPI`,
      `  <span style="color: var(--peach);">gould</span>      — Sistema biológico, diário de gaiolas e PWA`,
      `  <span style="color: var(--peach);">status</span>     — Status acadêmico, localização e stack operacional`,
      `  <span style="color: var(--peach);">skills</span>     — Matriz de linguagens, ferramentas e engenharia`,
      `  <span style="color: var(--peach);">contact</span>    — Dados de contato direto (e-mail, GitHub)`,
      `  <span style="color: var(--peach);">clear</span>      — Limpa a tela do terminal`,
    ],
    status: () => [
      `<span style="color: var(--green-ink); font-weight: 800;">[SIDI :: OPERATOR STATUS]</span>`,
      `Operador:       Guilherme Gustavo Weber`,
      `Localização:    Indaiatuba - SP (Brasil)`,
      `Formação:       8º Semestre em Engenharia de Computação (UniEduK)`,
      `Foco Primário:  Arquitetura de Sistemas, IA Autônoma & Engenharia Fullstack`,
      `Disponibilidade: Aberto a novos desafios de engenharia de software`,
    ],
    tharium: () => [
      `<span style="color: var(--gold); font-weight: 800;">[THARIUM HOUSE :: 1º LUGAR TECHDAY UNIEDUK]</span>`,
      `Stack:          Unity 3D, C#, NavMesh, LINQ, Gizmos`,
      `Engine de IA:   AINavMesh.cs com Mapa de Calor Tridimensional`,
      `Algoritmo:      PathRecorder (0.5s) -> 3D Grid Discretizer -> Heatmap Accumulator`,
      `Patrulha:       Ordenação dos 5 nós mais quentes + Embaralhamento Estocástico`,
      `Sensores:       Cone de visão de 120º + Physics.Linecast com máscara de oclusão`,
      `Resultado:      1º Lugar unânime na feira anual de engenharia TechDay`,
    ],
    sidi: () => [
      `<span style="color: var(--green-ink); font-weight: 800;">[SIDI v2.0 :: COPILOTO COGNITIVO PESSOAL]</span>`,
      `Runtime:        100% Python Standard Library (Zero dependências externas)`,
      `Segurança:      AuditLogger com Cadeia Merkle SHA-256 e Taint Tracking`,
      `Memória:        Busca Híbrida SQLite FTS5 (BM25) + RRF (Reciprocal Rank Fusion)`,
      `Grafo Neural:   Plasticidade Hebbiana com decaimento temporal e poda de arestas`,
      `Qualidade:      17/17 testes automatizados aprovados | Mypy Strict Compliant`,
    ],
    novastore: () => [
      `<span style="color: var(--green-ink); font-weight: 800;">[NOVASTORE v3.0 :: E-COMMERCE END-TO-END]</span>`,
      `Backend:        Python 3.15, FastAPI, SQLite com isolamento transacional`,
      `Backoffice:     Painel executivo /admin para gestão de catálogo e pedidos`,
      `Logística:      Rastreamento dinâmico em /track com cálculo real de frete`,
      `Frontend:       Tactile Soft-Neumorphic Dark/Light com micro-interações cinéticas`,
      `Testes:         Suite de testes E2E para checkout, cupons e estorno de estoque`,
    ],
    gould: () => [
      `<span style="color: var(--green-ink); font-weight: 800;">[GOULD MANAGER v1.0 :: BIO-SISTEMAS PWA]</span>`,
      `Domínio:        Manejo e diário digital para Diamantes de Gould`,
      `Madrinhas:      Sincronização cruzada entre gaiolas biológicas e amas de criação`,
      `Cronograma:     Cálculo autônomo de Ovoscopia (+6d), Eclosão (+15d), Anilha (+22d)`,
      `Genética:       Algoritmo de guarda anti-consanguinidade e selos cromáticos`,
    ],
    skills: () => [
      `<span style="color: var(--green-ink); font-weight: 800;">[ARSENAL TÉCNICO]</span>`,
      `• Linguagens:   Python (uv/mypy), C#, C puro, Java, TypeScript, SQL`,
      `• Arquitetura:  Sistemas Autônomos, IA Espacial (NavMesh), SQLite FTS5, PWA`,
      `• Fundamentos:  Teoria dos Grafos, Compiladores (LLVM IR), Alocação de Memória`,
      `• Interface:    HTML5 Semântico, CSS Neumórfico, Vanilla ES6, Figma`,
    ],
    contact: () => [
      `<span style="color: var(--green-ink); font-weight: 800;">[CONTATO DIRETO]</span>`,
      `E-mail:         guilherme7weber@gmail.com`,
      `GitHub:         https://github.com/GuilhermeGustavoWeber`,
      `Localização:    Indaiatuba - SP`,
    ],
  };

  function executeCommand(rawCmd) {
    const cmd = rawCmd.trim().toLowerCase();
    
    // Ecoa o comando digitado
    const echoDiv = document.createElement("div");
    echoDiv.className = "term-line-output";
    echoDiv.innerHTML = `<span style="color: var(--green-ink);">guilherme@weber-os:~$</span> ${escapeHTML(rawCmd)}`;
    termBody.appendChild(echoDiv);

    if (!cmd) return;

    if (cmd === "clear") {
      termBody.innerHTML = "";
      return;
    }

    const handler = COMMANDS[cmd];
    const respDiv = document.createElement("div");
    respDiv.className = "term-line-output";

    if (handler) {
      const lines = handler();
      respDiv.innerHTML = lines.join("<br>");
    } else {
      respDiv.innerHTML = `<span style="color: #FF5F56;">Comando desconhecido: '${escapeHTML(cmd)}'. Digite <span style="color: var(--green-ink); font-weight: 700;">help</span> para listar os comandos.</span>`;
    }

    termBody.appendChild(respDiv);
    termBody.scrollTop = termBody.scrollHeight;
  }

  termInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const val = termInput.value;
      termInput.value = "";
      executeCommand(val);
    }
  });

  cmdPills.forEach((pill) => {
    pill.addEventListener("click", () => {
      const cmd = pill.getAttribute("data-cmd");
      if (cmd) {
        executeCommand(cmd);
      }
    });
  });

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }
}

/* ==========================================================================
   4. SIMULADOR DO MAPA DE CALOR DO THARIUM HOUSE (CANVAS 2D)
   ========================================================================== */

function initThariumHeatmapSimulation() {
  const canvas = document.getElementById("tharium-heatmap-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  function resizeCanvas() {
    canvas.width = canvas.parentElement.clientWidth - 24;
    canvas.height = 180;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  const GRID_SIZE = 16;
  let cols = Math.floor(canvas.width / GRID_SIZE);
  let rows = Math.floor(canvas.height / GRID_SIZE);
  let heatmap = new Array(cols * rows).fill(0);

  // Jogador Simulado
  let player = {
    x: canvas.width * 0.25,
    y: canvas.height * 0.5,
    vx: 1.5,
    vy: 1.2,
  };

  // IA Fantasma (NavMesh Simulado)
  let ghost = {
    x: canvas.width * 0.75,
    y: canvas.height * 0.5,
    speed: 1.8,
    targetX: canvas.width * 0.25,
    targetY: canvas.height * 0.5,
    angle: 0,
    patrolCooldown: 0,
  };

  // Atualiza mapa de calor com base na posicao do jogador
  function recordPlayerPosition() {
    const col = Math.floor(player.x / GRID_SIZE);
    const row = Math.floor(player.y / GRID_SIZE);
    if (col >= 0 && col < cols && row >= 0 && row < rows) {
      const idx = row * cols + col;
      heatmap[idx] = Math.min(255, heatmap[idx] + 8);
    }
  }

  // Decaimento natural do calor da grade
  setInterval(() => {
    for (let i = 0; i < heatmap.length; i++) {
      if (heatmap[i] > 0) heatmap[i] = Math.max(0, heatmap[i] - 1);
    }
  }, 100);

  // Encontra os pontos mais quentes para guiar a patrulha da IA
  function findHottestSpot() {
    let maxVal = 0;
    let bestIdx = -1;
    for (let i = 0; i < heatmap.length; i++) {
      if (heatmap[i] > maxVal) {
        maxVal = heatmap[i];
        bestIdx = i;
      }
    }
    if (bestIdx !== -1 && maxVal > 15) {
      const col = bestIdx % cols;
      const row = Math.floor(bestIdx / cols);
      return { x: col * GRID_SIZE + GRID_SIZE / 2, y: row * GRID_SIZE + GRID_SIZE / 2 };
    }
    return null;
  }

  let animId;
  function loop() {
    ctx.fillStyle = "#030A0C";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 1. Desenha a grade de calor térmico (Interpolação Azul -> Vermelho)
    cols = Math.floor(canvas.width / GRID_SIZE);
    rows = Math.floor(canvas.height / GRID_SIZE);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const val = heatmap[r * cols + c] || 0;
        if (val > 0) {
          const ratio = Math.min(1, val / 120);
          const red = Math.floor(ratio * 255);
          const blue = Math.floor((1 - ratio) * 200);
          const green = Math.floor(Math.sin(ratio * Math.PI) * 120);
          ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${ratio * 0.55})`;
          ctx.fillRect(c * GRID_SIZE, r * GRID_SIZE, GRID_SIZE - 1, GRID_SIZE - 1);
        }
      }
    }

    // 2. Movimenta Jogador em trajeto orgânico
    player.x += player.vx;
    player.y += player.vy;
    if (player.x <= 15 || player.x >= canvas.width - 15) player.vx *= -1;
    if (player.y <= 15 || player.y >= canvas.height - 15) player.vy *= -1;
    recordPlayerPosition();

    // Desenha Jogador (Ponto Esmeralda Tátil)
    ctx.beginPath();
    ctx.arc(player.x, player.y, 6, 0, Math.PI * 2);
    ctx.fillStyle = "#3DB663";
    ctx.shadowColor = "#3DB663";
    ctx.shadowBlur = 12;
    ctx.fill();
    ctx.shadowBlur = 0;

    // 3. IA Fantasma calculando interceptação por Heatmap
    ghost.patrolCooldown--;
    if (ghost.patrolCooldown <= 0) {
      const hotSpot = findHottestSpot();
      if (hotSpot) {
        ghost.targetX = hotSpot.x;
        ghost.targetY = hotSpot.y;
      } else {
        ghost.targetX = player.x;
        ghost.targetY = player.y;
      }
      ghost.patrolCooldown = 40;
    }

    const dx = ghost.targetX - ghost.x;
    const dy = ghost.targetY - ghost.y;
    const dist = Math.hypot(dx, dy);
    if (dist > 3) {
      ghost.x += (dx / dist) * ghost.speed;
      ghost.y += (dy / dist) * ghost.speed;
      ghost.angle = Math.atan2(dy, dx);
    }

    // Desenha Cone de Visão de 120º (Raycast FOV)
    const fov = (120 * Math.PI) / 180;
    const viewRadius = 55;
    ctx.beginPath();
    ctx.moveTo(ghost.x, ghost.y);
    ctx.arc(ghost.x, ghost.y, viewRadius, ghost.angle - fov / 2, ghost.angle + fov / 2);
    ctx.closePath();
    ctx.fillStyle = "rgba(242, 201, 76, 0.12)";
    ctx.fill();
    ctx.strokeStyle = "rgba(242, 201, 76, 0.35)";
    ctx.stroke();

    // Desenha IA Fantasma (Ponto Âmbar/Vermelho)
    ctx.beginPath();
    ctx.arc(ghost.x, ghost.y, 7, 0, Math.PI * 2);
    ctx.fillStyle = "#FF5F56";
    ctx.shadowColor = "#FF5F56";
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.shadowBlur = 0;

    animId = requestAnimationFrame(loop);
  }

  loop();
}

/* ==========================================================================
   5. COPIAR E-MAIL COM UM CLIQUE
   ========================================================================== */

function initEmailCopy() {
  const pill = document.getElementById("email-copy-trigger");
  const feedback = document.getElementById("email-feedback");

  if (!pill) return;

  pill.addEventListener("click", () => {
    const email = "guilherme7weber@gmail.com";
    navigator.clipboard.writeText(email).then(() => {
      if (feedback) {
        feedback.style.display = "inline-block";
        setTimeout(() => {
          feedback.style.display = "none";
        }, 3000);
      }
    });
  });
}

/* ==========================================================================
   6. SCROLL SPY NA NAVBAR EM PILULA
   ========================================================================== */

function initNavScrollSpy() {
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");

  window.addEventListener("scroll", () => {
    let currentId = "";
    const scrollPos = window.scrollY + 160;

    sections.forEach((sec) => {
      if (scrollPos >= sec.offsetTop) {
        currentId = sec.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentId}`) {
        link.classList.add("active");
      }
    });
  });
}

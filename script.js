/**
 * Guilherme Gustavo Weber — Portfolio Interativo v3.0
 * Arquitetura Sovereign Client-Side (Zero dependencias, 100% Vanilla ES6)
 */

document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initCursorSpotlight();
  initInteractiveTerminal();
  initThariumHeatmapSimulation();
  initSidiCorticalGraph();
  initProjectModals();
  initCvModal();
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
        themeIcon.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
      }
    } else {
      htmlEl.removeAttribute("data-theme");
      if (themeIcon) {
        themeIcon.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
      }
    }
  }
}

/* ==========================================================================
   2. SPOTLIGHT E AURORA REATIVA AO CURSOR
   ========================================================================== */

function initCursorSpotlight() {
  window.addEventListener("pointermove", (e) => {
    document.documentElement.style.setProperty("--page-mx", `${e.clientX}px`);
    document.documentElement.style.setProperty("--page-my", `${e.clientY}px`);
  });
}

/* ==========================================================================
   3. CONSOLE COGNITIVO COM HISTÓRICO & AUTO-COMPLETE
   ========================================================================== */

function initInteractiveTerminal() {
  const termBody = document.getElementById("terminal-output");
  const termInput = document.getElementById("terminal-cli-input");
  const cmdPills = document.querySelectorAll(".cmd-pill");

  if (!termBody || !termInput) return;

  const cmdHistory = [];
  let historyIndex = -1;

  const COMMANDS = {
    help: () => [
      `<span style="color: var(--green-ink); font-weight: 700;">COMANDOS DISPONÍVEIS:</span>`,
      `  <span style="color: var(--peach);">tharium</span>    — Arquitetura de IA por Mapa de Calor 3D (1º Lugar TechDay)`,
      `  <span style="color: var(--peach);">sidi</span>       — Especificações do copiloto cognitivo e cadeia Merkle`,
      `  <span style="color: var(--peach);">novastore</span>  — Plataforma E-commerce E2E, FastAPI e backoffice /admin`,
      `  <span style="color: var(--peach);">gould</span>      — Sistema biológico, genealogia cruzada e PWA`,
      `  <span style="color: var(--peach);">status</span>     — Status do operador, universidade e stack`,
      `  <span style="color: var(--peach);">skills</span>     — Matriz técnica de linguagens e arquitetura`,
      `  <span style="color: var(--peach);">cv</span>         — Abre o dossiê executivo de engenharia`,
      `  <span style="color: var(--peach);">contact</span>    — Dados de contato direto (e-mail, GitHub)`,
      `  <span style="color: var(--peach);">clear</span>      — Limpa a tela do terminal`,
    ],
    status: () => [
      `<span style="color: var(--green-ink); font-weight: 800;">[SIDI :: OPERATOR STATUS]</span>`,
      `Operador:       Guilherme Gustavo Weber`,
      `Localização:    Indaiatuba - SP (Brasil)`,
      `Instituição:    Centro Universitário Max Planck (UniMAX)`,
      `Formação:       8º Semestre em Engenharia de Computação`,
      `Conquista:      1º Lugar no TechDay 2025 com o projeto Tharium House`,
      `Disponibilidade: Aberto a novos desafios de engenharia e arquitetura de software`,
    ],
    tharium: () => [
      `<span style="color: var(--gold); font-weight: 800;">[THARIUM HOUSE :: 1º LUGAR TECHDAY 2025 • UNIMAX]</span>`,
      `Stack:          Unity 3D, C#, NavMesh, LINQ, Gizmos`,
      `Engine de IA:   AINavMesh.cs com Mapa de Calor Tridimensional`,
      `Algoritmo:      PathRecorder (0.5s) -> 3D Grid Discretizer -> Heatmap Accumulator`,
      `Patrulha:       Ordenação dos 5 nós mais quentes + Embaralhamento Estocástico`,
      `Sensores:       Cone de visão de 120º + Physics.Linecast com máscara de oclusão`,
      `Resultado:      1º Lugar unânime na feira anual de engenharia TechDay (2025)`,
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
    cv: () => {
      openCvModal();
      return [`<span style="color: var(--green-ink);">Abrindo Dossiê Executivo de Engenharia na tela...</span>`];
    },
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
    echoDiv.innerHTML = `<span style="color: #34D399;">guilherme@weber-os:~$</span> ${escapeHTML(rawCmd)}`;
    termBody.appendChild(echoDiv);

    if (!cmd) return;

    cmdHistory.push(rawCmd);
    historyIndex = cmdHistory.length;

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
      respDiv.innerHTML = `<span style="color: #EF4444;">Comando desconhecido: '${escapeHTML(cmd)}'. Digite <span style="color: #34D399; font-weight: 700;">help</span> para listar os comandos.</span>`;
    }

    termBody.appendChild(respDiv);
    termBody.scrollTop = termBody.scrollHeight;
  }

  termInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const val = termInput.value;
      termInput.value = "";
      executeCommand(val);
    } else if (e.key === "ArrowUp") {
      if (cmdHistory.length > 0 && historyIndex > 0) {
        historyIndex--;
        termInput.value = cmdHistory[historyIndex];
      }
      e.preventDefault();
    } else if (e.key === "ArrowDown") {
      if (historyIndex < cmdHistory.length - 1) {
        historyIndex++;
        termInput.value = cmdHistory[historyIndex];
      } else {
        historyIndex = cmdHistory.length;
        termInput.value = "";
      }
      e.preventDefault();
    } else if (e.key === "Tab") {
      e.preventDefault();
      const current = termInput.value.trim().toLowerCase();
      if (!current) return;
      const match = Object.keys(COMMANDS).find(k => k.startsWith(current));
      if (match) {
        termInput.value = match;
      }
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
   4. SIMULADOR DO THARIUM HOUSE: IA ESPACIAL, FOV 120º & PERSEGUIÇÃO AO ÚLTIMO PONTO VISTO
   ========================================================================== */

function initThariumHeatmapSimulation() {
  const canvas = document.getElementById("tharium-heatmap-canvas");
  const modeBtn = document.getElementById("tharium-mode-btn");
  const clearBtn = document.getElementById("tharium-clear-btn");
  const respawnBtn = document.getElementById("tharium-respawn-btn");
  const modeStatus = document.getElementById("tharium-mode-status");
  const aiStateEl = document.getElementById("tharium-ai-state");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  function resizeCanvas() {
    canvas.width = canvas.parentElement.clientWidth - 24;
    canvas.height = 190;
  }
  resizeCanvas();
  window.addEventListener("resize", () => {
    resizeCanvas();
    updateMapGeometry();
  });

  const GRID_SIZE = 16;
  let cols = Math.floor(canvas.width / GRID_SIZE);
  let rows = Math.floor(canvas.height / GRID_SIZE);
  let heatmap = new Array(cols * rows).fill(0);

  let isProbabilisticMode = true;

  // Estados da IA
  const AI_STATE = {
    PATROL: "PATROL",
    CHASE: "CHASE",
    INVESTIGATE: "INVESTIGATE",
    SEARCHING: "SEARCHING",
  };
  let currentAiState = AI_STATE.PATROL;
  let lastKnownPos = null; // { x, y }
  let searchTimer = 0;
  let searchBaseAngle = 0;
  let alertPulse = 0;

  // Geometria do Labirinto (Pilares e Corredores de Oclusão)
  let obstacles = [];
  let waypoints = [];

  function updateMapGeometry() {
    const w = canvas.width;
    const h = canvas.height;
    cols = Math.floor(w / GRID_SIZE);
    rows = Math.floor(h / GRID_SIZE);
    if (heatmap.length !== cols * rows) {
      heatmap = new Array(cols * rows).fill(0);
    }

    // Pilares verticais criando corredores e quebras de linha de visão
    obstacles = [
      { x: w * 0.28, y: 0, w: 12, h: h * 0.40 },
      { x: w * 0.28, y: h * 0.60, w: 12, h: h * 0.40 },
      { x: w * 0.50, y: h * 0.22, w: 14, h: h * 0.56 },
      { x: w * 0.74, y: 0, w: 12, h: h * 0.42 },
      { x: w * 0.74, y: h * 0.58, w: 12, h: h * 0.42 },
    ];

    waypoints = [
      { x: w * 0.12, y: h * 0.25 },
      { x: w * 0.12, y: h * 0.75 },
      { x: w * 0.38, y: h * 0.18 },
      { x: w * 0.38, y: h * 0.82 },
      { x: w * 0.62, y: h * 0.18 },
      { x: w * 0.62, y: h * 0.82 },
      { x: w * 0.88, y: h * 0.30 },
      { x: w * 0.88, y: h * 0.70 },
      { x: w * 0.50, y: h * 0.10 },
      { x: w * 0.50, y: h * 0.90 },
    ];
  }
  updateMapGeometry();

  // Entidade Jogador (Autônomo navegando o labirinto)
  let player = {
    x: canvas.width * 0.12,
    y: canvas.height * 0.5,
    speed: 1.4,
    currentWaypointIdx: 0,
    radius: 6,
  };

  // Entidade IA Fantasma (NavMesh & Visão 120º)
  let ghost = {
    x: canvas.width * 0.88,
    y: canvas.height * 0.5,
    speed: 1.5,
    targetX: canvas.width * 0.5,
    targetY: canvas.height * 0.5,
    angle: Math.PI,
    patrolCooldown: 0,
    radius: 7,
  };

  function resetPositions() {
    player.x = canvas.width * 0.12;
    player.y = canvas.height * 0.5;
    player.currentWaypointIdx = 0;
    ghost.x = canvas.width * 0.88;
    ghost.y = canvas.height * 0.5;
    ghost.angle = Math.PI;
    ghost.speed = 1.5;
    currentAiState = AI_STATE.PATROL;
    lastKnownPos = null;
    searchTimer = 0;
  }

  // Interseção de Segmento e Retângulo para Oclusão de Visão (Raycast)
  function lineIntersectsLine(p1x, p1y, p2x, p2y, p3x, p3y, p4x, p4y) {
    const denom = (p4y - p3y) * (p2x - p1x) - (p4x - p3x) * (p2y - p1y);
    if (Math.abs(denom) < 0.0001) return false;
    const ua = ((p4x - p3x) * (p1y - p3y) - (p4y - p3y) * (p1x - p3x)) / denom;
    const ub = ((p2x - p1x) * (p1y - p3y) - (p2y - p1y) * (p1x - p3x)) / denom;
    return ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1;
  }

  function lineIntersectsRect(x1, y1, x2, y2, rx, ry, rw, rh) {
    if (x1 >= rx && x1 <= rx + rw && y1 >= ry && y1 <= ry + rh) return true;
    if (x2 >= rx && x2 <= rx + rw && y2 >= ry && y2 <= ry + rh) return true;
    return (
      lineIntersectsLine(x1, y1, x2, y2, rx, ry, rx + rw, ry) ||
      lineIntersectsLine(x1, y1, x2, y2, rx + rw, ry, rx + rw, ry + rh) ||
      lineIntersectsLine(x1, y1, x2, y2, rx, ry + rh, rx + rw, ry + rh) ||
      lineIntersectsLine(x1, y1, x2, y2, rx, ry, rx, ry + rh)
    );
  }

  function hasLineOfSight(x1, y1, x2, y2) {
    for (let i = 0; i < obstacles.length; i++) {
      const o = obstacles[i];
      if (lineIntersectsRect(x1, y1, x2, y2, o.x, o.y, o.w, o.h)) {
        return false;
      }
    }
    return true;
  }

  function resolveEntityCollision(entity, radius) {
    const w = canvas.width;
    const h = canvas.height;
    if (entity.x < radius + 4) entity.x = radius + 4;
    if (entity.x > w - radius - 4) entity.x = w - radius - 4;
    if (entity.y < radius + 4) entity.y = radius + 4;
    if (entity.y > h - radius - 4) entity.y = h - radius - 4;

    for (let i = 0; i < obstacles.length; i++) {
      const o = obstacles[i];
      const nearestX = Math.max(o.x, Math.min(entity.x, o.x + o.w));
      const nearestY = Math.max(o.y, Math.min(entity.y, o.y + o.h));
      const dx = entity.x - nearestX;
      const dy = entity.y - nearestY;
      const distSq = dx * dx + dy * dy;
      if (distSq < radius * radius) {
        const dist = Math.sqrt(distSq) || 1;
        const overlap = radius - dist;
        entity.x += (dx / dist) * overlap;
        entity.y += (dy / dist) * overlap;
      }
    }
  }

  // Alternador de Modo da IA (Heatmap 3D vs Patrulha Cega)
  if (modeBtn) {
    modeBtn.addEventListener("click", () => {
      isProbabilisticMode = !isProbabilisticMode;
      if (isProbabilisticMode) {
        modeBtn.classList.add("active");
        modeBtn.textContent = "Modo: Heatmap 3D";
      } else {
        modeBtn.classList.remove("active");
        modeBtn.textContent = "Modo: Patrulha Cega";
      }
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      heatmap.fill(0);
    });
  }

  if (respawnBtn) {
    respawnBtn.addEventListener("click", () => {
      resetPositions();
    });
  }

  // Registro térmico no mapa de calor
  function recordPlayerPosition() {
    const col = Math.floor(player.x / GRID_SIZE);
    const row = Math.floor(player.y / GRID_SIZE);
    if (col >= 0 && col < cols && row >= 0 && row < rows) {
      const idx = row * cols + col;
      heatmap[idx] = Math.min(255, heatmap[idx] + 16);
    }
  }

  // Resfriamento contínuo da pegada térmica
  setInterval(() => {
    for (let i = 0; i < heatmap.length; i++) {
      if (heatmap[i] > 0) heatmap[i] = Math.max(0, heatmap[i] - 1);
    }
  }, 100);

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

  function loop() {
    ctx.fillStyle = "#040810";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 1. Renderiza Grade Térmica (Heatmap Interpolação Azul -> Vermelho)
    cols = Math.floor(canvas.width / GRID_SIZE);
    rows = Math.floor(canvas.height / GRID_SIZE);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const val = heatmap[r * cols + c] || 0;
        if (val > 0) {
          const ratio = Math.min(1, val / 120);
          const red = Math.floor(ratio * 255);
          const blue = Math.floor((1 - ratio) * 220);
          const green = Math.floor(Math.sin(ratio * Math.PI) * 110);
          ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${ratio * 0.50})`;
          ctx.fillRect(c * GRID_SIZE, r * GRID_SIZE, GRID_SIZE - 1, GRID_SIZE - 1);
        }
      }
    }

    // 2. Renderiza Paredes do Labirinto (Obstáculos Oclusivos)
    ctx.fillStyle = "#0D1826";
    ctx.strokeStyle = "rgba(16, 185, 129, 0.28)";
    ctx.lineWidth = 1.5;
    for (let i = 0; i < obstacles.length; i++) {
      const o = obstacles[i];
      ctx.fillRect(o.x, o.y, o.w, o.h);
      ctx.strokeRect(o.x, o.y, o.w, o.h);
    }

    // 3. Movimentação Autônoma do Jogador
    if (waypoints.length > 0) {
      const currentTarget = waypoints[player.currentWaypointIdx];
      let dirX = currentTarget.x - player.x;
      let dirY = currentTarget.y - player.y;
      const distToTarget = Math.hypot(dirX, dirY);

      if (distToTarget < 16) {
        let nextIdx;
        do {
          nextIdx = Math.floor(Math.random() * waypoints.length);
        } while (nextIdx === player.currentWaypointIdx && waypoints.length > 1);
        player.currentWaypointIdx = nextIdx;
      }

      // Se a IA estiver em perseguição e próxima, o player tenta fugir na direção oposta
      const distToGhost = Math.hypot(player.x - ghost.x, player.y - ghost.y);
      let runSpeed = 1.4;
      if (currentAiState === AI_STATE.CHASE && distToGhost < 140) {
        runSpeed = 2.1;
        const fleeX = player.x - ghost.x;
        const fleeY = player.y - ghost.y;
        const fleeLen = Math.hypot(fleeX, fleeY) || 1;
        dirX = dirX * 0.4 + (fleeX / fleeLen) * distToTarget * 0.6;
        dirY = dirY * 0.4 + (fleeY / fleeLen) * distToTarget * 0.6;
      }

      const moveLen = Math.hypot(dirX, dirY) || 1;
      player.x += (dirX / moveLen) * runSpeed;
      player.y += (dirY / moveLen) * runSpeed;
    }
    resolveEntityCollision(player, player.radius);
    recordPlayerPosition();

    // 4. Checagem de Campo de Visão da IA (FOV 120º + Raycast Oclusivo)
    const fovAngle = (120 * Math.PI) / 180; // 120 graus
    const viewRadius = 115;
    const dx = player.x - ghost.x;
    const dy = player.y - ghost.y;
    const distToPlayer = Math.hypot(dx, dy);

    let playerInSight = false;
    if (distToPlayer <= viewRadius) {
      const angleToPlayer = Math.atan2(dy, dx);
      let diffAngle = angleToPlayer - ghost.angle;
      while (diffAngle < -Math.PI) diffAngle += 2 * Math.PI;
      while (diffAngle > Math.PI) diffAngle -= 2 * Math.PI;

      if (Math.abs(diffAngle) <= fovAngle / 2) {
        if (hasLineOfSight(ghost.x, ghost.y, player.x, player.y)) {
          playerInSight = true;
        }
      }
    }

    // 5. Máquina de Estados da IA Fantasma
    if (playerInSight) {
      // CONTATO VISUAL DIRETO: Perseguição Imediata
      currentAiState = AI_STATE.CHASE;
      lastKnownPos = { x: player.x, y: player.y };
      ghost.targetX = player.x;
      ghost.targetY = player.y;
      ghost.speed = 2.4;
    } else {
      if (currentAiState === AI_STATE.CHASE) {
        // Perdeu contato visual: Entra em investigação do ÚLTIMO PONTO VISTO
        currentAiState = AI_STATE.INVESTIGATE;
        if (lastKnownPos) {
          ghost.targetX = lastKnownPos.x;
          ghost.targetY = lastKnownPos.y;
        }
        ghost.speed = 2.0;
      } else if (currentAiState === AI_STATE.INVESTIGATE) {
        // Rumo ao último ponto visto
        if (lastKnownPos) {
          ghost.targetX = lastKnownPos.x;
          ghost.targetY = lastKnownPos.y;
          const distToLast = Math.hypot(ghost.x - lastKnownPos.x, ghost.y - lastKnownPos.y);
          if (distToLast < 10) {
            // Chegou no último ponto visto: inicia varredura angular
            currentAiState = AI_STATE.SEARCHING;
            searchTimer = 65;
            searchBaseAngle = ghost.angle;
          }
        } else {
          currentAiState = AI_STATE.PATROL;
        }
      } else if (currentAiState === AI_STATE.SEARCHING) {
        // Varredura angular no ponto de alerta
        searchTimer--;
        ghost.angle = searchBaseAngle + Math.sin(searchTimer * 0.14) * 1.25;
        if (searchTimer <= 0) {
          currentAiState = AI_STATE.PATROL;
          lastKnownPos = null;
          ghost.patrolCooldown = 0;
        }
      } else {
        // PATRULHA NORMAL (Heatmap ou Cega)
        ghost.speed = 1.4;
        ghost.patrolCooldown--;
        if (ghost.patrolCooldown <= 0) {
          if (isProbabilisticMode) {
            const hotSpot = findHottestSpot();
            if (hotSpot) {
              ghost.targetX = hotSpot.x;
              ghost.targetY = hotSpot.y;
            } else if (waypoints.length > 0) {
              const randWp = waypoints[Math.floor(Math.random() * waypoints.length)];
              ghost.targetX = randWp.x;
              ghost.targetY = randWp.y;
            }
          } else {
            ghost.targetX = Math.random() * (canvas.width - 40) + 20;
            ghost.targetY = Math.random() * (canvas.height - 40) + 20;
          }
          ghost.patrolCooldown = 50;
        }
      }
    }

    // 6. Atualização de Posição & Ângulo da IA Fantasma
    if (currentAiState !== AI_STATE.SEARCHING) {
      const gdx = ghost.targetX - ghost.x;
      const gdy = ghost.targetY - ghost.y;
      const gdist = Math.hypot(gdx, gdy);
      if (gdist > 3) {
        ghost.x += (gdx / gdist) * ghost.speed;
        ghost.y += (gdist > 0 ? (gdy / gdist) : 0) * ghost.speed;
        const targetAngle = Math.atan2(gdy, gdx);
        let diff = targetAngle - ghost.angle;
        while (diff < -Math.PI) diff += 2 * Math.PI;
        while (diff > Math.PI) diff -= 2 * Math.PI;
        ghost.angle += diff * 0.18;
      }
    }
    resolveEntityCollision(ghost, ghost.radius);

    // 7. Renderização do Marcador "ÚLTIMO PONTO VISTO"
    if (lastKnownPos && (currentAiState === AI_STATE.INVESTIGATE || currentAiState === AI_STATE.SEARCHING)) {
      alertPulse = (alertPulse + 0.08) % (Math.PI * 2);
      const ringRadius = 10 + Math.sin(alertPulse) * 4;

      // Linha tracejada indicando rumo da IA ao ponto
      ctx.beginPath();
      ctx.setLineDash([4, 4]);
      ctx.moveTo(ghost.x, ghost.y);
      ctx.lineTo(lastKnownPos.x, lastKnownPos.y);
      ctx.strokeStyle = "rgba(249, 115, 22, 0.4)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.setLineDash([]);

      // Círculo tático e mira
      ctx.beginPath();
      ctx.arc(lastKnownPos.x, lastKnownPos.y, ringRadius, 0, Math.PI * 2);
      ctx.strokeStyle = "#F97316";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = "#F97316";
      ctx.beginPath();
      ctx.arc(lastKnownPos.x, lastKnownPos.y, 3, 0, Math.PI * 2);
      ctx.fill();

      // Rótulo
      ctx.font = "9px monospace";
      ctx.fillStyle = "#F97316";
      ctx.textAlign = "center";
      ctx.fillText("ÚLTIMO PONTO VISTO", lastKnownPos.x, lastKnownPos.y - 14);
      ctx.textAlign = "start";
    }

    // 8. Renderização do Cone de Visão (120º)
    ctx.beginPath();
    ctx.moveTo(ghost.x, ghost.y);
    ctx.arc(ghost.x, ghost.y, viewRadius, ghost.angle - fovAngle / 2, ghost.angle + fovAngle / 2);
    ctx.closePath();

    if (currentAiState === AI_STATE.CHASE) {
      ctx.fillStyle = "rgba(239, 68, 68, 0.32)";
      ctx.strokeStyle = "#EF4444";
    } else if (currentAiState === AI_STATE.INVESTIGATE || currentAiState === AI_STATE.SEARCHING) {
      ctx.fillStyle = "rgba(249, 115, 22, 0.22)";
      ctx.strokeStyle = "#F97316";
    } else {
      ctx.fillStyle = isProbabilisticMode ? "rgba(245, 158, 11, 0.14)" : "rgba(100, 116, 139, 0.12)";
      ctx.strokeStyle = isProbabilisticMode ? "rgba(245, 158, 11, 0.45)" : "rgba(100, 116, 139, 0.35)";
    }
    ctx.lineWidth = 1.5;
    ctx.fill();
    ctx.stroke();

    // 9. Renderização das Entidades
    // Jogador (Esmeralda com Aura)
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#10B981";
    ctx.fill();

    if (currentAiState === AI_STATE.CHASE) {
      // Pulso de pânico no jogador
      ctx.beginPath();
      ctx.arc(player.x, player.y, player.radius + 5 + Math.sin(alertPulse * 2) * 2, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(239, 68, 68, 0.7)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // IA Fantasma
    ctx.beginPath();
    ctx.arc(ghost.x, ghost.y, ghost.radius, 0, Math.PI * 2);
    if (currentAiState === AI_STATE.CHASE) {
      ctx.fillStyle = "#EF4444";
    } else if (currentAiState === AI_STATE.INVESTIGATE || currentAiState === AI_STATE.SEARCHING) {
      ctx.fillStyle = "#F97316";
    } else {
      ctx.fillStyle = isProbabilisticMode ? "#F59E0B" : "#94A3B8";
    }
    ctx.fill();

    // Vetor de Orientação da IA
    ctx.beginPath();
    ctx.moveTo(ghost.x, ghost.y);
    ctx.lineTo(ghost.x + Math.cos(ghost.angle) * 12, ghost.y + Math.sin(ghost.angle) * 12);
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 2;
    ctx.stroke();

    // 10. Atualização de Telemetria no DOM
    if (modeStatus && aiStateEl) {
      if (currentAiState === AI_STATE.CHASE) {
        modeStatus.textContent = "ALERTA: CONTATO VISUAL!";
        modeStatus.style.color = "#EF4444";
        aiStateEl.textContent = "PERSEGUINDO PLAYER (VELOCIDADE MÁXIMA)";
        aiStateEl.style.color = "#EF4444";
      } else if (currentAiState === AI_STATE.INVESTIGATE) {
        modeStatus.textContent = "INVESTIGANDO ÚLTIMO PONTO VISTO";
        modeStatus.style.color = "#F97316";
        aiStateEl.textContent = "CONTATO PERDIDO • INDO AO ÚLTIMO PONTO VISTO";
        aiStateEl.style.color = "#F97316";
      } else if (currentAiState === AI_STATE.SEARCHING) {
        modeStatus.textContent = "VARRENDO ÁREA DO ALERTA";
        modeStatus.style.color = "#F97316";
        aiStateEl.textContent = "BUSCANDO REENGANAJAMENTO VISUAL";
        aiStateEl.style.color = "#F97316";
      } else {
        modeStatus.textContent = isProbabilisticMode ? "PATRULHA TÉRMICA (HEATMAP 3D)" : "PATRULHA CEGA (RANDOM)";
        modeStatus.style.color = isProbabilisticMode ? "var(--gold)" : "var(--muted)";
        aiStateEl.textContent = isProbabilisticMode ? "RASTREAMENTO DINÂMICO VIA HEATMAP" : "MOVIMENTAÇÃO ALEATÓRIA";
        aiStateEl.style.color = "var(--green-ink)";
      }
    }

    requestAnimationFrame(loop);
  }

  loop();
}

/* ==========================================================================
   5. SIMULADOR CORTICAL HEBBIANO DO SIDI (CANVAS 2D)
   ========================================================================== */

function initSidiCorticalGraph() {
  const canvas = document.getElementById("sidi-graph-canvas");
  const statusEl = document.getElementById("sidi-pulse-status");
  const pulseBtns = document.querySelectorAll(".sidi-pulse-btn");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  function resizeCanvas() {
    canvas.width = canvas.parentElement.clientWidth - 24;
    canvas.height = 140;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  // Nós Corticais
  const nodes = [
    { id: "frontal", label: "Frontal (Merkle)", x: 0.22, y: 0.35, lobe: "frontal", energy: 1.0 },
    { id: "parietal", label: "Parietal (FTS5)", x: 0.50, y: 0.25, lobe: "parietal", energy: 1.0 },
    { id: "temporal", label: "Temporal (Consol.)", x: 0.78, y: 0.35, lobe: "temporal", energy: 1.0 },
    { id: "occipital", label: "Occipital (HUD)", x: 0.65, y: 0.75, lobe: "occipital", energy: 1.0 },
    { id: "limbico", label: "Límbico (Operador)", x: 0.35, y: 0.75, lobe: "limbico", energy: 1.0 },
  ];

  // Sinapses Hebbianas
  const edges = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [0, 2], [1, 4]
  ];

  let particles = [];

  function triggerLobePulse(lobeName) {
    const targetIdx = nodes.findIndex(n => n.lobe === lobeName);
    if (targetIdx !== -1) {
      nodes[targetIdx].energy = 3.5;
      if (statusEl) {
        statusEl.textContent = `PULSO: ${nodes[targetIdx].label.toUpperCase()}`;
        statusEl.style.color = "#34D399";
        setTimeout(() => {
          statusEl.textContent = "ESTÁVEL";
        }, 1800);
      }

      // Dispara particulas através das sinapses
      edges.forEach(([src, tgt]) => {
        if (src === targetIdx || tgt === targetIdx) {
          const from = src === targetIdx ? src : tgt;
          const to = src === targetIdx ? tgt : src;
          particles.push({
            fromNode: from,
            toNode: to,
            progress: 0,
            speed: 0.035,
          });
        }
      });
    }
  }

  pulseBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const lobe = btn.getAttribute("data-lobe");
      if (lobe) triggerLobePulse(lobe);
    });
  });

  function loop() {
    ctx.fillStyle = "#040810";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const w = canvas.width;
    const h = canvas.height;

    // 1. Desenha Sinapses
    ctx.lineWidth = 1.5;
    edges.forEach(([i, j]) => {
      const n1 = nodes[i];
      const n2 = nodes[j];
      ctx.beginPath();
      ctx.moveTo(n1.x * w, n1.y * h);
      ctx.lineTo(n2.x * w, n2.y * h);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.stroke();
    });

    // 2. Partículas de Energia
    for (let p = particles.length - 1; p >= 0; p--) {
      const pt = particles[p];
      pt.progress += pt.speed;
      const n1 = nodes[pt.fromNode];
      const n2 = nodes[pt.toNode];
      const px = (n1.x + (n2.x - n1.x) * pt.progress) * w;
      const py = (n1.y + (n2.y - n1.y) * pt.progress) * h;

      ctx.beginPath();
      ctx.arc(px, py, 3, 0, Math.PI * 2);
      ctx.fillStyle = "#10B981";
      ctx.fill();

      if (pt.progress >= 1) {
        nodes[pt.toNode].energy = Math.min(3.0, nodes[pt.toNode].energy + 0.8);
        particles.splice(p, 1);
      }
    }

    // 3. Desenha Nós Corticais
    nodes.forEach(n => {
      if (n.energy > 1.0) n.energy = Math.max(1.0, n.energy - 0.02);

      const nx = n.x * w;
      const ny = n.y * h;
      const radius = 6 * n.energy;

      ctx.beginPath();
      ctx.arc(nx, ny, radius, 0, Math.PI * 2);
      ctx.fillStyle = n.energy > 1.2 ? "#34D399" : "#1E293B";
      ctx.fill();
      ctx.strokeStyle = "#10B981";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.font = "9px JetBrains Mono, monospace";
      ctx.fillStyle = "#94A3B8";
      ctx.textAlign = "center";
      ctx.fillText(n.label, nx, ny + 16);
    });

    requestAnimationFrame(loop);
  }

  loop();
}

/* ==========================================================================
   6. MODAL DE ARQUITETURA DETALHADA DOS PROJETOS
   ========================================================================== */

const PROJECT_DETAILS = {
  tharium: {
    title: "Tharium House — 1º Lugar no TechDay 2025 (UniMAX)",
    tags: ["Unity 3D", "C#", "NavMesh", "IA Preditiva", "Gizmos"],
    link: "https://github.com/GuilhermeGustavoWeber",
    body: `
      <h4>O Desafio de Engenharia</h4>
      <p>Em jogos de stealth tradicionais, a inteligência artificial usa rotas de patrulha fixas ou movimentos aleatórios (Random Walk), tornando o jogo previsível ou passivo. O objetivo foi criar uma IA estocástica que <strong>aprendesse com o comportamento real do jogador</strong> entre as partidas e calculasse interceptações preditivas nas zonas mais percorridas.</p>
      
      <h4>A Arquitetura Implementada</h4>
      <p>1. <strong>PathRecorder.cs:</strong> Coleta vetores tridimensionais (x, y, z) do jogador a cada 0.5s e os acumula no <code>GameManager.allPlayerPaths</code> cross-sessão.</p>
      <p>2. <strong>Matriz de Calor Tridimensional (AINavMesh.cs):</strong> Discretiza as coordenadas num grid cúbico e calcula a densidade de frequência em <code>Dictionary&lt;Vector3, int&gt; heatmap</code>.</p>
      <p>3. <strong>Roteamento Probabilístico LINQ:</strong> A IA ordena as 5 zonas mais quentes e aplica embaralhamento estocástico para gerar um plano de patrulha dinâmico e imprevisível.</p>
      <p>4. <strong>Visão Cônica de 120º:</strong> Deteção física com <code>Physics.Linecast</code> para ignorar o jogador caso haja paredes entre o fantasma e ele.</p>

      <h4>Trecho Real do Código de IA (C# / Unity)</h4>
      <div class="code-box">
void GenerateNewHeatmapPatrolRoute()<br>
{<br>
&nbsp;&nbsp;if (heatmap == null || heatmap.Count == 0) return;<br>
&nbsp;&nbsp;// Pega os 5 pontos mais quentes e embaralha a rota<br>
&nbsp;&nbsp;currentHeatmapPatrolRoute = heatmap.OrderByDescending(s =&gt; s.Value)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.Take(5)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.Select(s =&gt; s.Key)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.OrderBy(x =&gt; Random.value)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.ToList();<br>
&nbsp;&nbsp;patrolRouteIndex = 0;<br>
}
      </div>
    `
  },
  sidi: {
    title: "SIDI v2.0 — Copiloto Cognitivo Pessoal com Soberania Técnica",
    tags: ["Python 100% Stdlib", "SQLite FTS5", "Cadeia Merkle", "Grafo Hebbiano"],
    link: "https://github.com/GuilhermeGustavoWeber/sidi",
    body: `
      <h4>O Desafio de Engenharia</h4>
      <p>Criar um copiloto de engenharia soberano capaz de operar continuamente com memória durável, governança ética rigorosa e persistência estruturada sem depender de bibliotecas externas frágeis ou serviços de terceiros que possam quebrar entre máquinas.</p>

      <h4>Componentes Centrais</h4>
      <p>1. <strong>Cadeia Merkle SHA-256 (security.py):</strong> Log imutável append-only onde cada evento possui hash encadeado <code>row_hash = sha256(prev_hash | payload)</code>, auditável via <code>verify_chain()</code>.</p>
      <p>2. <strong>Memória Híbrida RRF (hybrid_memory.py):</strong> Fusão de busca textual exata em SQLite FTS5 (BM25) com ativação hebbiana propagada no grafo.</p>
      <p>3. <strong>Consolidador Determinístico (consolidator.py):</strong> Destilação de memórias episódicas para fatos semânticos com quarentena automática para injeções de prompt e decaimento temporal de sinapses.</p>

      <h4>Trecho Real da Cadeia Merkle (Python stdlib)</h4>
      <div class="code-box">
prev_hash = self.tail_hash()<br>
hash_input = f"{prev_hash}|{event.timestamp}|{event.event_type.value}|{event.content_preview}"<br>
row_hash = hashlib.sha256(hash_input.encode("utf-8")).hexdigest()<br>
self._conn.execute(<br>
&nbsp;&nbsp;"INSERT INTO security_events (timestamp, event_type, row_hash, prev_hash) VALUES (?, ?, ?, ?)",<br>
&nbsp;&nbsp;(event.timestamp, event.event_type.value, row_hash, prev_hash)<br>
)
      </div>
    `
  },
  novastore: {
    title: "NovaStore v3.0 — Plataforma E-Commerce E2E",
    tags: ["FastAPI", "Python 3.15", "SQLite Transacional", "Soft-Neumorphic"],
    link: "https://github.com/GuilhermeGustavoWeber/novastore",
    body: `
      <h4>O Desafio de Engenharia</h4>
      <p>Construir uma plataforma comercial de ponta a ponta com backoffice administrativo real, rastreamento logístico para o cliente e experiência tátil de altíssimo padrão com suporte a Dark e Light Mode.</p>

      <h4>Destaques de Implementação</h4>
      <p>• <strong>Backoffice /admin:</strong> Gestão de estoque com estorno automático em cancelamentos ou expiração de pedidos.</p>
      <p>• <strong>Logística em /track:</strong> Cálculo e rastreamento de entregas por CEP com histórico de status dinâmico.</p>
      <p>• <strong>Suite de Testes E2E:</strong> Testes automatizados cobrindo cupons de desconto, cálculo de frete e integridade transacional.</p>
    `
  },
  gould: {
    title: "Gould Manager v1.0 — Manejo & Bio-Sistemas PWA",
    tags: ["PWA", "Python", "SQLite", "Genética"],
    link: "https://github.com/GuilhermeGustavoWeber",
    body: `
      <h4>O Desafio de Engenharia</h4>
      <p>Digitalizar o manejo complexo de um criadouro de Diamantes de Gould, onde casais biológicos frequentemente transferem ovos para amas/madrinhas, gerando alto risco de perda genealógica e cruzamentos consanguíneos.</p>

      <h4>Destaques de Implementação</h4>
      <p>• <strong>Diário Cronológico por Gaiola:</strong> Interface de caderno físico com botões de 1 toque.</p>
      <p>• <strong>Sincronização Cruzada de Madrinhas:</strong> Vincula os ovos à gaiola da ama sem perder o registro genético dos pais biológicos.</p>
      <p>• <strong>Guarda Anti-Consanguinidade:</strong> Algoritmo em grafo que impede cruzamentos entre irmãos ou pais e filhos.</p>
    `
  },
  pedidos: {
    title: "API de Pedidos em C Puro",
    tags: ["Linguagem C", "Baixo Nível", "Gestão de Memória", "POSIX"],
    link: "https://github.com/GuilhermeGustavoWeber/api-pedidos-main",
    body: `
      <h4>O Desafio de Engenharia</h4>
      <p>Demonstrar domínio sobre a camada fundamental da computação: gerenciamento estrito de memória heap com malloc/free, ponteiros, structs e processamento veloz de pedidos sem garbage collector.</p>
    `
  },
  grafos: {
    title: "Teoria dos Grafos & Algoritmos em Java",
    tags: ["Java", "OOP", "Estruturas de Dados", "Grafos"],
    link: "https://github.com/GuilhermeGustavoWeber/grafos-main",
    body: `
      <h4>O Desafio de Engenharia</h4>
      <p>Modelagem formal de estruturas de dados de grafos (direcionados, ponderados, matrizes e listas de adjacência) e implementação de algoritmos de caminhamento e busca em largura e profundidade (BFS e DFS).</p>
    `
  }
};

function initProjectModals() {
  const modalBackdrop = document.getElementById("project-modal");
  const modalTitle = document.getElementById("modal-project-title");
  const modalTags = document.getElementById("modal-project-tags");
  const modalBody = document.getElementById("modal-project-body");
  const modalLink = document.getElementById("modal-project-link");
  const closeBtn = document.getElementById("modal-close-btn");
  const detailBtns = document.querySelectorAll(".btn-details");

  if (!modalBackdrop || !modalTitle) return;

  function openModal(projectKey) {
    const data = PROJECT_DETAILS[projectKey];
    if (!data) return;

    modalTitle.textContent = data.title;
    modalTags.innerHTML = data.tags.map(t => `<span class="tag-badge">${t}</span>`).join("");
    modalBody.innerHTML = data.body;
    modalLink.href = data.link;

    modalBackdrop.classList.add("open");
    modalBackdrop.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modalBackdrop.classList.remove("open");
    modalBackdrop.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  detailBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const proj = btn.getAttribute("data-project");
      if (proj) openModal(proj);
    });
  });

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  modalBackdrop.addEventListener("click", (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalBackdrop.classList.contains("open")) {
      closeModal();
    }
  });
}

/* ==========================================================================
   7. MODAL DE CV / DOSSIÊ EXECUTIVO
   ========================================================================== */

function openCvModal() {
  const cvModal = document.getElementById("cv-modal");
  if (cvModal) {
    cvModal.classList.add("open");
    cvModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
}

function initCvModal() {
  const cvModal = document.getElementById("cv-modal");
  const openBtn = document.getElementById("open-cv-btn");
  const closeBtn = document.getElementById("cv-modal-close-btn");

  if (!cvModal) return;

  function close() {
    cvModal.classList.remove("open");
    cvModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  if (openBtn) openBtn.addEventListener("click", openCvModal);
  if (closeBtn) closeBtn.addEventListener("click", close);

  cvModal.addEventListener("click", (e) => {
    if (e.target === cvModal) close();
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && cvModal.classList.contains("open")) {
      close();
    }
  });
}

/* ==========================================================================
   8. COPIAR E-MAIL COM UM CLIQUE
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
   9. SCROLL SPY NA NAVBAR EM PILULA
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

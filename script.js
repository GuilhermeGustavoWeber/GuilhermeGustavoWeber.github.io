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
   4. SIMULADOR DO THARIUM HOUSE (CANVAS 2D)
      - Transição contínua entre os pontos mais quentes (Heatmap)
      - Detecção no FOV 120º e perseguição até o último ponto visto
      - Velocidade da IA calibrada inferior à do jogador (IA não é mais rápida)
   ========================================================================== */

function initThariumHeatmapSimulation() {
  const canvas = document.getElementById("tharium-heatmap-canvas");
  const statusBadge = document.getElementById("tharium-status-badge");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const GRID_SIZE = 16;
  let cols = 0;
  let rows = 0;
  let heatmap = [];

  function resizeCanvas() {
    canvas.width = Math.max(300, (canvas.parentElement ? canvas.parentElement.clientWidth : 600) - 24);
    canvas.height = 260;
    cols = Math.floor(canvas.width / GRID_SIZE);
    rows = Math.floor(canvas.height / GRID_SIZE);
    heatmap = new Array(cols * rows).fill(0);
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  // Zonas Arquiteturais do Casarão (Cômodos e Corredores do Tharium House)
  const ZONES = [
    { xRatio: 0.18, yRatio: 0.28 }, // Sala Noroeste (Biblioteca)
    { xRatio: 0.50, yRatio: 0.25 }, // Corredor Norte
    { xRatio: 0.82, yRatio: 0.28 }, // Sala Nordeste (Quarto Principal)
    { xRatio: 0.50, yRatio: 0.52 }, // Hall Central
    { xRatio: 0.18, yRatio: 0.74 }, // Sala Sudoeste (Cozinha)
    { xRatio: 0.50, yRatio: 0.76 }, // Corredor Sul
    { xRatio: 0.82, yRatio: 0.74 }, // Sala Sudeste (Porão / Depósito)
  ];

  let currentZoneIdx = 0;
  let playerLinger = 25;

  function getZoneCoord(idx) {
    const z = ZONES[idx];
    return {
      x: z.xRatio * canvas.width + (Math.random() - 0.5) * 36,
      y: z.yRatio * canvas.height + (Math.random() - 0.5) * 24,
    };
  }

  // Jogador Simulado (Navega organicamente entre cômodos em 2D com velocidade ~1.95 px/frame)
  let player = {
    x: canvas.width * 0.25,
    y: canvas.height * 0.5,
    vx: 1.2,
    vy: 1.0,
    speed: 1.95,
  };
  let playerTarget = getZoneCoord(0);

  // IA Fantasma (Velocidades: Patrulha 1.20, Rumo ao último ponto 1.40, Perseguição 1.60 - sempre < jogador 1.95)
  let ghost = {
    x: canvas.width * 0.75,
    y: canvas.height * 0.5,
    targetX: canvas.width * 0.25,
    targetY: canvas.height * 0.5,
    angle: Math.PI,
    state: "PATROL", // "PATROL", "CHASE", "PURSUING_LAST_SEEN"
    lastSeenPoint: null, // { x, y }
    currentPatrolSpot: null,
    patrolIndex: 0,
    chaseTimer: 180, // Limite de perseguição contínua (~3 segundos a 60fps)
    chaseCooldown: 0, // Período refratário após perseguição para obrigar patrulha
  };

  // Gravação contínua do rastro de calor com difusão suave
  function recordPlayerPosition() {
    const col = Math.floor(player.x / GRID_SIZE);
    const row = Math.floor(player.y / GRID_SIZE);
    if (col >= 0 && col < cols && row >= 0 && row < rows) {
      const idx = row * cols + col;
      heatmap[idx] = Math.min(255, heatmap[idx] + 8);
      // Difusão suave para as células vizinhas (efeito térmico esférico contínuo)
      if (col > 0) heatmap[idx - 1] = Math.min(255, heatmap[idx - 1] + 2);
      if (col < cols - 1) heatmap[idx + 1] = Math.min(255, heatmap[idx + 1] + 2);
      if (row > 0) heatmap[idx - cols] = Math.min(255, heatmap[idx - cols] + 2);
      if (row < rows - 1) heatmap[idx + cols] = Math.min(255, heatmap[idx + cols] + 2);
    }
  }

  // Resfriamento contínuo da grade térmica
  setInterval(() => {
    for (let i = 0; i < heatmap.length; i++) {
      if (heatmap[i] > 0) heatmap[i] = Math.max(0, heatmap[i] - 1);
    }
  }, 90);

  // Extrai múltiplos centros de calor distintos para a IA transitar entre eles (focado nos 15 mais quentes)
  function getTopHotSpots() {
    let spots = [];
    for (let i = 0; i < heatmap.length; i++) {
      if (heatmap[i] > 18) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        spots.push({
          x: col * GRID_SIZE + GRID_SIZE / 2,
          y: row * GRID_SIZE + GRID_SIZE / 2,
          val: heatmap[i],
        });
      }
    }
    spots.sort((a, b) => b.val - a.val);

    // Considera estritamente os 15 pontos mais quentes
    const top15 = spots.slice(0, 15);

    // Filtra pontos espaçados em pelo menos 38px
    let distinct = [];
    for (let i = 0; i < top15.length; i++) {
      const s = top15[i];
      if (distinct.every(d => Math.hypot(d.x - s.x, d.y - s.y) > 38)) {
        distinct.push(s);
        if (distinct.length >= 5) break;
      }
    }
    return distinct;
  }

  function loop() {
    ctx.fillStyle = "#040810";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 1. Grade de Calor Térmico (Exatamente no máximo 15 pontos mais vermelhos/quentes)
    cols = Math.floor(canvas.width / GRID_SIZE);
    rows = Math.floor(canvas.height / GRID_SIZE);

    let activeCells = [];
    for (let i = 0; i < heatmap.length; i++) {
      if (heatmap[i] > 0) {
        activeCells.push({ idx: i, val: heatmap[i] });
      }
    }

    // Ordena pelo maior valor de calor
    activeCells.sort((a, b) => b.val - a.val);

    // Mapeia rigorosamente os top 15 pontos mais quentes
    const top15Map = new Map();
    const topLimit = Math.min(15, activeCells.length);
    for (let rank = 0; rank < topLimit; rank++) {
      top15Map.set(activeCells[rank].idx, rank);
    }

    // Renderiza células ativas
    for (let i = 0; i < activeCells.length; i++) {
      const cell = activeCells[i];
      const c = cell.idx % cols;
      const r = Math.floor(cell.idx / cols);

      if (top15Map.has(cell.idx)) {
        // TOP 15: PONTOS MAIS VERMELHOS (Gradiente vibrante de calor carmesim/vermelho)
        const rank = top15Map.get(cell.idx);
        const heatNorm = 1 - rank / 15; // 1.0 (hottest) a 0.07 (15th)
        const red = 235 + Math.floor(heatNorm * 20);
        const green = Math.floor((1 - heatNorm) * 55);
        const blue = Math.floor((1 - heatNorm) * 40);
        const alpha = 0.45 + heatNorm * 0.40; // 0.45 a 0.85

        ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
        ctx.fillRect(c * GRID_SIZE, r * GRID_SIZE, GRID_SIZE - 1, GRID_SIZE - 1);
      } else {
        // DEMAIS PONTOS: Rastros frios (Azul sutil, nunca vermelho)
        const coldRatio = Math.min(1, cell.val / 100);
        const alpha = coldRatio * 0.20;
        ctx.fillStyle = `rgba(37, 99, 235, ${alpha})`;
        ctx.fillRect(c * GRID_SIZE, r * GRID_SIZE, GRID_SIZE - 1, GRID_SIZE - 1);
      }
    }

    // Decrementa cooldown de reativação de perseguição
    if (ghost.chaseCooldown > 0) {
      ghost.chaseCooldown--;
    }

    // 2. Movimentação do Jogador em 2D (Exploração de Cômodos e Evasão Inteligente)
    const distToGhost = Math.hypot(player.x - ghost.x, player.y - ghost.y);
    const isUnderThreat = ghost.state === "CHASE" || (distToGhost < 85 && ghost.chaseCooldown <= 0);

    if (isUnderThreat) {
      // EVASÃO TÁTICA: Foge para o cômodo/zona do mapa mais distante da IA
      let bestDist = -1;
      let bestIdx = currentZoneIdx;
      for (let i = 0; i < ZONES.length; i++) {
        const zx = ZONES[i].xRatio * canvas.width;
        const zy = ZONES[i].yRatio * canvas.height;
        const dGhost = Math.hypot(zx - ghost.x, zy - ghost.y);
        if (dGhost > bestDist) {
          bestDist = dGhost;
          bestIdx = i;
        }
      }
      currentZoneIdx = bestIdx;
      playerTarget = {
        x: ZONES[bestIdx].xRatio * canvas.width,
        y: ZONES[bestIdx].yRatio * canvas.height,
      };
      playerLinger = 0; // Fuga contínua sem parar
    }

    if (playerLinger > 0 && !isUnderThreat) {
      // Jogador investiga a sala atual (desacelera e concentra calor térmico)
      playerLinger--;
      player.vx *= 0.85;
      player.vy *= 0.85;
    } else {
      const pdx = playerTarget.x - player.x;
      const pdy = playerTarget.y - player.y;
      const pdist = Math.hypot(pdx, pdy);

      if (pdist < 22 && !isUnderThreat) {
        // Chegou na sala de destino: pausa para explorar e escolhe novo cômodo
        playerLinger = Math.floor(Math.random() * 25) + 20; // 20-45 frames
        let nextIdx;
        do {
          nextIdx = Math.floor(Math.random() * ZONES.length);
        } while (nextIdx === currentZoneIdx);
        currentZoneIdx = nextIdx;
        playerTarget = getZoneCoord(nextIdx);
      } else {
        const desiredVx = (pdx / (pdist || 1)) * player.speed;
        const desiredVy = (pdy / (pdist || 1)) * player.speed;

        // Suaviza a curva de deslocamento em 2D
        player.vx = player.vx * 0.88 + desiredVx * 0.12;
        player.vy = player.vy * 0.88 + desiredVy * 0.12;

        const curSpd = Math.hypot(player.vx, player.vy) || 1;
        player.vx = (player.vx / curSpd) * player.speed;
        player.vy = (player.vy / curSpd) * player.speed;
      }
    }

    player.x += player.vx;
    player.y += player.vy;

    // Confinamento de segurança suave dentro do canvas
    player.x = Math.max(18, Math.min(canvas.width - 18, player.x));
    player.y = Math.max(18, Math.min(canvas.height - 18, player.y));

    recordPlayerPosition();

    // Desenha Jogador (Ponto Esmeralda com halo suave)
    ctx.beginPath();
    ctx.arc(player.x, player.y, 6, 0, Math.PI * 2);
    ctx.fillStyle = "#10B981";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(player.x, player.y, 9, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(16, 185, 129, 0.4)";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // 3. Verificação de Visão da IA (Cone de 120º e Raio de Visão de 90px)
    const fov = (120 * Math.PI) / 180;
    const viewRadius = 90;
    const dx = player.x - ghost.x;
    const dy = player.y - ghost.y;
    const distToPlayer = Math.hypot(dx, dy);

    let playerInView = false;
    // Só engaja perseguição se o cooldown de patrulha tiver expirado
    if (distToPlayer <= viewRadius && ghost.chaseCooldown <= 0) {
      const angleToPlayer = Math.atan2(dy, dx);
      let diffAngle = angleToPlayer - ghost.angle;
      while (diffAngle < -Math.PI) diffAngle += 2 * Math.PI;
      while (diffAngle > Math.PI) diffAngle -= 2 * Math.PI;

      if (Math.abs(diffAngle) <= fov / 2) {
        playerInView = true;
      }
    }

    // Se o fantasma interceptar o jogador diretamente (colisão física < 12px), encerra perseguição
    if (distToPlayer < 12) {
      ghost.lastSeenPoint = null;
      ghost.state = "PATROL";
      ghost.chaseCooldown = 120;
      ghost.chaseTimer = 180;
      ghost.currentPatrolSpot = null;
    }

    // 4. Máquina de Estados e Velocidade (IA calibrada para ser mais lenta que o jogador)
    let currentSpeed = 1.20;

    if (playerInView) {
      ghost.chaseTimer--;
      if (ghost.chaseTimer <= 0) {
        // Fadiga de Perseguição: Desiste após ~3s e foca no último ponto visto
        ghost.state = "PURSUING_LAST_SEEN";
        ghost.lastSeenPoint = { x: player.x, y: player.y };
        ghost.chaseCooldown = 120; // 2s de patrulha obrigatória
        ghost.chaseTimer = 180;
      } else {
        // VISÃO CONFIRMADA: Persegue o jogador diretamente
        ghost.state = "CHASE";
        currentSpeed = 1.60; // Mais lento que o jogador (1.95)
        ghost.targetX = player.x;
        ghost.targetY = player.y;
        ghost.lastSeenPoint = { x: player.x, y: player.y };
      }
    } else if (ghost.lastSeenPoint !== null) {
      // PERDEU DE VISTA: Desloca até o último ponto onde conseguiu ver o jogador
      ghost.state = "PURSUING_LAST_SEEN";
      currentSpeed = 1.40;
      ghost.targetX = ghost.lastSeenPoint.x;
      ghost.targetY = ghost.lastSeenPoint.y;

      const distToLast = Math.hypot(ghost.lastSeenPoint.x - ghost.x, ghost.lastSeenPoint.y - ghost.y);
      if (distToLast < 14) {
        // Alcançou o último ponto visto: encerra perseguição e volta a transitar nos pontos quentes
        ghost.lastSeenPoint = null;
        ghost.state = "PATROL";
        ghost.currentPatrolSpot = null;
        ghost.chaseCooldown = 90; // 1.5s mínimo de patrulha térmica antes de nova visão
        ghost.chaseTimer = 180;
      }
    } else {
      // PATRULHA NORMAL: Transita ciclicamente entre os pontos mais quentes
      ghost.state = "PATROL";
      currentSpeed = 1.20;
      ghost.chaseTimer = 180;

      const hotSpots = getTopHotSpots();
      if (hotSpots.length > 0) {
        if (!ghost.currentPatrolSpot || Math.hypot(ghost.currentPatrolSpot.x - ghost.x, ghost.currentPatrolSpot.y - ghost.y) < 22) {
          ghost.patrolIndex = (ghost.patrolIndex + 1) % hotSpots.length;
          ghost.currentPatrolSpot = hotSpots[ghost.patrolIndex];
        }
        ghost.targetX = ghost.currentPatrolSpot.x;
        ghost.targetY = ghost.currentPatrolSpot.y;
      } else {
        if (Math.hypot(ghost.targetX - ghost.x, ghost.targetY - ghost.y) < 20) {
          ghost.targetX = Math.random() * (canvas.width - 40) + 20;
          ghost.targetY = Math.random() * (canvas.height - 40) + 20;
        }
      }
    }

    // 5. Atualização de Posição e Orientação do Fantasma
    const tdx = ghost.targetX - ghost.x;
    const tdy = ghost.targetY - ghost.y;
    const tdist = Math.hypot(tdx, tdy);
    if (tdist > 3) {
      ghost.x += (tdx / tdist) * currentSpeed;
      ghost.y += (tdy / tdist) * currentSpeed;

      const targetAngle = Math.atan2(tdy, tdx);
      let diff = targetAngle - ghost.angle;
      while (diff < -Math.PI) diff += 2 * Math.PI;
      while (diff > Math.PI) diff -= 2 * Math.PI;
      ghost.angle += diff * 0.14;
    }

    // 6. Marcador do Último Ponto Visto
    if (ghost.lastSeenPoint && ghost.state === "PURSUING_LAST_SEEN") {
      ctx.beginPath();
      ctx.setLineDash([3, 3]);
      ctx.moveTo(ghost.x, ghost.y);
      ctx.lineTo(ghost.lastSeenPoint.x, ghost.lastSeenPoint.y);
      ctx.strokeStyle = "rgba(249, 115, 22, 0.45)";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.beginPath();
      ctx.arc(ghost.lastSeenPoint.x, ghost.lastSeenPoint.y, 5, 0, Math.PI * 2);
      ctx.strokeStyle = "#F97316";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.font = "8px monospace";
      ctx.fillStyle = "#F97316";
      ctx.textAlign = "center";
      ctx.fillText("ÚLTIMO PONTO", ghost.lastSeenPoint.x, ghost.lastSeenPoint.y - 7);
      ctx.textAlign = "start";
    }

    // 7. Renderização do Cone de Visão de 120º
    ctx.beginPath();
    ctx.moveTo(ghost.x, ghost.y);
    ctx.arc(ghost.x, ghost.y, viewRadius, ghost.angle - fov / 2, ghost.angle + fov / 2);
    ctx.closePath();

    if (ghost.state === "CHASE") {
      ctx.fillStyle = "rgba(239, 68, 68, 0.28)";
      ctx.strokeStyle = "#EF4444";
    } else if (ghost.state === "PURSUING_LAST_SEEN") {
      ctx.fillStyle = "rgba(249, 115, 22, 0.20)";
      ctx.strokeStyle = "#F97316";
    } else {
      ctx.fillStyle = "rgba(245, 158, 11, 0.12)";
      ctx.strokeStyle = "rgba(245, 158, 11, 0.35)";
    }
    ctx.lineWidth = 1.5;
    ctx.fill();
    ctx.stroke();

    // 8. Renderização do Fantasma
    ctx.beginPath();
    ctx.arc(ghost.x, ghost.y, 7, 0, Math.PI * 2);
    ctx.fillStyle = ghost.state === "CHASE" ? "#EF4444" : (ghost.state === "PURSUING_LAST_SEEN" ? "#F97316" : "#EF4444");
    ctx.fill();

    // 9. Atualização de Telemetria no Cabeçalho
    if (statusBadge) {
      if (ghost.state === "CHASE") {
        statusBadge.textContent = "ALERTA: CONTATO VISUAL (PERSEGUINDO)";
        statusBadge.style.color = "#EF4444";
      } else if (ghost.state === "PURSUING_LAST_SEEN") {
        statusBadge.textContent = "VISÃO QUEBRADA: INDO AO ÚLTIMO PONTO VISTO";
        statusBadge.style.color = "#F97316";
      } else {
        statusBadge.textContent = "IA NAVMESH: TRANSITANDO ENTRE PONTOS QUENTES";
        statusBadge.style.color = "var(--gold)";
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

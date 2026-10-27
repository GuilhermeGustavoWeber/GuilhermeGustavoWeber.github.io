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

  const CELL_SIZE = 20;
  let cols = 0;
  let rows = 0;
  let maze = []; // 0 = corredor navegável, 1 = parede
  let heatmap = [];
  let penaltyMap = new Map(); // Penalidades temporárias de rota quando o jogador é pego

  let startCoord = { c: 2, r: 6 };
  let exitCoord = { c: 28, r: 6 };

  // Jogador Simulado (Navega via A* rumo à saída, mudando de rota se interceptado)
  let player = {
    c: 2,
    r: 6,
    x: 2 * CELL_SIZE + CELL_SIZE / 2,
    y: 6 * CELL_SIZE + CELL_SIZE / 2,
    angle: 0,
    speed: 1.95,
    path: [],
    pathIndex: 0,
    escapes: 0,
  };

  // IA Fantasma (Patrulha pontos quentes, persegue por FOV 120º sem atravessar paredes)
  let ghost = {
    c: 15,
    r: 2,
    x: 15 * CELL_SIZE + CELL_SIZE / 2,
    y: 2 * CELL_SIZE + CELL_SIZE / 2,
    angle: Math.PI,
    speed: 1.20,
    state: "PATROL", // "PATROL", "CHASE", "PURSUING_LAST_SEEN"
    path: [],
    pathIndex: 0,
    lastSeenPoint: null,
    chaseCooldown: 0,
    chaseTimer: 180,
  };

  function isWalkable(c, r) {
    if (c < 0 || c >= cols || r < 0 || r >= rows) return false;
    return maze[r * cols + c] === 0;
  }

  // Gera a planta arquitetural do casarão (3 alas horizontais + 5 corredores cruzados)
  function buildMansionMaze() {
    cols = Math.floor(canvas.width / CELL_SIZE);
    rows = Math.floor(canvas.height / CELL_SIZE); // 260 / 20 = 13 rows
    maze = new Uint8Array(cols * rows);
    heatmap = new Array(cols * rows).fill(0);
    penaltyMap.clear();

    // Inicia tudo como parede
    for (let i = 0; i < cols * rows; i++) maze[i] = 1;

    // 3 Alas Principais
    const northRow = 2;
    const centerRow = 6;
    const southRow = 10;

    for (let c = 1; c < cols - 1; c++) {
      maze[northRow * cols + c] = 0;
      maze[centerRow * cols + c] = 0;
      maze[southRow * cols + c] = 0;
    }

    // 5 Cruzamentos de Passagem (Salões Conectores)
    const westCol = 4;
    const midWestCol = Math.floor(cols * 0.30);
    const midCol = Math.floor(cols * 0.50);
    const midEastCol = Math.floor(cols * 0.70);
    const eastCol = Math.max(westCol + 4, cols - 5);

    const connectors = [westCol, midWestCol, midCol, midEastCol, eastCol];
    connectors.forEach(c => {
      if (c > 1 && c < cols - 1) {
        for (let r = northRow; r <= southRow; r++) {
          maze[r * cols + c] = 0;
        }
      }
    });

    startCoord = { c: 2, r: centerRow };
    exitCoord = { c: cols - 3, r: centerRow };

    // Inicializa entidades nas posições válidas
    player.c = startCoord.c;
    player.r = startCoord.r;
    player.x = startCoord.c * CELL_SIZE + CELL_SIZE / 2;
    player.y = startCoord.r * CELL_SIZE + CELL_SIZE / 2;
    player.path = findPathAStar(player.c, player.r, exitCoord.c, exitCoord.r, penaltyMap);
    player.pathIndex = 0;

    ghost.c = midCol;
    ghost.r = northRow;
    ghost.x = midCol * CELL_SIZE + CELL_SIZE / 2;
    ghost.y = northRow * CELL_SIZE + CELL_SIZE / 2;
    ghost.path = [];
    ghost.pathIndex = 0;
    ghost.state = "PATROL";
  }

  function resizeCanvas() {
    canvas.width = Math.max(320, (canvas.parentElement ? canvas.parentElement.clientWidth : 600) - 24);
    canvas.height = 260;
    buildMansionMaze();
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  // Pathfinding A* (Respeita penalidades de caminhos bloqueados)
  function findPathAStar(startC, startR, targetC, targetR, penalties) {
    if (!isWalkable(startC, startR) || !isWalkable(targetC, targetR)) return [];

    const openSet = [];
    const cameFrom = new Map();
    const gScore = new Map();
    const fScore = new Map();

    const startKey = `${startC},${startR}`;
    gScore.set(startKey, 0);
    const hStart = Math.abs(startC - targetC) + Math.abs(startR - targetR);
    fScore.set(startKey, hStart);
    openSet.push({ c: startC, r: startR, f: hStart });

    const visited = new Set();

    while (openSet.length > 0) {
      let bestIdx = 0;
      for (let i = 1; i < openSet.length; i++) {
        if (openSet[i].f < openSet[bestIdx].f) bestIdx = i;
      }
      const current = openSet.splice(bestIdx, 1)[0];
      const curKey = `${current.c},${current.r}`;

      if (current.c === targetC && current.r === targetR) {
        const path = [];
        let curr = current;
        while (curr) {
          path.unshift({
            c: curr.c,
            r: curr.r,
            x: curr.c * CELL_SIZE + CELL_SIZE / 2,
            y: curr.r * CELL_SIZE + CELL_SIZE / 2,
          });
          curr = cameFrom.get(`${curr.c},${curr.r}`);
        }
        return path;
      }

      visited.add(curKey);

      const dirs = [
        { dc: 1, dr: 0 },
        { dc: -1, dr: 0 },
        { dc: 0, dr: 1 },
        { dc: 0, dr: -1 },
      ];

      for (let d of dirs) {
        const nc = current.c + d.dc;
        const nr = current.r + d.dr;
        if (!isWalkable(nc, nr)) continue;

        const neighborKey = `${nc},${nr}`;
        if (visited.has(neighborKey)) continue;

        const penalty = penalties ? (penalties.get(neighborKey) || 0) : 0;
        const tentativeG = gScore.get(curKey) + 1 + penalty;

        if (!gScore.has(neighborKey) || tentativeG < gScore.get(neighborKey)) {
          cameFrom.set(neighborKey, current);
          gScore.set(neighborKey, tentativeG);
          const f = tentativeG + Math.abs(nc - targetC) + Math.abs(nr - targetR);
          fScore.set(neighborKey, f);

          if (!openSet.some(node => node.c === nc && node.r === nr)) {
            openSet.push({ c: nc, r: nr, f });
          }
        }
      }
    }
    return [];
  }

  // Raycast de Linha de Visão (Replicação do Physics.Linecast - paredes bloqueiam visão)
  function hasLineOfSight(x0, y0, x1, y1) {
    const dist = Math.hypot(x1 - x0, y1 - y0);
    const steps = Math.max(1, Math.ceil(dist / 6));
    const dx = (x1 - x0) / steps;
    const dy = (y1 - y0) / steps;

    for (let s = 1; s < steps; s++) {
      const px = x0 + dx * s;
      const py = y0 + dy * s;
      const c = Math.floor(px / CELL_SIZE);
      const r = Math.floor(py / CELL_SIZE);
      if (c < 0 || c >= cols || r < 0 || r >= rows) return false;
      if (maze[r * cols + c] === 1) return false;
    }
    return true;
  }

  // Gravação contínua do rastro de calor
  function recordPlayerPosition() {
    const col = Math.floor(player.x / CELL_SIZE);
    const row = Math.floor(player.y / CELL_SIZE);
    if (col >= 0 && col < cols && row >= 0 && row < rows && maze[row * cols + col] === 0) {
      const idx = row * cols + col;
      heatmap[idx] = Math.min(255, heatmap[idx] + 8);
    }
  }

  // Resfriamento contínuo da grade térmica
  setInterval(() => {
    for (let i = 0; i < heatmap.length; i++) {
      if (heatmap[i] > 0) heatmap[i] = Math.max(0, heatmap[i] - 1);
    }
    // Dissipação gradual das penalidades de rota
    for (let [k, val] of penaltyMap.entries()) {
      if (val > 1) penaltyMap.set(k, val - 1);
      else penaltyMap.delete(k);
    }
  }, 90);

  // Extrai múltiplos centros de calor distintos (Top 15)
  function getTopHotSpots() {
    let spots = [];
    for (let i = 0; i < heatmap.length; i++) {
      if (heatmap[i] > 18 && maze[i] === 0) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        spots.push({
          c: col,
          r: row,
          x: col * CELL_SIZE + CELL_SIZE / 2,
          y: row * CELL_SIZE + CELL_SIZE / 2,
          val: heatmap[i],
        });
      }
    }
    spots.sort((a, b) => b.val - a.val);

    const top15 = spots.slice(0, 15);
    let distinct = [];
    for (let i = 0; i < top15.length; i++) {
      const s = top15[i];
      if (distinct.every(d => Math.hypot(d.x - s.x, d.y - s.y) > 36)) {
        distinct.push(s);
        if (distinct.length >= 5) break;
      }
    }
    return distinct;
  }

  function moveEntityAlongPath(entity, speed) {
    if (!entity.path || entity.pathIndex >= entity.path.length) return false;
    const target = entity.path[entity.pathIndex];
    const dx = target.x - entity.x;
    const dy = target.y - entity.y;
    const dist = Math.hypot(dx, dy);

    if (dist <= speed) {
      entity.x = target.x;
      entity.y = target.y;
      entity.c = target.c;
      entity.r = target.r;
      entity.pathIndex++;
    } else {
      entity.x += (dx / dist) * speed;
      entity.y += (dy / dist) * speed;
      entity.c = Math.floor(entity.x / CELL_SIZE);
      entity.r = Math.floor(entity.y / CELL_SIZE);

      const targetAngle = Math.atan2(dy, dx);
      let diff = targetAngle - entity.angle;
      while (diff < -Math.PI) diff += 2 * Math.PI;
      while (diff > Math.PI) diff -= 2 * Math.PI;
      entity.angle += diff * 0.22;
    }
    return true;
  }

  let frameCount = 0;
  let exitPulse = 0;

  function loop() {
    frameCount++;
    exitPulse += 0.05;

    ctx.fillStyle = "#040810";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 1. Renderização das Paredes do Labirinto (CAD / Obsidian Architectural)
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (maze[r * cols + c] === 1) {
          ctx.fillStyle = "#091424";
          ctx.fillRect(c * CELL_SIZE, r * CELL_SIZE, CELL_SIZE, CELL_SIZE);
          ctx.strokeStyle = "#132840";
          ctx.lineWidth = 1;
          ctx.strokeRect(c * CELL_SIZE + 0.5, r * CELL_SIZE + 0.5, CELL_SIZE - 1, CELL_SIZE - 1);
        }
      }
    }

    // 2. Grade Térmica (Exatamente no máximo 15 pontos mais vermelhos/quentes)
    let activeCells = [];
    for (let i = 0; i < heatmap.length; i++) {
      if (heatmap[i] > 0 && maze[i] === 0) {
        activeCells.push({ idx: i, val: heatmap[i] });
      }
    }
    activeCells.sort((a, b) => b.val - a.val);

    const top15Map = new Map();
    const topLimit = Math.min(15, activeCells.length);
    for (let rank = 0; rank < topLimit; rank++) {
      top15Map.set(activeCells[rank].idx, rank);
    }

    for (let i = 0; i < activeCells.length; i++) {
      const cell = activeCells[i];
      const c = cell.idx % cols;
      const r = Math.floor(cell.idx / cols);

      if (top15Map.has(cell.idx)) {
        const rank = top15Map.get(cell.idx);
        const heatNorm = 1 - rank / 15;
        const red = 235 + Math.floor(heatNorm * 20);
        const green = Math.floor((1 - heatNorm) * 55);
        const blue = Math.floor((1 - heatNorm) * 40);
        const alpha = 0.45 + heatNorm * 0.40;

        ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
        ctx.fillRect(c * CELL_SIZE + 1, r * CELL_SIZE + 1, CELL_SIZE - 2, CELL_SIZE - 2);
      } else {
        const coldRatio = Math.min(1, cell.val / 100);
        const alpha = coldRatio * 0.22;
        ctx.fillStyle = `rgba(37, 99, 235, ${alpha})`;
        ctx.fillRect(c * CELL_SIZE + 1, r * CELL_SIZE + 1, CELL_SIZE - 2, CELL_SIZE - 2);
      }
    }

    // 3. Renderização do Portal de Saída e Entrada
    const exitX = exitCoord.c * CELL_SIZE + CELL_SIZE / 2;
    const exitY = exitCoord.r * CELL_SIZE + CELL_SIZE / 2;
    const pulseRadius = 8 + Math.sin(exitPulse) * 3;

    // Portal de Saída (Esmeralda pulsante)
    ctx.beginPath();
    ctx.arc(exitX, exitY, pulseRadius, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(16, 185, 129, 0.45)";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(exitX, exitY, 6, 0, Math.PI * 2);
    ctx.fillStyle = "#10B981";
    ctx.fill();

    ctx.font = "8px monospace";
    ctx.fillStyle = "#10B981";
    ctx.textAlign = "center";
    ctx.fillText("SAÍDA", exitX, exitY - 11);

    // Entrada (Ciano suave)
    const startX = startCoord.c * CELL_SIZE + CELL_SIZE / 2;
    const startY = startCoord.r * CELL_SIZE + CELL_SIZE / 2;
    ctx.fillStyle = "rgba(6, 182, 212, 0.5)";
    ctx.fillText("ENTRADA", startX, startY - 9);

    // 4. Movimentação do Jogador
    const moved = moveEntityAlongPath(player, player.speed);
    recordPlayerPosition();

    // Checagem de Chegada na Saída
    if (Math.hypot(player.x - exitX, player.y - exitY) < 14) {
      player.escapes++;
      penaltyMap.clear(); // Limpa penalidades após vitória
      player.c = startCoord.c;
      player.r = startCoord.r;
      player.x = startX;
      player.y = startY;
      player.path = findPathAStar(player.c, player.r, exitCoord.c, exitCoord.r, penaltyMap);
      player.pathIndex = 0;

      ghost.state = "PATROL";
      ghost.lastSeenPoint = null;
      ghost.chaseCooldown = 120;
      ghost.path = [];
      ghost.pathIndex = 0;

      if (statusBadge) {
        statusBadge.textContent = `SUCESSO! ESCAPOU PELO PORTAL (TOTAL: ${player.escapes})`;
        statusBadge.style.color = "#10B981";
      }
    } else if (!moved || player.pathIndex >= player.path.length) {
      // Se ficou sem caminho, recalcula rumo à saída
      player.path = findPathAStar(player.c, player.r, exitCoord.c, exitCoord.r, penaltyMap);
      player.pathIndex = 0;
    }

    // 5. Linha de Visão e IA do Fantasma
    if (ghost.chaseCooldown > 0) ghost.chaseCooldown--;

    const fov = (120 * Math.PI) / 180;
    const viewRadius = 95;
    const dx = player.x - ghost.x;
    const dy = player.y - ghost.y;
    const distToPlayer = Math.hypot(dx, dy);

    let playerInView = false;
    if (distToPlayer <= viewRadius && ghost.chaseCooldown <= 0) {
      const angleToPlayer = Math.atan2(dy, dx);
      let diffAngle = angleToPlayer - ghost.angle;
      while (diffAngle < -Math.PI) diffAngle += 2 * Math.PI;
      while (diffAngle > Math.PI) diffAngle -= 2 * Math.PI;

      if (Math.abs(diffAngle) <= fov / 2) {
        // Valida se há linha direta desimpedida por paredes
        if (hasLineOfSight(ghost.x, ghost.y, player.x, player.y)) {
          playerInView = true;
        }
      }
    }

    // Flagrante / Captura do Jogador
    if (distToPlayer < 14) {
      // Pego pela IA: penaliza a área onde foi pego para forçar rota alternativa
      const caughtC = player.c;
      const caughtR = player.r;
      for (let dc = -2; dc <= 2; dc++) {
        for (let dr = -2; dr <= 2; dr++) {
          const pc = caughtC + dc;
          const pr = caughtR + dr;
          if (isWalkable(pc, pr)) {
            penaltyMap.set(`${pc},${pr}`, 140);
          }
        }
      }

      // Reinicia jogador na entrada
      player.c = startCoord.c;
      player.r = startCoord.r;
      player.x = startX;
      player.y = startY;
      player.angle = 0;
      // Recalcula rota com penalidades: A* escolhe rota alternativa!
      player.path = findPathAStar(player.c, player.r, exitCoord.c, exitCoord.r, penaltyMap);
      player.pathIndex = 0;

      ghost.state = "PATROL";
      ghost.lastSeenPoint = null;
      ghost.chaseCooldown = 120;
      ghost.chaseTimer = 180;
      ghost.path = [];
      ghost.pathIndex = 0;

      if (statusBadge) {
        statusBadge.textContent = "CAPTURA! RE-ROTEANDO POR CAMINHO ALTERNATIVO...";
        statusBadge.style.color = "#EF4444";
      }
    }

    // Máquina de Estados da IA
    let ghostSpeed = 1.20;

    if (playerInView) {
      ghost.chaseTimer--;
      if (ghost.chaseTimer <= 0) {
        ghost.state = "PURSUING_LAST_SEEN";
        ghost.lastSeenPoint = { x: player.x, y: player.y, c: player.c, r: player.r };
        ghost.chaseCooldown = 120;
        ghost.chaseTimer = 180;
      } else {
        ghost.state = "CHASE";
        ghostSpeed = 1.60; // Mais lento que o jogador (1.95)
        ghost.lastSeenPoint = { x: player.x, y: player.y, c: player.c, r: player.r };

        // Recalcula percurso em direção ao jogador periodicamente
        if (frameCount % 12 === 0 || ghost.path.length === 0) {
          ghost.path = findPathAStar(ghost.c, ghost.r, player.c, player.r, null);
          ghost.pathIndex = 0;
        }
      }
    } else if (ghost.lastSeenPoint !== null) {
      ghost.state = "PURSUING_LAST_SEEN";
      ghostSpeed = 1.40;

      if (ghost.path.length === 0 || ghost.pathIndex >= ghost.path.length) {
        ghost.path = findPathAStar(ghost.c, ghost.r, ghost.lastSeenPoint.c, ghost.lastSeenPoint.r, null);
        ghost.pathIndex = 0;
      }

      const distToLast = Math.hypot(ghost.lastSeenPoint.x - ghost.x, ghost.lastSeenPoint.y - ghost.y);
      if (distToLast < 12 || ghost.pathIndex >= ghost.path.length) {
        ghost.lastSeenPoint = null;
        ghost.state = "PATROL";
        ghost.chaseCooldown = 90;
        ghost.chaseTimer = 180;
        ghost.path = [];
        ghost.pathIndex = 0;
      }
    } else {
      ghost.state = "PATROL";
      ghostSpeed = 1.20;
      ghost.chaseTimer = 180;

      // Patrulha entre os pontos mais quentes deixados pelo jogador
      if (ghost.path.length === 0 || ghost.pathIndex >= ghost.path.length) {
        const hotSpots = getTopHotSpots();
        if (hotSpots.length > 0) {
          const targetSpot = hotSpots[Math.floor(Math.random() * hotSpots.length)];
          ghost.path = findPathAStar(ghost.c, ghost.r, targetSpot.c, targetSpot.r, null);
          ghost.pathIndex = 0;
        }
      }
    }

    moveEntityAlongPath(ghost, ghostSpeed);

    // 6. Marcador do Último Ponto Visto
    if (ghost.lastSeenPoint && ghost.state === "PURSUING_LAST_SEEN") {
      ctx.beginPath();
      ctx.arc(ghost.lastSeenPoint.x, ghost.lastSeenPoint.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#F97316";
      ctx.fill();

      ctx.font = "8px monospace";
      ctx.fillStyle = "#F97316";
      ctx.textAlign = "center";
      ctx.fillText("ÚLTIMO PONTO", ghost.lastSeenPoint.x, ghost.lastSeenPoint.y - 7);
    }

    // 7. Cone de Visão de 120º
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

    // 8. Renderização das Entidades
    // Jogador (Ponto Esmeralda com halo suave)
    ctx.beginPath();
    ctx.arc(player.x, player.y, 6, 0, Math.PI * 2);
    ctx.fillStyle = "#10B981";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(player.x, player.y, 9, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(16, 185, 129, 0.4)";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Fantasma (Ponto Vermelho Carmesim)
    ctx.beginPath();
    ctx.arc(ghost.x, ghost.y, 7, 0, Math.PI * 2);
    ctx.fillStyle = ghost.state === "CHASE" ? "#EF4444" : (ghost.state === "PURSUING_LAST_SEEN" ? "#F97316" : "#EF4444");
    ctx.fill();

    // 9. Atualização de Telemetria no Cabeçalho
    if (statusBadge) {
      if (ghost.state === "CHASE") {
        statusBadge.textContent = "ALERTA: FANTASMA EM CONTATO VISUAL!";
        statusBadge.style.color = "#EF4444";
      } else if (ghost.state === "PURSUING_LAST_SEEN") {
        statusBadge.textContent = "VISÃO QUEBRADA NA CURVA: INDO AO ÚLTIMO PONTO";
        statusBadge.style.color = "#F97316";
      } else if (!statusBadge.textContent.includes("CAPTURA") && !statusBadge.textContent.includes("SUCESSO")) {
        statusBadge.textContent = "IA NAVMESH: TRANSITANDO ENTRE PONTOS QUENTES DO CASARÃO";
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

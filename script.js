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
   4. SIMULADOR DO THARIUM HOUSE: DIGITAL TWIN DE ENGENHARIA (C# / UNITY 3D)
      - GameManager.allPlayerPaths & PathRecorder (amostragem contínua)
      - AINavMesh.cs (LINQ Top 5 Emboscada & Interpolação Térmica HeatmapViewer)
      - Campo de Visão 120º com Raycasting Oclusivo (Physics.Linecast)
   ========================================================================== */

function initThariumHeatmapSimulation() {
  const canvas = document.getElementById("tharium-heatmap-canvas");
  const modeBtn = document.getElementById("tharium-mode-btn");
  const nextRoundBtn = document.getElementById("tharium-next-round-btn");
  const clearBtn = document.getElementById("tharium-clear-btn");
  const modeStatus = document.getElementById("tharium-mode-status");
  const aiStateEl = document.getElementById("tharium-ai-state");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  function resizeCanvas() {
    canvas.width = canvas.parentElement.clientWidth - 24;
    canvas.height = 220;
  }
  resizeCanvas();
  window.addEventListener("resize", () => {
    resizeCanvas();
    updateFloorplan();
  });

  const GRID_SIZE = 16;
  let cols = Math.floor(canvas.width / GRID_SIZE);
  let rows = Math.floor(canvas.height / GRID_SIZE);

  // --- MODELO DIGITAL DE DADOS (Espelhando GameManager.cs e AINavMesh.cs) ---
  let roundNumber = 1;
  let allPlayerPaths = []; // Coleção de caminhos gravados (GameManager.allPlayerPaths)
  let currentRecordingPath = []; // PathRecorder.cs (pontos gravados na rodada atual)
  let heatmapData = {}; // Dictionary<Vector3, int> heatmap
  let maxHeatValue = 1;
  let currentHeatmapPatrolRoute = []; // currentHeatmapPatrolRoute (Top 5 LINQ)
  let patrolRouteIndex = 0; // patrolRouteIndex
  let isProbabilisticMode = true; // probabilisticMode

  let roundToast = "";
  let roundToastTimer = 0;

  // Paredes e Estrutura Arquitetônica da Mansão Tharium
  let obstacles = [];
  let roomLabels = [];
  let navNodes = [];
  let navAdj = {};

  function updateFloorplan() {
    const w = canvas.width;
    const h = canvas.height;
    cols = Math.floor(w / GRID_SIZE);
    rows = Math.floor(h / GRID_SIZE);

    const xLeft = Math.floor(w * 0.30);
    const xRight = Math.floor(w * 0.70);
    const yMid = Math.floor(h * 0.50);
    const wallThick = 10;

    // Paredes que definem os 5 cômodos da mansão com passagens amplas
    obstacles = [
      // Parede Oeste (Divisória entre Quartos e Salão Central)
      { x: xLeft, y: 0, w: wallThick, h: 36, name: "w_w_top" },
      { x: xLeft, y: 82, w: wallThick, h: h - 164, name: "w_w_mid" },
      { x: xLeft, y: h - 36, w: wallThick, h: 36, name: "w_w_bot" },

      // Parede Interna Esquerda (Divisão START / BEDROOM)
      { x: 0, y: yMid - 5, w: 75, h: wallThick, name: "w_start_l" },
      { x: xLeft - 75, y: yMid - 5, w: 75, h: wallThick, name: "w_start_r" },

      // Mesa Central de Jantar no Salão (Obstáculo central)
      { x: Math.floor(w * 0.44), y: Math.floor(h * 0.36), w: Math.floor(w * 0.12), h: Math.floor(h * 0.28), name: "dining_table" },

      // Parede Leste (Divisória entre Salão Central e Cozinha/Extração)
      { x: xRight, y: 0, w: wallThick, h: 36, name: "w_e_top" },
      { x: xRight, y: 82, w: wallThick, h: h - 164, name: "w_e_mid" },
      { x: xRight, y: h - 36, w: wallThick, h: 36, name: "w_e_bot" },

      // Parede Interna Direita (Divisão KITCHEN / FINISH)
      { x: xRight, y: yMid - 5, w: 75, h: wallThick, name: "w_kit_l" },
      { x: w - 75, y: yMid - 5, w: 75, h: wallThick, name: "w_kit_r" },
    ];

    // Rótulos Arquitetônicos da Planta Baixa
    roomLabels = [
      { text: "START [SPAWN]", x: xLeft * 0.5, y: 22 },
      { text: "BEDROOM", x: xLeft * 0.5, y: h - 14 },
      { text: "DINING HALL [SALÃO]", x: w * 0.5, y: 22 },
      { text: "KITCHEN [COZINHA]", x: xRight + (w - xRight) * 0.5, y: 22 },
      { text: "FINISH [EXTRAÇÃO]", x: xRight + (w - xRight) * 0.5, y: h - 14 },
    ];

    // Malha Topológica de Navegação (NavMesh 100% desobstruído)
    navNodes = [
      { x: Math.floor(xLeft * 0.45), y: Math.floor(h * 0.25) }, // 0: START
      { x: Math.floor(xLeft * 0.45), y: yMid },                  // 1: Porta Oeste Interna
      { x: Math.floor(xLeft * 0.45), y: Math.floor(h * 0.75) }, // 2: BEDROOM
      { x: xLeft + 6, y: 58 },                                  // 3: Porta Oeste Norte
      { x: xLeft + 6, y: h - 58 },                              // 4: Porta Oeste Sul
      { x: Math.floor(w * 0.50), y: 38 },                       // 5: Salão Norte
      { x: Math.floor(w * 0.50), y: h - 38 },                   // 6: Salão Sul
      { x: Math.floor(w * 0.38), y: yMid },                     // 7: Salão Oeste da Mesa
      { x: Math.floor(w * 0.62), y: yMid },                     // 8: Salão Leste da Mesa
      { x: xRight + 6, y: 58 },                                 // 9: Porta Leste Norte
      { x: xRight + 6, y: h - 58 },                             // 10: Porta Leste Sul
      { x: Math.floor(xRight + (w - xRight) * 0.55), y: Math.floor(h * 0.25) }, // 11: KITCHEN
      { x: Math.floor(xRight + (w - xRight) * 0.55), y: yMid },                  // 12: Porta Leste Interna
      { x: Math.floor(xRight + (w - xRight) * 0.55), y: Math.floor(h * 0.75) }, // 13: FINISH
    ];

    navAdj = {
      0: [1, 3],
      1: [0, 2],
      2: [1, 4],
      3: [0, 5, 7],
      4: [2, 6, 7],
      5: [3, 7, 8, 9],
      6: [4, 7, 8, 10],
      7: [3, 4, 5, 6],
      8: [5, 6, 9, 10],
      9: [5, 8, 11],
      10: [6, 8, 13],
      11: [9, 12],
      12: [11, 13],
      13: [10, 12],
    };
  }
  updateFloorplan();

  // Estados e Entidades
  let player = {
    x: 0,
    y: 0,
    speed: 1.35,
    targetNodeIdx: 0,
    radius: 6,
    alive: true,
  };

  let ghost = {
    x: 0,
    y: 0,
    speed: 1.5,
    angle: Math.PI,
    targetX: 0,
    targetY: 0,
    radius: 7,
    playerVisible: false,
    patrolCooldown: 0,
    lastSeenPos: null,
  };

  // Cria caminho inicial pré-gravado para que a IA já inicie com dados térmicos
  function seedInitialRun() {
    const w = canvas.width;
    const h = canvas.height;
    const initialRun = [
      { x: w * 0.12, y: h * 0.25 },
      { x: w * 0.20, y: h * 0.26 },
      { x: w * 0.30, y: 58 },
      { x: w * 0.40, y: 45 },
      { x: w * 0.50, y: 40 },
      { x: w * 0.60, y: 45 },
      { x: w * 0.70, y: 58 },
      { x: w * 0.82, y: h * 0.25 },
      { x: w * 0.84, y: h * 0.50 },
      { x: w * 0.85, y: h * 0.75 },
    ];
    allPlayerPaths.push(initialRun);
    generateHeatmap();
    generateNewHeatmapPatrolRoute();
  }

  function spawnPlayer() {
    if (navNodes.length > 0) {
      player.x = navNodes[0].x;
      player.y = navNodes[0].y;
      player.targetNodeIdx = 0;
      player.alive = true;
      currentRecordingPath = [{ x: player.x, y: player.y }];
    }
  }

  function spawnGhost() {
    if (navNodes.length > 0) {
      ghost.x = navNodes[8].x; // Inicia no salão leste
      ghost.y = navNodes[8].y;
      ghost.angle = Math.PI;
      ghost.playerVisible = false;
      ghost.lastSeenPos = null;
      followHeatmapPatrol();
    }
  }

  // --- 1. GERAÇÃO DO MAPA DE CALOR (AINavMesh.cs GenerateHeatmap) ---
  function generateHeatmap() {
    heatmapData = {};
    maxHeatValue = 1;

    allPlayerPaths.forEach((path) => {
      path.forEach((pt) => {
        const col = Math.floor(pt.x / GRID_SIZE);
        const row = Math.floor(pt.y / GRID_SIZE);
        const key = `${col}_${row}`;
        heatmapData[key] = (heatmapData[key] || 0) + 1;
        if (heatmapData[key] > maxHeatValue) {
          maxHeatValue = heatmapData[key];
        }
      });
    });
  }

  // --- 2. GERAÇÃO DA ROTA DE PATRULHA TOP 5 (AINavMesh.cs GenerateNewHeatmapPatrolRoute) ---
  function generateNewHeatmapPatrolRoute() {
    const entries = Object.keys(heatmapData).map((k) => {
      const [col, row] = k.split("_").map(Number);
      return {
        key: k,
        x: col * GRID_SIZE + GRID_SIZE / 2,
        y: row * GRID_SIZE + GRID_SIZE / 2,
        val: heatmapData[k],
      };
    });

    if (entries.length === 0) {
      currentHeatmapPatrolRoute = [];
      return;
    }

    // LINQ: OrderByDescending(val).Take(5).OrderBy(rand)
    const top5 = entries.sort((a, b) => b.val - a.val).slice(0, 5);
    // Embaralha para rota imprevisível
    currentHeatmapPatrolRoute = top5.sort(() => Math.random() - 0.5);
    patrolRouteIndex = 0;
  }

  // --- 3. SEGUIR A ROTA DO PLANO DE CALOR (AINavMesh.cs FollowHeatmapPatrol) ---
  function followHeatmapPatrol() {
    if (!isProbabilisticMode || currentHeatmapPatrolRoute.length === 0) {
      // Fallback: Patrulha cega aleatória
      if (navNodes.length > 0) {
        const randNode = navNodes[Math.floor(Math.random() * navNodes.length)];
        ghost.targetX = randNode.x;
        ghost.targetY = randNode.y;
      }
      return;
    }

    if (patrolRouteIndex >= currentHeatmapPatrolRoute.length) {
      generateNewHeatmapPatrolRoute();
    }

    if (currentHeatmapPatrolRoute.length > 0) {
      const targetSpot = currentHeatmapPatrolRoute[patrolRouteIndex];
      ghost.targetX = targetSpot.x;
      ghost.targetY = targetSpot.y;
    }
  }

  // --- 4. GRAVAÇÃO CONTÍNUA DE PONTOS (PathRecorder.cs InvokeRepeating) ---
  setInterval(() => {
    if (player.alive) {
      currentRecordingPath.push({ x: player.x, y: player.y });
    }
  }, 400); // Intervalo contínuo de 0.4s

  // --- 5. REINÍCIO E SALVAMENTO DE TRAJETÓRIA (GameEnding.cs SavePathAndRestart) ---
  function savePathAndRestart(reason) {
    if (currentRecordingPath.length > 2) {
      allPlayerPaths.push([...currentRecordingPath]);
      generateHeatmap();
      generateNewHeatmapPatrolRoute();
    }
    roundNumber++;
    roundToast = reason === "CAUGHT" ? "JOGADOR CAPTURADO! DADOS TÉRMICOS INTEGRADOS" : "FUGA CONCLUÍDA! NOVA ROTA ADICIONADA AO HEATMAP";
    roundToastTimer = 160;

    spawnPlayer();
    spawnGhost();
  }

  // Interseção e Raycasting Oclusivo
  function rayIntersectSegment(rx, ry, dx, dy, p1x, p1y, p2x, p2y) {
    const sx = p2x - p1x;
    const sy = p2y - p1y;
    const denom = dx * sy - dy * sx;
    if (Math.abs(denom) < 0.00001) return null;
    const t = ((p1x - rx) * sy - (p1y - ry) * sx) / denom;
    const u = ((p1x - rx) * dy - (p1y - ry) * dx) / denom;
    if (t >= 0 && u >= 0 && u <= 1) return t;
    return null;
  }

  function getRayHit(rx, ry, dx, dy, maxDist) {
    const w = canvas.width;
    const h = canvas.height;
    let minDist = maxDist;

    // Bordas
    const bounds = [[0, 0, w, 0], [w, 0, w, h], [w, h, 0, h], [0, h, 0, 0]];
    for (let i = 0; i < bounds.length; i++) {
      const b = bounds[i];
      const t = rayIntersectSegment(rx, ry, dx, dy, b[0], b[1], b[2], b[3]);
      if (t !== null && t < minDist) minDist = t;
    }

    // Arestas de obstáculos
    for (let i = 0; i < obstacles.length; i++) {
      const o = obstacles[i];
      const edges = [
        [o.x, o.y, o.x + o.w, o.y],
        [o.x + o.w, o.y, o.x + o.w, o.y + o.h],
        [o.x + o.w, o.y + o.h, o.x, o.y + o.h],
        [o.x, o.y + o.h, o.x, o.y],
      ];
      for (let j = 0; j < edges.length; j++) {
        const e = edges[j];
        const t = rayIntersectSegment(rx, ry, dx, dy, e[0], e[1], e[2], e[3]);
        if (t !== null && t < minDist) minDist = t;
      }
    }

    return { x: rx + dx * minDist, y: ry + dy * minDist, dist: minDist };
  }

  function hasLineOfSight(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const dist = Math.hypot(dx, dy);
    if (dist < 2) return true;
    const ndx = dx / dist;
    const ndy = dy / dist;

    for (let i = 0; i < obstacles.length; i++) {
      const o = obstacles[i];
      const edges = [
        [o.x, o.y, o.x + o.w, o.y],
        [o.x + o.w, o.y, o.x + o.w, o.y + o.h],
        [o.x + o.w, o.y + o.h, o.x, o.y + o.h],
        [o.x, o.y + o.h, o.x, o.y],
      ];
      for (let j = 0; j < edges.length; j++) {
        const e = edges[j];
        const t = rayIntersectSegment(x1, y1, ndx, ndy, e[0], e[1], e[2], e[3]);
        if (t !== null && t > 1.5 && t < dist - 2.0) return false;
      }
    }
    return true;
  }

  function checkCollision(px, py, radius) {
    const w = canvas.width;
    const h = canvas.height;
    if (px - radius < 4 || px + radius > w - 4 || py - radius < 4 || py + radius > h - 4) {
      return true;
    }
    for (let i = 0; i < obstacles.length; i++) {
      const o = obstacles[i];
      const closestX = Math.max(o.x, Math.min(px, o.x + o.w));
      const closestY = Math.max(o.y, Math.min(py, o.y + o.h));
      const dx = px - closestX;
      const dy = py - closestY;
      if (dx * dx + dy * dy < radius * radius) return true;
    }
    return false;
  }

  function moveEntityWithSliding(entity, targetX, targetY, speed) {
    const dx = targetX - entity.x;
    const dy = targetY - entity.y;
    const dist = Math.hypot(dx, dy);
    if (dist < 1.5) return;

    const step = Math.min(dist, speed);
    const vx = (dx / dist) * step;
    const vy = (dy / dist) * step;

    entity.x += vx;
    if (checkCollision(entity.x, entity.y, entity.radius)) entity.x -= vx;

    entity.y += vy;
    if (checkCollision(entity.x, entity.y, entity.radius)) entity.y -= vy;
  }

  function findNavPath(startIdx, goalIdx) {
    if (startIdx === goalIdx) return [startIdx];
    const queue = [[startIdx]];
    const visited = new Set([startIdx]);

    while (queue.length > 0) {
      const path = queue.shift();
      const node = path[path.length - 1];
      const neighbors = navAdj[node] || [];

      for (let i = 0; i < neighbors.length; i++) {
        const n = neighbors[i];
        if (!visited.has(n)) {
          visited.add(n);
          const newPath = path.concat([n]);
          if (n === goalIdx) return newPath;
          queue.push(newPath);
        }
      }
    }
    return [startIdx];
  }

  function getNavSteeringPoint(fromX, fromY, toX, toY) {
    if (hasLineOfSight(fromX, fromY, toX, toY)) {
      return { x: toX, y: toY };
    }

    let bestStart = 0;
    let minSDist = Infinity;
    for (let i = 0; i < navNodes.length; i++) {
      const n = navNodes[i];
      if (hasLineOfSight(fromX, fromY, n.x, n.y)) {
        const d = Math.hypot(n.x - fromX, n.y - fromY);
        if (d < minSDist) { minSDist = d; bestStart = i; }
      }
    }

    let bestGoal = 13;
    let minGDist = Infinity;
    for (let i = 0; i < navNodes.length; i++) {
      const n = navNodes[i];
      if (hasLineOfSight(toX, toY, n.x, n.y)) {
        const d = Math.hypot(n.x - toX, n.y - toY);
        if (d < minGDist) { minGDist = d; bestGoal = i; }
      }
    }

    const path = findNavPath(bestStart, bestGoal);
    let nextIdx = path[0];
    if (Math.hypot(navNodes[nextIdx].x - fromX, navNodes[nextIdx].y - fromY) < 18 && path.length > 1) {
      nextIdx = path[1];
    }
    return { x: navNodes[nextIdx].x, y: navNodes[nextIdx].y };
  }

  // Inicialização do Cenário
  seedInitialRun();
  spawnPlayer();
  spawnGhost();

  // Controles
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
      followHeatmapPatrol();
    });
  }

  if (nextRoundBtn) {
    nextRoundBtn.addEventListener("click", () => {
      savePathAndRestart("FORCED");
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      allPlayerPaths = [];
      roundNumber = 1;
      seedInitialRun();
      spawnPlayer();
      spawnGhost();
    });
  }

  // LOOP PRINCIPAL
  function loop() {
    ctx.fillStyle = "#040810";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 1. Renderiza o Mapa de Calor Discretizado (HeatmapViewer.cs Color.Lerp Azul -> Vermelho)
    Object.keys(heatmapData).forEach((k) => {
      const [col, row] = k.split("_").map(Number);
      const val = heatmapData[k];
      const heatRatio = Math.min(1.0, val / Math.max(1, maxHeatValue));

      // Interpolação idêntica ao Color.Lerp(Color.blue, Color.red, heatRatio)
      const red = Math.floor(heatRatio * 255);
      const blue = Math.floor((1.0 - heatRatio) * 220);
      const green = Math.floor(Math.sin(heatRatio * Math.PI) * 120);

      ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${0.15 + heatRatio * 0.45})`;
      ctx.fillRect(col * GRID_SIZE + 1, row * GRID_SIZE + 1, GRID_SIZE - 2, GRID_SIZE - 2);
    });

    // 2. Renderiza a Rota de Emboscada Top 5 Ativa (AINavMesh.cs currentHeatmapPatrolRoute)
    if (isProbabilisticMode && currentHeatmapPatrolRoute.length > 0) {
      ctx.beginPath();
      ctx.setLineDash([3, 5]);
      ctx.moveTo(currentHeatmapPatrolRoute[0].x, currentHeatmapPatrolRoute[0].y);
      for (let i = 1; i < currentHeatmapPatrolRoute.length; i++) {
        ctx.lineTo(currentHeatmapPatrolRoute[i].x, currentHeatmapPatrolRoute[i].y);
      }
      ctx.strokeStyle = "rgba(245, 158, 11, 0.25)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.setLineDash([]);

      // Beacons dos 5 Pontos Quentes
      currentHeatmapPatrolRoute.forEach((spot, idx) => {
        const isCurrentTarget = idx === patrolRouteIndex;
        ctx.beginPath();
        ctx.arc(spot.x, spot.y, isCurrentTarget ? 7 : 4.5, 0, Math.PI * 2);
        ctx.fillStyle = isCurrentTarget ? "#F59E0B" : "rgba(245, 158, 11, 0.4)";
        ctx.fill();

        ctx.font = "8px monospace";
        ctx.fillStyle = isCurrentTarget ? "#FFFFFF" : "rgba(255, 255, 255, 0.6)";
        ctx.textAlign = "center";
        ctx.fillText(`H${idx + 1}`, spot.x, spot.y - 7);
      });
    }

    // 3. Renderiza Rótulos e Arquitetura da Mansão
    ctx.font = "9px monospace";
    ctx.fillStyle = "rgba(148, 163, 184, 0.35)";
    ctx.textAlign = "center";
    roomLabels.forEach((r) => {
      ctx.fillText(r.text, r.x, r.y);
    });
    ctx.textAlign = "start";

    // Paredes Físicas
    ctx.fillStyle = "#0B1622";
    ctx.strokeStyle = "rgba(16, 185, 129, 0.30)";
    ctx.lineWidth = 1.5;
    obstacles.forEach((o) => {
      ctx.fillRect(o.x, o.y, o.w, o.h);
      ctx.strokeRect(o.x, o.y, o.w, o.h);
    });

    // 4. Lógica e Movimentação do Jogador
    if (player.alive && navNodes.length > 0) {
      const targetNode = navNodes[player.targetNodeIdx];
      const distToNode = Math.hypot(targetNode.x - player.x, targetNode.y - player.y);

      if (distToNode < 16) {
        if (player.targetNodeIdx === 13) {
          // Chegou no FINISH! Sucesso de Fuga
          savePathAndRestart("ESCAPED");
        } else {
          // Navegação de fuga em direção a saída (nó 13)
          const pathToFinish = findNavPath(player.targetNodeIdx, 13);
          if (pathToFinish.length > 1) {
            player.targetNodeIdx = pathToFinish[1];
          } else {
            const neighbors = navAdj[player.targetNodeIdx] || [0];
            player.targetNodeIdx = neighbors[Math.floor(Math.random() * neighbors.length)];
          }
        }
      }

      let pSpeed = ghost.playerVisible ? 2.1 : 1.35;
      moveEntityWithSliding(player, targetNode.x, targetNode.y, pSpeed);
    }

    // 5. Visão da IA (AINavMesh.cs DetectPlayer - viewAngle = 120f, viewRadius = 115)
    const fovAngle = (120 * Math.PI) / 180;
    const viewRadius = 115;
    const dx = player.x - ghost.x;
    const dy = player.y - ghost.y;
    const distToPlayer = Math.hypot(dx, dy);

    ghost.playerVisible = false;
    if (distToPlayer <= viewRadius) {
      const angleToPlayer = Math.atan2(dy, dx);
      let diffAngle = angleToPlayer - ghost.angle;
      while (diffAngle < -Math.PI) diffAngle += 2 * Math.PI;
      while (diffAngle > Math.PI) diffAngle -= 2 * Math.PI;

      // Ângulo <= 60º e Linha de visão desobstruída (Physics.Linecast)
      if (Math.abs(diffAngle) <= fovAngle / 2) {
        if (hasLineOfSight(ghost.x, ghost.y, player.x, player.y)) {
          ghost.playerVisible = true;
          ghost.lastSeenPos = { x: player.x, y: player.y };
        }
      }
    }

    // Captura do jogador se o fantasma alcançá-lo
    if (distToPlayer < 12 && player.alive) {
      savePathAndRestart("CAUGHT");
    }

    // 6. Atualização de Destino da IA
    if (ghost.playerVisible) {
      // Prioridade 1: Perseguir jogador diretamente
      ghost.targetX = player.x;
      ghost.targetY = player.y;
      ghost.speed = 2.25;
    } else if (ghost.lastSeenPos) {
      // Persegue até o último ponto visto
      ghost.targetX = ghost.lastSeenPos.x;
      ghost.targetY = ghost.lastSeenPos.y;
      ghost.speed = 1.95;
      if (Math.hypot(ghost.x - ghost.lastSeenPos.x, ghost.y - ghost.lastSeenPos.y) < 14) {
        ghost.lastSeenPos = null;
        followHeatmapPatrol();
      }
    } else {
      // Patrulha do mapa de calor (avança para próximo nó da rota)
      ghost.speed = 1.45;
      if (Math.hypot(ghost.x - ghost.targetX, ghost.y - ghost.targetY) < 16) {
        patrolRouteIndex++;
        followHeatmapPatrol();
      }
    }

    // Movimentação da IA com NavMesh e Wall-Sliding
    const steerPt = getNavSteeringPoint(ghost.x, ghost.y, ghost.targetX, ghost.targetY);
    const prevGx = ghost.x;
    const prevGy = ghost.y;
    moveEntityWithSliding(ghost, steerPt.x, steerPt.y, ghost.speed);

    const gMovedX = ghost.x - prevGx;
    const gMovedY = ghost.y - prevGy;
    if (Math.hypot(gMovedX, gMovedY) > 0.2) {
      const targetAngle = Math.atan2(gMovedY, gMovedX);
      let diff = targetAngle - ghost.angle;
      while (diff < -Math.PI) diff += 2 * Math.PI;
      while (diff > Math.PI) diff -= 2 * Math.PI;
      ghost.angle += diff * 0.2;
    }

    // 7. Renderização do Cone de Visão com Raycasting Real (Bloqueado fisicamente pelas paredes)
    const numRays = 36;
    const startAngle = ghost.angle - fovAngle / 2;
    const angleStep = fovAngle / (numRays - 1);

    ctx.beginPath();
    ctx.moveTo(ghost.x, ghost.y);
    for (let i = 0; i < numRays; i++) {
      const rAngle = startAngle + i * angleStep;
      const rdx = Math.cos(rAngle);
      const rdy = Math.sin(rAngle);
      const hit = getRayHit(ghost.x, ghost.y, rdx, rdy, viewRadius);
      ctx.lineTo(hit.x, hit.y);
    }
    ctx.closePath();

    if (ghost.playerVisible) {
      ctx.fillStyle = "rgba(239, 68, 68, 0.35)";
      ctx.strokeStyle = "#EF4444";
    } else if (ghost.lastSeenPos) {
      ctx.fillStyle = "rgba(249, 115, 22, 0.25)";
      ctx.strokeStyle = "#F97316";
    } else {
      ctx.fillStyle = isProbabilisticMode ? "rgba(245, 158, 11, 0.15)" : "rgba(100, 116, 139, 0.12)";
      ctx.strokeStyle = isProbabilisticMode ? "rgba(245, 158, 11, 0.45)" : "rgba(100, 116, 139, 0.35)";
    }
    ctx.lineWidth = 1.5;
    ctx.fill();
    ctx.stroke();

    // 8. Renderização das Entidades
    // Jogador (Esmeralda)
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#10B981";
    ctx.fill();

    // Fantasma IA
    ctx.beginPath();
    ctx.arc(ghost.x, ghost.y, ghost.radius, 0, Math.PI * 2);
    ctx.fillStyle = ghost.playerVisible ? "#EF4444" : (isProbabilisticMode ? "#F59E0B" : "#94A3B8");
    ctx.fill();

    // Vetor de Orientação do Fantasma
    ctx.beginPath();
    ctx.moveTo(ghost.x, ghost.y);
    ctx.lineTo(ghost.x + Math.cos(ghost.angle) * 12, ghost.y + Math.sin(ghost.angle) * 12);
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 2;
    ctx.stroke();

    // 9. Banner Toast de Fim de Rodada
    if (roundToastTimer > 0) {
      roundToastTimer--;
      ctx.fillStyle = "rgba(11, 19, 32, 0.88)";
      ctx.fillRect(canvas.width * 0.20, canvas.height * 0.42, canvas.width * 0.60, 34);
      ctx.strokeStyle = "rgba(16, 185, 129, 0.5)";
      ctx.lineWidth = 1;
      ctx.strokeRect(canvas.width * 0.20, canvas.height * 0.42, canvas.width * 0.60, 34);

      ctx.font = "10px monospace";
      ctx.fillStyle = "#34D399";
      ctx.textAlign = "center";
      ctx.fillText(roundToast, canvas.width * 0.5, canvas.height * 0.42 + 21);
      ctx.textAlign = "start";
    }

    // 10. Atualização de Telemetria no DOM
    if (modeStatus && aiStateEl) {
      if (ghost.playerVisible) {
        modeStatus.textContent = "ALERTA: CONTATO VISUAL (PERSEGUINDO)";
        modeStatus.style.color = "#EF4444";
        aiStateEl.textContent = "IA EM PERSEGUIÇÃO DIRETA AO JOGADOR";
        aiStateEl.style.color = "#EF4444";
      } else if (ghost.lastSeenPos) {
        modeStatus.textContent = "INVESTIGANDO ÚLTIMO PONTO VISTO";
        modeStatus.style.color = "#F97316";
        aiStateEl.textContent = "VISÃO QUEBRADA • VERIFICANDO COORDENADA";
        aiStateEl.style.color = "#F97316";
      } else if (isProbabilisticMode) {
        modeStatus.textContent = `EMBOSCADA TOP 5: NÓ ${patrolRouteIndex + 1}/${Math.max(1, currentHeatmapPatrolRoute.length)}`;
        modeStatus.style.color = "var(--gold)";
        aiStateEl.textContent = `RODADA #${roundNumber} • TRAJETOS GRAVADOS: ${allPlayerPaths.length}`;
        aiStateEl.style.color = "var(--green-ink)";
      } else {
        modeStatus.textContent = "PATRULHA CEGA (GHOSTRANDOM)";
        modeStatus.style.color = "var(--muted)";
        aiStateEl.textContent = "MODO PADRÃO SEM LEITURA TÉRMICA";
        aiStateEl.style.color = "var(--muted)";
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

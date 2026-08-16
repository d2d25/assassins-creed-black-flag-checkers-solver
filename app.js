"use strict";

const EMPTY = null;
const FILES = "abcdefgh";
const OPP = { w: "b", b: "w" };
const PIECE_ORDER = [null, "wm", "wk", "bm", "bk"];
const MAN_DIR = { w: 1, b: -1 };
const DIAGONALS = [
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
];
const TRANSLATIONS = {
  fr: {
    appTitle: "Assassin's Creed Black Flag Checkers Solver",
    gameSection: "Partie",
    language: "Langue",
    yourSide: "Ton camp",
    whoPlaysNow: "Qui joue maintenant",
    white: "Blancs",
    black: "Noirs",
    invertSquares: "Inverser les couleurs des cases",
    initialPosition: "Position initiale",
    clearBoard: "Vider",
    startAssistant: "Lancer l'assistance",
    undo: "Annuler le dernier coup",
    boardEdit: "Édition du plateau",
    editHint: "Clique sur une case sombre pour faire défiler : vide, pion blanc, dame blanche, pion noir, dame noire.",
    whiteMan: "Pion blanc",
    whiteKing: "Dame blanche",
    blackMan: "Pion noir",
    blackKing: "Dame noire",
    moveInput: "Coup à entrer",
    moveHint: "Clique le pion qui vient de jouer, puis sa case d'arrivée. Pour une rafle, clique chaque case d'atterrissage.",
    suggestedMove: "Coup proposé",
    history: "Historique",
    initialStatus: "Initialise une position, puis lance l'assistance.",
    startBest: "Lance l'assistance.",
    searching: "Calcul du meilleur coup...",
    toMove: "À jouer : {side}",
    clickSidePiece: "Clique un pion {side} à jouer.",
    noLegalPiece: "Ce pion n'a pas de coup légal.",
    multipleCaptures: "Plusieurs rafles finissent ici. Clique les cases de la rafle une par une.",
    continueCapture: "Continue la rafle.",
    noLegalMove: "Aucun coup légal : position perdue ou bloquée.",
    noLegalStatus: "Aucun coup légal disponible.",
    suggestedStatus: "Coup proposé pour les {side} : {move}. Clique ce coup sur le plateau après l'avoir joué.",
    clickMoveFor: "Clique le coup des {side}.",
    yourTurnInput: "À toi de saisir le coup des {side}.",
    clickPlayedMove: "Clique le coup joué par les {side}.",
    loadedInitial: "Position initiale chargée.",
    cleared: "Plateau vidé. Clique sur les cases sombres pour reproduire la position.",
    startedClick: "Assistance lancée. Clique le coup joué par les {side}.",
    nothingUndo: "Rien à annuler.",
    undone: "Dernier coup annulé.",
    undoneBest: "Coup annulé.",
  },
  en: {
    appTitle: "Assassin's Creed Black Flag Checkers Solver",
    gameSection: "Game",
    language: "Language",
    yourSide: "Your side",
    whoPlaysNow: "Who plays now",
    white: "White",
    black: "Black",
    invertSquares: "Invert board colors",
    initialPosition: "Initial position",
    clearBoard: "Clear",
    startAssistant: "Start assistant",
    undo: "Undo last move",
    boardEdit: "Board setup",
    editHint: "Click a playable square to cycle: empty, white man, white king, black man, black king.",
    whiteMan: "White man",
    whiteKing: "White king",
    blackMan: "Black man",
    blackKing: "Black king",
    moveInput: "Move input",
    moveHint: "Click the piece that moved, then its landing square. For a capture chain, click each landing square.",
    suggestedMove: "Suggested move",
    history: "History",
    initialStatus: "Set up a position, then start the assistant.",
    startBest: "Start the assistant.",
    searching: "Calculating best move...",
    toMove: "To move: {side}",
    clickSidePiece: "Click a {side} piece to move.",
    noLegalPiece: "This piece has no legal move.",
    multipleCaptures: "Several capture chains end here. Click the capture landing squares one by one.",
    continueCapture: "Continue the capture chain.",
    noLegalMove: "No legal move: lost or blocked position.",
    noLegalStatus: "No legal move available.",
    suggestedStatus: "Suggested move for {side}: {move}. After playing it in the real game, click it on the board.",
    clickMoveFor: "Click the {side} move.",
    yourTurnInput: "Enter the {side} move now.",
    clickPlayedMove: "Click the move played by {side}.",
    loadedInitial: "Initial position loaded.",
    cleared: "Board cleared. Click playable squares to recreate the position.",
    startedClick: "Assistant started. Click the move played by {side}.",
    nothingUndo: "Nothing to undo.",
    undone: "Last move undone.",
    undoneBest: "Move undone.",
  },
  es: {
    appTitle: "Assassin's Creed Black Flag Checkers Solver",
    gameSection: "Partida",
    language: "Idioma",
    yourSide: "Tu bando",
    whoPlaysNow: "Quién juega ahora",
    white: "Blancas",
    black: "Negras",
    invertSquares: "Invertir colores del tablero",
    initialPosition: "Posición inicial",
    clearBoard: "Vaciar",
    startAssistant: "Iniciar asistente",
    undo: "Deshacer último movimiento",
    boardEdit: "Editar tablero",
    editHint: "Haz clic en una casilla jugable para alternar: vacía, peón blanco, dama blanca, peón negro, dama negra.",
    whiteMan: "Peón blanco",
    whiteKing: "Dama blanca",
    blackMan: "Peón negro",
    blackKing: "Dama negra",
    moveInput: "Movimiento",
    moveHint: "Haz clic en la pieza que se movió y luego en su casilla de llegada. En una captura múltiple, haz clic en cada llegada.",
    suggestedMove: "Movimiento sugerido",
    history: "Historial",
    initialStatus: "Configura una posición y luego inicia el asistente.",
    startBest: "Inicia el asistente.",
    searching: "Calculando el mejor movimiento...",
    toMove: "Juegan: {side}",
    clickSidePiece: "Haz clic en una pieza {side} para mover.",
    noLegalPiece: "Esta pieza no tiene movimiento legal.",
    multipleCaptures: "Varias capturas terminan aquí. Haz clic en las llegadas una por una.",
    continueCapture: "Continúa la captura.",
    noLegalMove: "Sin movimiento legal: posición perdida o bloqueada.",
    noLegalStatus: "No hay movimiento legal disponible.",
    suggestedStatus: "Movimiento sugerido para {side}: {move}. Después de jugarlo en la partida real, haz clic en el tablero.",
    clickMoveFor: "Haz clic en el movimiento de {side}.",
    yourTurnInput: "Introduce ahora el movimiento de {side}.",
    clickPlayedMove: "Haz clic en el movimiento jugado por {side}.",
    loadedInitial: "Posición inicial cargada.",
    cleared: "Tablero vacío. Haz clic en casillas jugables para recrear la posición.",
    startedClick: "Asistente iniciado. Haz clic en el movimiento jugado por {side}.",
    nothingUndo: "No hay nada que deshacer.",
    undone: "Último movimiento deshecho.",
    undoneBest: "Movimiento deshecho.",
  },
};

let board = createInitialBoard();
let sideToMove = "w";
let userSide = "b";
let language = typeof localStorage === "undefined" ? "en" : localStorage.getItem("language") || "en";
let assistantStarted = false;
let selected = null;
let selectedPath = [];
let candidateMoves = [];
let bestMove = null;
let highlights = [];
let invertSquares = false;
const history = [];
const undoStack = [];

const els = {
  board: document.getElementById("board"),
  rankLabels: document.getElementById("rankLabels"),
  fileLabels: document.getElementById("fileLabels"),
  statusText: document.getElementById("statusText"),
  turnBadge: document.getElementById("turnBadge"),
  language: document.getElementById("language"),
  userSide: document.getElementById("userSide"),
  sideToMove: document.getElementById("sideToMove"),
  invertSquares: document.getElementById("invertSquares"),
  standardBtn: document.getElementById("standardBtn"),
  clearBtn: document.getElementById("clearBtn"),
  startBtn: document.getElementById("startBtn"),
  undoBtn: document.getElementById("undoBtn"),
  bestMove: document.getElementById("bestMove"),
  history: document.getElementById("history"),
};

function t(key, vars = {}) {
  const table = TRANSLATIONS[language] || TRANSLATIONS.en;
  let text = table[key] || TRANSLATIONS.en[key] || key;
  Object.entries(vars).forEach(([name, value]) => {
    text = text.replaceAll(`{${name}}`, value);
  });
  return text;
}

function sideName(side) {
  return side === "w" ? t("white") : t("black");
}

function applyLanguage() {
  if (document.documentElement) document.documentElement.lang = language;
  if (document.querySelectorAll) {
    document.querySelectorAll("[data-i18n]").forEach((node) => {
      node.textContent = t(node.dataset.i18n);
    });
  }
  if (els.language) els.language.value = language;
  renderHistory();
}

function createInitialBoard() {
  const b = Array.from({ length: 8 }, () => Array(8).fill(EMPTY));
  for (let r = 0; r < 8; r += 1) {
    for (let c = 0; c < 8; c += 1) {
      if (!isDark(r, c)) continue;
      const rank = rankFromRow(r);
      if (rank <= 3) b[r][c] = { side: "w", king: false };
      if (rank >= 6) b[r][c] = { side: "b", king: false };
    }
  }
  return b;
}

function createEmptyBoard() {
  return Array.from({ length: 8 }, () => Array(8).fill(EMPTY));
}

function cloneBoard(b) {
  return b.map((row) => row.map((p) => (p ? { ...p } : EMPTY)));
}

function isDark(r, c) {
  return (c + rankFromRow(r)) % 2 === 1;
}

function rankFromRow(r) {
  return 8 - r;
}

function rowFromRank(rank) {
  return 8 - rank;
}

function coord(pos) {
  return `${FILES[pos.c]}${rankFromRow(pos.r)}`;
}

function parseCoord(text) {
  const clean = text.trim().toLowerCase();
  if (!/^[a-h][1-8]$/.test(clean)) return null;
  return { c: FILES.indexOf(clean[0]), r: rowFromRank(Number(clean[1])) };
}

function samePos(a, b) {
  return a && b && a.r === b.r && a.c === b.c;
}

function inside(r, c) {
  return r >= 0 && r < 8 && c >= 0 && c < 8;
}

function promotionRow(side, r) {
  return side === "w" ? r === 0 : r === 7;
}

function displayRows() {
  return userSide === "b" ? [7, 6, 5, 4, 3, 2, 1, 0] : [0, 1, 2, 3, 4, 5, 6, 7];
}

function displayCols() {
  return userSide === "b" ? [7, 6, 5, 4, 3, 2, 1, 0] : [0, 1, 2, 3, 4, 5, 6, 7];
}

function displayIndex(pos) {
  const rows = displayRows();
  const cols = displayCols();
  return { row: rows.indexOf(pos.r), col: cols.indexOf(pos.c) };
}

function render() {
  els.board.innerHTML = "";
  renderLabels();
  const rows = displayRows();
  const cols = displayCols();
  for (const r of rows) {
    for (const c of cols) {
      const square = document.createElement("button");
      square.type = "button";
      const playable = isDark(r, c);
      const visuallyDark = playable !== invertSquares;
      square.className = `square ${visuallyDark ? "dark" : "light"} ${playable ? "playable" : ""}`;
      square.dataset.r = String(r);
      square.dataset.c = String(c);
      if (samePos(selected, { r, c })) square.classList.add("selected");
      if (highlights.some((p) => samePos(p, { r, c }))) square.classList.add("path");
      if (bestMove && samePos(bestMove.path[0], { r, c })) square.classList.add("from");
      if (bestMove && samePos(bestMove.path[bestMove.path.length - 1], { r, c })) square.classList.add("to");
      square.setAttribute("aria-label", coord({ r, c }));
      const label = document.createElement("span");
      label.className = "coord";
      label.textContent = coord({ r, c });
      square.appendChild(label);
      const piece = board[r][c];
      if (piece) square.appendChild(renderPiece(piece));
      square.addEventListener("click", () => handleSquareClick(r, c));
      els.board.appendChild(square);
    }
  }
  if (bestMove) els.board.appendChild(renderArrow(bestMove.path));
  applyLanguage();
  els.turnBadge.textContent = t("toMove", { side: sideName(sideToMove) });
  els.sideToMove.value = sideToMove;
  els.userSide.value = userSide;
  els.invertSquares.checked = invertSquares;
  renderHistory();
}

function renderLabels() {
  els.rankLabels.innerHTML = "";
  displayRows().forEach((r) => {
    const span = document.createElement("span");
    span.textContent = String(rankFromRow(r));
    els.rankLabels.appendChild(span);
  });
  els.fileLabels.innerHTML = "";
  displayCols().forEach((c) => {
    const span = document.createElement("span");
    span.textContent = FILES[c];
    els.fileLabels.appendChild(span);
  });
}

function renderArrow(path) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", "arrow-layer");
  svg.setAttribute("viewBox", "0 0 800 800");
  const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  const marker = document.createElementNS("http://www.w3.org/2000/svg", "marker");
  marker.setAttribute("id", "arrowHead");
  marker.setAttribute("markerWidth", "10");
  marker.setAttribute("markerHeight", "10");
  marker.setAttribute("refX", "7");
  marker.setAttribute("refY", "3");
  marker.setAttribute("orient", "auto");
  marker.setAttribute("markerUnits", "strokeWidth");
  const arrowShape = document.createElementNS("http://www.w3.org/2000/svg", "path");
  arrowShape.setAttribute("d", "M0,0 L0,6 L8,3 z");
  arrowShape.setAttribute("fill", "#e53935");
  marker.appendChild(arrowShape);
  defs.appendChild(marker);
  svg.appendChild(defs);
  const polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
  polyline.setAttribute("class", "move-arrow");
  polyline.setAttribute("marker-end", "url(#arrowHead)");
  const points = path.map((pos) => {
    const idx = displayIndex(pos);
    return `${idx.col * 100 + 50},${idx.row * 100 + 50}`;
  });
  polyline.setAttribute("points", points.join(" "));
  svg.appendChild(polyline);
  return svg;
}

function renderPiece(piece) {
  const el = document.createElement("span");
  el.className = `piece ${piece.side === "w" ? "white" : "black"} ${piece.king ? "king" : ""}`;
  return el;
}

function setStatus(text) {
  els.statusText.textContent = text;
}

function renderHistory() {
  els.history.innerHTML = "";
  history.forEach((item) => {
    const li = document.createElement("li");
    li.className = item.side === userSide ? "user" : "opponent";
    li.textContent = `${sideName(item.side)} : ${item.text}`;
    els.history.appendChild(li);
  });
}

function handleSquareClick(r, c) {
  if (!isDark(r, c)) return;
  if (!assistantStarted) {
    cyclePiece(r, c);
    bestMove = null;
    highlights = [];
    render();
    return;
  }

  const clicked = { r, c };
  if (selected) {
    const nextPath = [...selectedPath, clicked];
    const matching = candidateMoves.filter((m) => pathStartsWith(m.path, nextPath));
    const complete = matching.filter((m) => m.path.length === nextPath.length);
    if (complete.length === 1) {
      applyMoveToState(complete[0], sideToMove, sideToMove === userSide ? "user" : "opponent");
      afterMoveApplied();
      return;
    }
    if (complete.length > 1) {
      setStatus(t("multipleCaptures"));
      selectedPath = nextPath;
      candidateMoves = complete;
      highlights = [];
      render();
      return;
    }
    if (matching.length) {
      selectedPath = nextPath;
      candidateMoves = matching;
      highlights = nextClickableSquares(candidateMoves, selectedPath);
      setStatus(t("continueCapture"));
      render();
      return;
    }
  }

  const piece = board[r][c];
  if (!piece || piece.side !== sideToMove) {
    setStatus(t("clickSidePiece", { side: sideName(sideToMove).toLowerCase() }));
    resetSelection();
    render();
    return;
  }
  selected = clicked;
  selectedPath = [clicked];
  candidateMoves = legalMovesFrom(board, sideToMove, selected);
  highlights = nextClickableSquares(candidateMoves, selectedPath);
  if (!candidateMoves.length) setStatus(t("noLegalPiece"));
  render();
}

function pathStartsWith(path, prefix) {
  if (prefix.length > path.length) return false;
  return prefix.every((pos, idx) => samePos(pos, path[idx]));
}

function nextClickableSquares(moves, prefix) {
  const squares = [];
  moves.forEach((move) => {
    const next = move.path[prefix.length];
    if (next && !squares.some((p) => samePos(p, next))) squares.push(next);
  });
  return squares;
}

function resetSelection() {
  selected = null;
  selectedPath = [];
  candidateMoves = [];
  highlights = bestMove ? bestMove.path.slice(1) : [];
}

function cyclePiece(r, c) {
  const current = board[r][c];
  const key = current ? `${current.side}${current.king ? "k" : "m"}` : null;
  const next = PIECE_ORDER[(PIECE_ORDER.indexOf(key) + 1) % PIECE_ORDER.length];
  board[r][c] = next ? { side: next[0], king: next[1] === "k" } : EMPTY;
}

function parseMoveText(text) {
  const clean = text.trim().toLowerCase().replace(/\s+/g, "");
  const separator = clean.includes(":") ? ":" : "-";
  const parts = clean.split(separator);
  if (parts.length < 2) return null;
  const path = parts.map(parseCoord);
  if (path.some((p) => !p || !isDark(p.r, p.c))) return null;
  return { path, capture: separator === ":" };
}

function moveNotation(move) {
  return move.path.map(coord).join(move.captures.length ? ":" : "-");
}

function pathsEqual(a, b) {
  if (a.length !== b.length) return false;
  return a.every((p, idx) => samePos(p, b[idx]));
}

function findMatchingLegalMove(textMove, side) {
  const parsed = parseMoveText(textMove);
  if (!parsed) return null;
  const legal = generateLegalMoves(board, side);
  return legal.find((m) => pathsEqual(m.path, parsed.path)) || null;
}

function applyMoveToState(move, side, source) {
  undoStack.push({
    board: cloneBoard(board),
    sideToMove,
    historyLength: history.length,
    bestMove: bestMove ? cloneMove(bestMove) : null,
  });
  board = applyMove(board, move);
  sideToMove = OPP[side];
  bestMove = null;
  resetSelection();
  history.push({ side, text: moveNotation(move), source });
  render();
}

function cloneMove(move) {
  return {
    path: move.path.map((p) => ({ ...p })),
    captures: move.captures.map((p) => ({ ...p })),
  };
}

function afterMoveApplied() {
  if (sideToMove === userSide) {
    scheduleAnalyzeForUser();
  } else {
    els.bestMove.textContent = t("yourTurnInput", { side: sideName(sideToMove) });
    setStatus(t("clickPlayedMove", { side: sideName(sideToMove) }));
    render();
  }
}

function scheduleAnalyzeForUser() {
  bestMove = null;
  highlights = [];
  els.bestMove.textContent = t("searching");
  setStatus(t("searching"));
  render();
  globalThis.setTimeout(analyzeForUser, 40);
}

function applyMove(b, move) {
  const next = cloneBoard(b);
  const start = move.path[0];
  const end = move.path[move.path.length - 1];
  const piece = next[start.r][start.c];
  next[start.r][start.c] = EMPTY;
  move.captures.forEach((cap) => {
    next[cap.r][cap.c] = EMPTY;
  });
  next[end.r][end.c] = { ...piece, king: piece.king || promotionRow(piece.side, end.r) };
  return next;
}

function generateLegalMoves(b, side) {
  const captures = [];
  const quiet = [];
  for (let r = 0; r < 8; r += 1) {
    for (let c = 0; c < 8; c += 1) {
      const piece = b[r][c];
      if (!piece || piece.side !== side) continue;
      captures.push(...captureMovesFrom(b, { r, c }, piece));
      quiet.push(...quietMovesFrom(b, { r, c }, piece));
    }
  }
  return captures.length ? captures : quiet;
}

function legalMovesFrom(b, side, pos) {
  const piece = b[pos.r][pos.c];
  if (!piece || piece.side !== side) return [];
  const allCaptures = generateLegalMoves(b, side).filter((m) => m.captures.length);
  if (allCaptures.length) return allCaptures.filter((m) => samePos(m.path[0], pos));
  return quietMovesFrom(b, pos, piece);
}

function quietMovesFrom(b, pos, piece) {
  const moves = [];
  if (piece.king) {
    DIAGONALS.forEach(([dr, dc]) => {
      const r = pos.r + dr;
      const c = pos.c + dc;
      if (inside(r, c) && !b[r][c]) {
        moves.push({ path: [pos, { r, c }], captures: [] });
      }
    });
  } else {
    const dr = -MAN_DIR[piece.side];
    [-1, 1].forEach((dc) => {
      const r = pos.r + dr;
      const c = pos.c + dc;
      if (inside(r, c) && !b[r][c]) moves.push({ path: [pos, { r, c }], captures: [] });
    });
  }
  return moves;
}

function captureMovesFrom(b, pos, piece) {
  const state = cloneBoard(b);
  const workingPiece = { ...piece };
  state[pos.r][pos.c] = EMPTY;
  const results = [];
  dfsCaptures(state, pos, workingPiece, [pos], [], results);
  return results;
}

function dfsCaptures(state, pos, piece, path, captures, results) {
  const options = piece.king ? kingCaptureOptions(state, pos, piece.side) : manCaptureOptions(state, pos, piece.side);
  if (!options.length) {
    if (captures.length) results.push({ path: path.map((p) => ({ ...p })), captures: captures.map((p) => ({ ...p })) });
    return;
  }

  options.forEach((opt) => {
    const nextState = cloneBoard(state);
    nextState[opt.capture.r][opt.capture.c] = { side: "x", king: false, captured: true };
    const becameKing = piece.king || promotionRow(piece.side, opt.land.r);
    dfsCaptures(
      nextState,
      opt.land,
      { side: piece.side, king: becameKing },
      [...path, opt.land],
      [...captures, opt.capture],
      results,
    );
  });
}

function manCaptureOptions(state, pos, side) {
  const options = [];
  [[-MAN_DIR[side], -1], [-MAN_DIR[side], 1]].forEach(([dr, dc]) => {
    const mr = pos.r + dr;
    const mc = pos.c + dc;
    const lr = pos.r + dr * 2;
    const lc = pos.c + dc * 2;
    if (!inside(lr, lc) || !inside(mr, mc)) return;
    const target = state[mr][mc];
    if (target && !target.captured && target.side !== side && !state[lr][lc]) {
      options.push({ capture: { r: mr, c: mc }, land: { r: lr, c: lc } });
    }
  });
  return options;
}

function kingCaptureOptions(state, pos, side) {
  const options = [];
  DIAGONALS.forEach(([dr, dc]) => {
    const mr = pos.r + dr;
    const mc = pos.c + dc;
    const lr = pos.r + dr * 2;
    const lc = pos.c + dc * 2;
    if (!inside(lr, lc) || !inside(mr, mc)) return;
    const target = state[mr][mc];
    if (target && !target.captured && target.side !== side && !state[lr][lc]) {
      options.push({ capture: { r: mr, c: mc }, land: { r: lr, c: lc } });
    }
  });
  return options;
}

function evaluate(b, side) {
  const legalSide = generateLegalMoves(b, side);
  const legalOpp = generateLegalMoves(b, OPP[side]);
  if (!legalSide.length) return -100000;
  if (!legalOpp.length) return 100000;

  let score = 0;
  for (let r = 0; r < 8; r += 1) {
    for (let c = 0; c < 8; c += 1) {
      const p = b[r][c];
      if (!p) continue;
      const direction = p.side === side ? 1 : -1;
      const advancement = p.side === "w" ? 7 - r : r;
      const value = p.king ? 525 : 175 + advancement * 8;
      score += p.side === side ? value : -value;
      const center = 14 - Math.abs(3.5 - r) * 2 - Math.abs(3.5 - c) * 2;
      score += direction * center;
    }
  }
  score += (legalSide.length - legalOpp.length) * 6;
  return score;
}

function chooseBestMove(b, side) {
  const moves = orderMoves(generateLegalMoves(b, side));
  if (!moves.length) return null;
  const start = performance.now();
  let depth = 1;
  let chosen = moves[0];
  while (depth <= 8 && performance.now() - start < 2200) {
    let bestScore = -Infinity;
    let bestAtDepth = chosen;
    for (const move of moves) {
      const score = search(applyMove(b, move), OPP[side], side, depth - 1, -Infinity, Infinity, start);
      if (score > bestScore) {
        bestScore = score;
        bestAtDepth = move;
      }
      if (performance.now() - start > 2200) break;
    }
    chosen = bestAtDepth;
    depth += 1;
  }
  return chosen;
}

function search(b, currentSide, user, depth, alpha, beta, start) {
  if (depth <= 0 || performance.now() - start > 2300) return evaluate(b, user);
  const moves = orderMoves(generateLegalMoves(b, currentSide));
  if (!moves.length) return currentSide === user ? -100000 : 100000;

  if (currentSide === user) {
    let best = -Infinity;
    for (const move of moves) {
      const score = search(applyMove(b, move), OPP[currentSide], user, depth - 1, alpha, beta, start);
      if (score > best) best = score;
      if (score > alpha) alpha = score;
      if (alpha >= beta) break;
    }
    return best;
  }

  let best = Infinity;
  for (const move of moves) {
    const score = search(applyMove(b, move), OPP[currentSide], user, depth - 1, alpha, beta, start);
    if (score < best) best = score;
    if (score < beta) beta = score;
    if (alpha >= beta) break;
  }
  return best;
}

function orderMoves(moves) {
  return [...moves].sort((a, b) => b.captures.length - a.captures.length || b.path.length - a.path.length);
}

function analyzeForUser() {
  if (sideToMove !== userSide) {
    bestMove = null;
    highlights = [];
    els.bestMove.textContent = t("clickMoveFor", { side: sideName(sideToMove) });
    render();
    return;
  }
  bestMove = chooseBestMove(board, userSide);
  if (!bestMove) {
    els.bestMove.textContent = t("noLegalMove");
    setStatus(t("noLegalStatus"));
  } else {
    els.bestMove.textContent = moveNotation(bestMove);
    highlights = bestMove.path.slice(1);
    setStatus(t("suggestedStatus", { side: sideName(userSide), move: moveNotation(bestMove) }));
  }
  render();
}

els.standardBtn.addEventListener("click", () => {
  board = createInitialBoard();
  sideToMove = "w";
  assistantStarted = false;
  bestMove = null;
  resetSelection();
  history.length = 0;
  undoStack.length = 0;
  els.bestMove.textContent = t("startBest");
  setStatus(t("loadedInitial"));
  render();
});

els.clearBtn.addEventListener("click", () => {
  board = createEmptyBoard();
  assistantStarted = false;
  bestMove = null;
  resetSelection();
  history.length = 0;
  undoStack.length = 0;
  els.bestMove.textContent = t("startBest");
  setStatus(t("cleared"));
  render();
});

els.startBtn.addEventListener("click", () => {
  userSide = els.userSide.value;
  sideToMove = els.sideToMove.value;
  assistantStarted = true;
  bestMove = null;
  resetSelection();
  els.bestMove.textContent = t("searching");
  if (sideToMove === userSide) scheduleAnalyzeForUser();
  else {
    els.bestMove.textContent = t("clickMoveFor", { side: sideName(sideToMove) });
    setStatus(t("startedClick", { side: sideName(sideToMove) }));
    render();
  }
});

els.userSide.addEventListener("change", () => {
  userSide = els.userSide.value;
  bestMove = null;
  resetSelection();
  if (assistantStarted && sideToMove === userSide) scheduleAnalyzeForUser();
  render();
});

els.sideToMove.addEventListener("change", () => {
  sideToMove = els.sideToMove.value;
  bestMove = null;
  resetSelection();
  if (assistantStarted && sideToMove === userSide) scheduleAnalyzeForUser();
  render();
});

els.invertSquares.addEventListener("change", () => {
  invertSquares = els.invertSquares.checked;
  render();
});

els.language.addEventListener("change", () => {
  language = els.language.value;
  if (typeof localStorage !== "undefined") localStorage.setItem("language", language);
  applyLanguage();
  if (!assistantStarted) {
    setStatus(t("initialStatus"));
    els.bestMove.textContent = t("startBest");
  } else if (bestMove) {
    setStatus(t("suggestedStatus", { side: sideName(userSide), move: moveNotation(bestMove) }));
    els.bestMove.textContent = moveNotation(bestMove);
  } else {
    setStatus(sideToMove === userSide ? t("searching") : t("clickPlayedMove", { side: sideName(sideToMove) }));
    els.bestMove.textContent = sideToMove === userSide ? t("searching") : t("clickMoveFor", { side: sideName(sideToMove) });
  }
  render();
});

els.undoBtn.addEventListener("click", () => {
  const snapshot = undoStack.pop();
  if (!snapshot) {
    setStatus(t("nothingUndo"));
    return;
  }
  board = cloneBoard(snapshot.board);
  sideToMove = snapshot.sideToMove;
  history.length = snapshot.historyLength;
  bestMove = snapshot.bestMove;
  resetSelection();
  els.bestMove.textContent = bestMove ? moveNotation(bestMove) : t("undoneBest");
  setStatus(t("undone"));
  render();
});

setStatus(t("initialStatus"));
els.bestMove.textContent = t("startBest");
render();

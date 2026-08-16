const fs = require("fs");
const vm = require("vm");

function fakeElement() {
  return {
    value: "",
    checked: false,
    textContent: "",
    innerHTML: "",
    className: "",
    dataset: {},
    classList: { add() {} },
    style: {},
    appendChild() {},
    addEventListener() {},
    setAttribute() {},
  };
}

const context = {
  console,
  performance,
  setTimeout,
  document: {
    documentElement: {},
    getElementById() {
      return fakeElement();
    },
    createElement() {
      return fakeElement();
    },
    createElementNS() {
      return fakeElement();
    },
    querySelectorAll() {
      return [];
    },
  },
};

vm.createContext(context);
vm.runInContext(fs.readFileSync("app.js", "utf8"), context);

function run(code) {
  return vm.runInContext(code, context);
}

function emptyBoard() {
  return run("createEmptyBoard()");
}

function put(board, square, side, king = false) {
  const pos = run(`parseCoord("${square}")`);
  board[pos.r][pos.c] = { side, king };
}

function legalMoves(board, side) {
  context.__board = board;
  return run(`generateLegalMoves(__board, "${side}").map(moveNotation).sort()`);
}

function assert(name, condition, detail = "") {
  if (!condition) {
    throw new Error(`${name}${detail ? `: ${detail}` : ""}`);
  }
  console.log(`ok ${name}`);
}

let board = emptyBoard();
put(board, "e5", "w");
put(board, "d4", "b");
let moves = legalMoves(board, "w");
assert("men do not capture backward", !moves.includes("e5:c3"), moves.join(", "));

board = emptyBoard();
put(board, "c3", "w");
put(board, "d4", "b");
moves = legalMoves(board, "w");
assert("men capture forward", moves.includes("c3:e5"), moves.join(", "));

board = emptyBoard();
put(board, "d8", "w", true);
moves = legalMoves(board, "w");
assert("kings are not flying kings", !moves.includes("d8-h4"), moves.join(", "));
assert("kings move one square diagonally", moves.includes("d8-c7") && moves.includes("d8-e7"), moves.join(", "));

board = emptyBoard();
put(board, "d8", "w", true);
put(board, "e7", "b");
put(board, "e5", "b");
moves = legalMoves(board, "w");
assert("kings can short-jump capture chains", moves.includes("d8:f6:d4"), moves.join(", "));
assert("kings do not land past the short jump", !moves.includes("d8:h4"), moves.join(", "));

console.log("all rule smoke tests passed");

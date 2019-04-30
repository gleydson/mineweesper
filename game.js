const minesweeper = document.querySelector("#minesweeper");

const mines = [];

const debugMode = false;

const minMines = 10;
const maxMines = 30;

const numberOfFields = 10;

const LEFT = "left";
const RIGTH = "right";

const BOMB = "💣";

const initGame = () => {
  initializeBoard();
  updateFieldsWithMines();
  generateIndicators();
  renderMinefield();
};

const initializeBoard = () => {
  for (let line = 0; line < numberOfFields; line++) {
    mines[line] = [];
    for (let column = 0; column < numberOfFields; column++) {
      mines[line][column] = "-";
    }
  }
};

const updateFieldsWithMines = () => {
  let numberOfMines =
    (Math.pow(numberOfFields, 2) *
      Math.floor(Math.random() * (maxMines - minMines + 1) + minMines)) /
    100;

  while (numberOfMines > 0) {
    const lineRandom = Math.floor(Math.random() * numberOfFields);
    const columnRandom = Math.floor(Math.random() * numberOfFields);
    if (mines[lineRandom][columnRandom] === "-") {
      mines[lineRandom][columnRandom] = BOMB;
      numberOfMines--;
    }
  }
};

const isInside = (line, column) => {
  if (
    line < 0 ||
    line >= numberOfFields ||
    column < 0 ||
    column >= numberOfFields
  )
    return false;
  return true;
};

const isBomb = (line, column) => {
  if (mines[line][column] === BOMB) return true;
  return false;
};

const getNeighbors = (line, column) => {
  const neighbors = [];
  neighbors.push(isInside(line, column - 1) ? mines[line][column - 1] : null);
  neighbors.push(isInside(line, column + 1) ? mines[line][column + 1] : null);
  neighbors.push(isInside(line - 1, column) ? mines[line - 1][column] : null);
  neighbors.push(isInside(line + 1, column) ? mines[line + 1][column] : null);
  neighbors.push(
    isInside(line - 1, column - 1) ? mines[line - 1][column - 1] : null
  );
  neighbors.push(
    isInside(line - 1, column + 1) ? mines[line - 1][column + 1] : null
  );
  neighbors.push(
    isInside(line + 1, column - 1) ? mines[line + 1][column - 1] : null
  );
  neighbors.push(
    isInside(line + 1, column + 1) ? mines[line + 1][column + 1] : null
  );

  return neighbors;
};

const getQuantityOfBombsAround = (line, column) => {
  let myValue = 0;
  for (el of getNeighbors(line, column)) {
    if (el === BOMB) myValue += 1;
  }
  return myValue;
};

const generateIndicators = () => {
  for (let line = 0; line < numberOfFields; line++) {
    for (let column = 0; column < numberOfFields; column++) {
      if (!isBomb(line, column)) {
        const numberOfBombs = getQuantityOfBombsAround(line, column);
        if (numberOfBombs === 0) {
          mines[line][column] = "";
        } else {
          mines[line][column] = getQuantityOfBombsAround(line, column);
        }
      }
    }
  }
};

const show = id => {
  let el = document.querySelector(`#id-${id}`);
  let span = document.querySelector(`#id-${id}-span`);
  el.removeAttribute("class");
  el.setAttribute("class", "field-index");
  span.removeAttribute("class");
  span.setAttribute("class", "span-show");
};

const renderMinefield = () => {
  let html = "<table cellpadding=0 cellspacing=0>";

  for (let line = 0; line < numberOfFields; line++) {
    html += "<tr>";
    for (let column = 0; column < numberOfFields; column++) {
      const fieldIndex = column + numberOfFields * line;
      const mine = mines[line][column];
      html += "<td>";
      if (debugMode) {
        html += `<div class="field-index">${fieldIndex}</div>`;
        html += mine;
      } else {
        html += `<div class="field-hide" id="id-${fieldIndex}" onclick="show(${fieldIndex})"></div>`;
        html += `<span class="span-hide" id="id-${fieldIndex}-span">${mine}</span>`;
      }
      html += "</td>";
    }
    html += "</tr>";
  }

  html += "</table>";

  minesweeper.innerHTML = html;
};

initGame();

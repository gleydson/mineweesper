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

const isInside = (line, column) =>
  !(
    line < 0 ||
    line >= numberOfFields ||
    column < 0 ||
    column >= numberOfFields
  );

const isBomb = (line, column) => mines[line][column] === BOMB;

const getNeighbors = (line, column) => {
  const neighbors = [];

  isInside(line, column - 1) && neighbors.push(mines[line][column - 1]);
  isInside(line, column + 1) && neighbors.push(mines[line][column + 1]);
  isInside(line - 1, column) && neighbors.push(mines[line - 1][column]);
  isInside(line + 1, column) && neighbors.push(mines[line + 1][column]);
  isInside(line - 1, column - 1) && neighbors.push(mines[line - 1][column - 1]);
  isInside(line - 1, column + 1) && neighbors.push(mines[line - 1][column + 1]);
  isInside(line + 1, column - 1) && neighbors.push(mines[line + 1][column - 1]);
  isInside(line + 1, column + 1) && neighbors.push(mines[line + 1][column + 1]);

  return neighbors;
};

const getQuantityOfBombsAround = (line, column) => getNeighbors(line, column).filter(el => el === BOMB).length;

const generateIndicators = () => {
  for (let line = 0; line < numberOfFields; line++) {
    for (let column = 0; column < numberOfFields; column++) {
      if (!isBomb(line, column)) {
        const numberOfBombs = getQuantityOfBombsAround(line, column);
        if (numberOfBombs === 0) {
          mines[line][column] = "";
        } else {
          mines[line][column] = numberOfBombs;
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

const btnGenerate = document.querySelector(".btn-generate");
const btnGeneration = document.querySelector(".btn-generation");
const containerMaps = document.querySelector(".container-maps");
const CELL_SIZE_A = 75;
const CELL_SIZE_B = 75;
const DENSITY = 50;
const CLASS_NAME_CELL_FLOOR = "cell-gray";
const CLASS_NAME_CELL_WALL = "cell-black";
const MAPS = {
  base: [],
  next: [],
};

const generateRandomNumber = (from = 0, to = 100) =>
  Math.floor(Math.random() * (to - from) + from);

const generateMap = (sizeA = 10, sizeB = 10, density = 0.7) => {
  const map = [];
  for (let i = 0; i < sizeA; i++) {
    const row = [];
    for (let j = 0; j < sizeB; j++) {
      row.push(generateRandomNumber() > density ? 1 : 0);
    }
    map.push(row);
  }
  return map;
};

const renderMap = (map) => {
  containerMaps.innerHTML = "";
  const rows = map
    .map((row) => {
      const rowElement = document.createElement("div");
      rowElement.classList.add("row");
      const cells = row
        .map(
          (cell) =>
            `<div class="cell ${
              cell === 1 ? CLASS_NAME_CELL_WALL : CLASS_NAME_CELL_FLOOR
            }"></div>`
        )
        .join("");
      return `<div class="row">${cells}</div>`;
    })
    .join("");
  const mapHTML = `<div class="map">${rows}</div>`;
  containerMaps.innerHTML = mapHTML;
};

const generateNextGeneration = (map) => {
  const nextGeneration = [];
  for (let i = 0; i < map.length; i++) {
    const row = [];
    for (let j = 0; j < map[i].length; j++) {
      const neighbors = [
        map[i][j],
        map[i - 1]?.[j - 1],
        map[i - 1]?.[j],
        map[i - 1]?.[j + 1],
        map[i]?.[j - 1],
        map[i]?.[j + 1],
        map[i + 1]?.[j - 1],
        map[i + 1]?.[j],
        map[i + 1]?.[j + 1],
      ];
      const deadNeighbors = neighbors.filter((n) => n === 0).length;
      row.push(deadNeighbors < 5 ? 1 : 0);
    }
    nextGeneration.push(row);
  }
  return nextGeneration;
};

btnGenerate.addEventListener("click", () => {
  MAPS.base = generateMap(CELL_SIZE_A, CELL_SIZE_B, DENSITY);
  MAPS.next = [];
  renderMap(MAPS.base);
});

btnGeneration.addEventListener("click", () => {
  MAPS.next = generateNextGeneration(
    MAPS.next.length > 0 ? MAPS.next : MAPS.base
  );
  renderMap(MAPS.next);
});

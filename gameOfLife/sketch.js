let cellsX = 100, cellsY = 90, cellSize = 8
let maxWinX = cellsX * cellSize
let maxWinY = cellsY * cellSize
let grid, tmpGrid
let steps = 1;
let running = true;
let colorPalettes;
let invert = false;
let colorIndex = 1;
let color1, color2, color3;
function getCell(x, y, grid) {
  return grid[mod(x, cellsX) + mod(y, cellsY) * cellsX];
}

function setCell(x, y, grid, value) {
  grid[mod(x, cellsX) + mod(y, cellsY) * cellsX] = value
}
function mod(n, m) {
  return ((n % m) + m) % m;
}
function toggleCell(x, y, _grid) {
  // console.log(_grid.length())
  if (getCell(x, y, _grid) == 1) {
    setCell(x, y, _grid, 0)
  } else {
    setCell(x, y, _grid, 1)
  }
}

function randomInit(_grid) {
  for (let y = 0; y < cellsY; y++) {
    for (let x = 0; x < cellsX; x++) {
      if (Math.random() > 0.9) {
        setCell(x, y, _grid, 1)
      }
    }
  }
}
function setup() {
  colorPalettes = [
    { name: "BW", c1: color('#000000'), c2: color('#ffffff'), c3: color('#505050') },
    { name: "177866", c1: color('#204051'), c2: color('#cae8d5'), c3: color('#3b6978') },
    { name: "178369", c1: color('#679b9b'), c2: color('#ffb6b6'), c3: color('#fde2e2') },
    { name: "179350", c1: color('#511845'), c2: color('#ff5733'), c3: color('#900c3f') },
    { name: "177825", c1: color('#00bdaa'), c2: color('#fe346e'), c3: color('#400082') },
  ];
  color1 = colorPalettes[colorIndex].c1;
  color2 = colorPalettes[colorIndex].c2;
  color3 = colorPalettes[colorIndex].c3;
  createCanvas(cellsX * cellSize, cellsY * cellSize);
  frameRate(30)
  grid = new Array(cellsX * cellsY).fill(0);
  tmpGrid = new Array(cellsX * cellsY).fill(0);
  // for (let y = 0; y < cellsY;y++) {
  //   for (let x = 0;x < cellsX;x++) {
  //     if (x === y) {
  //       setCell(x,y,grid,1);
  //       setCell(cellsX-x,y,grid,1)
  //       // setCell(x+1,y,grid,1);
  //     }
  //   }
  // }
  // setCell(40,40,grid,1);
  // setCell(41,40,grid,1);
  // setCell(42,40,grid,1);
  // setCell(42,39,grid,1);
  // setCell(41,38,grid,1);
  randomInit(grid)
  // console.log(grid)

}
function mousePressed() {
  if (running) {
    randomInit(grid);
  }
  else {
    if (mouseX >= 0 && mouseX < maxWinX && mouseY >= 0 && mouseY < maxWinY) {
      let xGrid = Math.floor(mouseX / cellSize)
      let yGrid = Math.floor(mouseY / cellSize)
      console.log(xGrid, yGrid)
      toggleCell(xGrid, yGrid, grid)

    }
  }
}
function setColors() {
  if (invert === true) {
    color1 = colorPalettes[colorIndex].c2;
    color2 = colorPalettes[colorIndex].c1;
  }
  else {
    color1 = colorPalettes[colorIndex].c1;
    color2 = colorPalettes[colorIndex].c2;
  }
  color3 = colorPalettes[colorIndex].c3;
}
function keyPressed() {
  if (keyCode === 32) {
    running = !running;
  }
  if (keyCode === 67) { // c
    running = false;
    for (let i = 0; i < cellsX * cellsY; i++) {
      grid[i] = 0;
      tmpGrid[i] = 0;
    }
  }
  if (keyCode === 82) {
    // running = true
    randomInit(grid)
  }
  // I: Invert
  if (keyCode === 73) {
    invert = !invert;
    setColors();
  }
  // P: change color palette
  if (keyCode === 80) {
    colorIndex = (colorIndex + 1) % colorPalettes.length;
    setColors();
  }
}
function draw() {
  // console.log(grid)

  // background(color('#204051'));
  background(color1);
  noStroke();

  drawGrid(grid);
  if (running) {
    doStep();
  }

  // if  (steps < 4) {
  //   // grid = doStep(grid,tmpGrid);

  //   steps++;
  // }
}
function doStep() {//grid, tmpGrid) {
  let activeCells = 0;
  //newGrid = new Array(cellsX * cellsY).fill(0); 
  for (let y = 0; y < cellsY; y++) {
    for (let x = 0; x < cellsX; x++) {
      // compute Neighbors
      // console.log(x,y)
      let currCell = getCell(x, y, grid)
      let sumN = 0;
      for (let dx = -1; dx < 2; dx++) {
        for (let dy = -1; dy < 2; dy++) {
          if (dy == 0 && dx == 0) {
            continue;
          }
          sumN += getCell(x + dx, y + dy, grid);
          // console.log(sumN)


        }
      }
      if (currCell == 1 && (sumN == 2 || sumN == 3)) {
        setCell(x, y, tmpGrid, 1);
        activeCells++;
        // console.log('BORN')
      }
      else if (currCell == 0 && sumN == 3) {
        setCell(x, y, tmpGrid, 1);
        activeCells++;
      }
      else {
        setCell(x, y, tmpGrid, 0);
      }
    }
  }
  // console.log(activeCells);
  // grid = tmpGrid;
  let temp = grid;
  grid = tmpGrid;
  tmpGrid = temp;
  return grid;
}
//diying

function drawGrid(grid) {
  for (let y = 0; y < cellsY; y++) {
    for (let x = 0; x < cellsX; x++) {
      if (getCell(x, y, grid) == 1) {
        fill(color2);
        rect(x * cellSize + 1, y * cellSize + 1, cellSize - 2, cellSize - 2);
      } else if (getCell(x, y, tmpGrid) == 1) {
        fill(color3);
        // fill(color('#511845'));
        rect(x * cellSize + 1, y * cellSize + 1, cellSize - 2, cellSize - 2);
      }
    }
  }
}
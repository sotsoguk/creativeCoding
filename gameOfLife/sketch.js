let cellsX = 200, cellsY = 150, cellSize = 7
let grid, tmpGrid
let steps = 1;

function getCell(x,y, grid) {
  return grid[mod(x,cellsX)+mod(y,cellsY)*cellsX];
}

function setCell(x,y, grid, value) {
  grid[mod(x,cellsX)+mod(y,cellsY)*cellsX] = value
}
function mod(n, m) {
  return ((n % m) + m) % m;
}
function randomInit(_grid) {
  for (let y = 0;y<cellsY; y++) {
    for (let x = 0;x<cellsX;x++){
      if (Math.random() >0.8) {
        setCell(x,y,_grid,1)
      }
    }
  }
}
function setup() {
  createCanvas(cellsX * cellSize, cellsY*cellSize);
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

function draw() {
  // console.log(grid)
  
  background(color('#204051'));
  noStroke();
  
  drawGrid(grid);
  doStep();
  // if  (steps < 4) {
  //   // grid = doStep(grid,tmpGrid);
    
  //   steps++;
  // }
}
function doStep(){//grid, tmpGrid) {
  let activeCells = 0;
  //newGrid = new Array(cellsX * cellsY).fill(0); 
  for (let y = 0; y < cellsY;y++) {
    for (let x = 0;x < cellsX;x++) {
      // compute Neighbors
      // console.log(x,y)
      let currCell = getCell(x,y,grid)
      let sumN = 0;
      for (let dx = -1; dx < 2;dx++){
        for (let dy = -1; dy < 2;dy++){
          if (dy == 0 && dx == 0) {
            continue;
          }
          sumN += getCell(x+dx,y+dy,grid);
          // console.log(sumN)
          
          
        }
      }
      if (currCell == 1 && (sumN == 2 || sumN == 3)){
        setCell(x,y,tmpGrid,1);
        activeCells++;
        // console.log('BORN')
      } 
      else if (currCell == 0 && sumN == 3) {
        setCell(x,y,tmpGrid,1);
        activeCells++;
      }
      else {
        setCell(x,y,tmpGrid,0);
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
  for (let y = 0; y < cellsY;y++) {
    for (let x = 0;x < cellsX;x++) {
      if ( getCell(x,y,grid) == 1) {
        fill(color('#cae8d5'));
        rect(x*cellSize+1,y*cellSize+1,cellSize-2,cellSize-2);
      } else if (getCell(x,y,tmpGrid) == 1){
        fill(color('#3b6978'));
        // fill(color('#511845'));
        rect(x*cellSize+1,y*cellSize+1,cellSize-2,cellSize-2);
      }
    }
  }
}
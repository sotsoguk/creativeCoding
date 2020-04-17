let cellsX = 100, cellsY = 80, cellSize = 7
let maxWinX = cellsX * cellSize
let maxWinY = cellsY * cellSize
let grid, tmpGrid
let steps = 1;
let running = true;
let colorPalettes;
let invert = false;
let colorIndex = 1;
let color1, color2, color3;
// let toLoad = "023000004000160000000000001B0000000008E00000000000001C0000000044000000000000013000000003800000000000000A400000000000000000000000270000000000000000000000007000200000000000000000000E0005000000000000000000008000900000000000000000000000060000003000000050000000002000000480000008800000000000000044080210884000000000000010814040B43C00000070000001F01404021100000008000000040080420100001C00880000000400024C109802200840200000400008030F8022004006300004000000D0B04220038073000000000002510A1C000000300070000000C038A00004000400000004000603840000600000300000A000006000000B10500180000A0000004000033E0900500000400000CA000043300006000000000010A00000411400000000000000040000863B403000180C00000000000863C805000181200000000000100E004000001000000000000012000500000000000080C00002200034000012000008140000140000A00001800000808002008000090200040000000000500000006050384E0000000005001000000502208000000000200280000020110000000000000028000000008000001800000001000000000700000280003000000000000010000020000500301800E000002000010000200482400000000380000000000030180208000004000000000000000020800002200000000000010002080004110000000000002800000001C8700000000000428000E038008000000000000410000000000C000000000000400000000000A000000000000000000000000A0001000000070000000000004000C8000000000000380000000019C000200000000000000000019800060000000C04000000000F0000A00C0000E8C00000000060000C012000014000000000040000071402005940000000000000001086300534000200000000000700E00002980070000000000000088000E5A00980000000000001E00004C201980000000000001C0003860031C00000000000010060383000180000000000000E44000100020000000000000076C00000030000000000000000C800000028000000000000000E000000038C000000000000008800000739000000000000000AB00000528BC000009800000060800A06107600001D00000001B000B80003E00000600000000603338000000000020000000001EB7000200000006C00000000191E000C00000002400000002500000061700000340000001280000003E500000120000002040200001C1000001E200000108018000080000000AC8000000805800000000000070800000201D00000000000002080000C0020000000000000"
let toLoad;

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
  let params = new URLSearchParams(location.search);
  let dd = params.get('data');
  console.log(dd);
  toLoad = dd;

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
  if (toLoad.length >0) {
    loadData(toLoad,grid)
  }
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
  else {
    randomInit(grid)
  } 

  // console.log(grid)
  console.log("V0.0.1")

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
function touchStarted() {
  running = ! running;
}
function loadData(data, _grid){
  let result = hexToBinary(data);
  let binaryString = result['result'];
  for (let i=0;i<binaryString.length;i++){
    grid[i] = parseInt(binaryString.charAt(i))
  }
  for (let i=0;i<cellsX * cellsY;i++){
    tmpGrid[i] = 0;
  }
  running = false;
}

function saveData(grid) {
  // convert array to string
  let gridString = grid.toString().replace(/,/g,"")
  let conv = binaryToHex(gridString)
  console.log(conv['result'])
  // TODO : check for valid

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
  // S:Save
  if (keyCode === 83) {
    saveData(grid);
  }
  // L. Load
  if (keyCode === 76) {
    // loadData("87912000009CC004",grid);
    loadData(toLoad,grid)
    console.log("After load")
    console.log(grid)
    running = false;
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


// Taken from SO: https://stackoverflow.com/questions/17204912/javascript-need-functions-to-convert-a-string-containing-binary-to-hex-then-co

// converts binary string to a hexadecimal string
// returns an object with key 'valid' to a boolean value, indicating
// if the string is a valid binary string.
// If 'valid' is true, the converted hex string can be obtained by
// the 'result' key of the returned object
function binaryToHex(s) {
  var i, k, part, accum, ret = '';
  for (i = s.length-1; i >= 3; i -= 4) {
      // extract out in substrings of 4 and convert to hex
      part = s.substr(i+1-4, 4);
      accum = 0;
      for (k = 0; k < 4; k += 1) {
          if (part[k] !== '0' && part[k] !== '1') {
              // invalid character
              return { valid: false };
          }
          // compute the length 4 substring
          accum = accum * 2 + parseInt(part[k], 10);
      }
      if (accum >= 10) {
          // 'A' to 'F'
          ret = String.fromCharCode(accum - 10 + 'A'.charCodeAt(0)) + ret;
      } else {
          // '0' to '9'
          ret = String(accum) + ret;
      }
  }
  // remaining characters, i = 0, 1, or 2
  if (i >= 0) {
      accum = 0;
      // convert from front
      for (k = 0; k <= i; k += 1) {
          if (s[k] !== '0' && s[k] !== '1') {
              return { valid: false };
          }
          accum = accum * 2 + parseInt(s[k], 10);
      }
      // 3 bits, value cannot exceed 2^3 - 1 = 7, just convert
      ret = String(accum) + ret;
  }
  return { valid: true, result: ret };
}

// converts hexadecimal string to a binary string
// returns an object with key 'valid' to a boolean value, indicating
// if the string is a valid hexadecimal string.
// If 'valid' is true, the converted binary string can be obtained by
// the 'result' key of the returned object
function hexToBinary(s) {
  var i, k, part, ret = '';
  // lookup table for easier conversion. '0' characters are padded for '1' to '7'
  var lookupTable = {
      '0': '0000', '1': '0001', '2': '0010', '3': '0011', '4': '0100',
      '5': '0101', '6': '0110', '7': '0111', '8': '1000', '9': '1001',
      'a': '1010', 'b': '1011', 'c': '1100', 'd': '1101',
      'e': '1110', 'f': '1111',
      'A': '1010', 'B': '1011', 'C': '1100', 'D': '1101',
      'E': '1110', 'F': '1111'
  };
  for (i = 0; i < s.length; i += 1) {
      if (lookupTable.hasOwnProperty(s[i])) {
          ret += lookupTable[s[i]];
      } else {
          return { valid: false };
      }
  }
  return { valid: true, result: ret };
}
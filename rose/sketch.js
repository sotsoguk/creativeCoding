let nSlider, dSlider, fillCheckbox, ctx;
let rainbow = true;
let saveButton;
let n = 4;
let d = 1;
let col;
let bcol;
let r = 500;
let w = 2;
let alpha = 100;
let offset = 0;
let xOffset = 0;
let yOffset = 0;
let angleDelta = 0.01;
let stepDelta = 20;
let anim = false;
let speed = 0.01;

let limit = 0;
function setup() {
  // put setup code here
  ctx = createCanvas(1200, 1200);
  background(0);
  fill(0);
  text("n = ",0,height+100);
  nSlider = createSlider(1, 50, n);
  nSlider.position(20, height + 20);
  nSlider.changed(redraw);
  colorPick = createColorPicker(color('white'));
   colorPick.position(160,height+10);
  // colorPick.changed(redraw);
  colorPick.changed(redraw);
  bcolorPick = createColorPicker(color('black'));
  bcolorPick.position(210,height+10);
  bcolorPick.changed(redraw);
  dSlider = createSlider(1, 50, d);
  dSlider.position(20, height + 50);
  dSlider.changed(redraw);
  wSlider = createSlider(1,20,w);
  wSlider.position(20,height + 80);
  wSlider.changed(redraw);
  rSlider = createSlider(50,height,r);
  rSlider.position(20,height + 130);
  rSlider.changed(redraw);
  xSlider = createSlider(-width/2,width/2,xOffset);
  xSlider.position(20,height + 150);
  xSlider.changed(redraw);
  ySlider = createSlider(-height/2,height/2,yOffset);
  ySlider.position(20,height + 170);
  ySlider.changed(redraw);
  alphaSlider = createSlider(1,100,alpha);
  alphaSlider.position(20, height + 110);
  alphaSlider.changed(redraw);
  saveButton = createButton('save');
  saveButton.position(280, height + 20);
  saveButton.mousePressed(saveImage);
  rainbowCheckbox = createCheckbox('rainbow', true);
  rainbowCheckbox.changed(redraw);
  animCheckbox = createCheckbox('animate', false);
  animCheckbox.position(350,height+10);
  animCheckbox.changed(animate);
  speedSlider = createSlider(1,100,10);
  speedSlider.position(350,height+30);
  speedSlider.changed(redraw);


}

function animate(){
  anim = animCheckbox.checked();
  if (anim)
    limit = 0;
  redraw();
}
function draw() {
  // put drawing code here
  //loop();
  speed = speedSlider.value() / 1000;
  if (anim){
    loop();
    drawRose(limit);
  // console.log("Total:" + totalSteps);
  // console.log("Done:" + steps);
  //offset +=.005;
  //noLoop();
    limit += speed;
    if (limit > TWO_PI)
      limit = 0.0;
  // console.log(limit);
  }
  else{
    drawRose();
    noLoop();
  }
  //console.log(limit);
}

function saveImage() {
  save('rose.png');
}


function drawRose(lim)
{
  d = dSlider.value();
  n = nSlider.value();
  w = wSlider.value();
  r = rSlider.value();
  xOffset = xSlider.value();
  yOffset = ySlider.value();
  col = colorPick.color();
  bcol = bcolorPick.color();
  alpha = alphaSlider.value();
  rainbow = rainbowCheckbox.checked();
  col.setAlpha(alpha*2.55);
  // console.log(fillStyle);
  background(bcol);
  // fill(255);
  noStroke();
  fill(255);
  text("k=" + n + "/" + d, 20, height - 30);
  colorMode(HSB);
  angle = 0;
  let k = n / d;
  //fill(181,100);
  // noFill();
  //stroke(199,200);
  stroke(0, 100, 100, 0.5);
  strokeWeight(w);
  translate(width / 2, height / 2);
  //rotate(offset);
  let steps = 0;
  let totalSteps = ceil(2 * PI * d / angleDelta);
  let upTo;
  if (anim)
    upTo = (d * lim + angleDelta);
  else
    upTo = (d * PI * 2 + angleDelta);
  
  // beginShape();
  //while (angle <= (d * PI * 2 + angleDelta)) {
    //while (angle <= (d * lim + angleDelta)) {
  while (angle <= upTo){
    if (steps % stepDelta === 0) {
      if (rainbow){
        stroke(floor(steps * 360 / totalSteps), 100, 100, alpha / 100);
        //fill(floor(steps * 360 / totalSteps), 100, 100, alpha / 100);
      }
      else{
        
        stroke(col);
      }
      //  if (!fillStyle == true){
      //fill( steps*360/totalSteps,100,100,1);
      // }
      // else
      noFill();
      beginShape();
      if (steps != 0)
        vertex(cos(k * (angle - angleDelta)) * cos((angle - angleDelta)) * r +xOffset,
          cos(k * (angle - angleDelta)) * sin((angle - angleDelta)) * r +yOffset);
    }
    let x = cos(k * angle) * cos(angle) * r+xOffset;
    let y = cos(k * angle) * sin(angle) * r+yOffset;
    vertex(x, y);
    if (steps % stepDelta == (stepDelta-1)) {
      endShape();
    }
    angle += angleDelta;
    steps++;
  }
  endShape();
}
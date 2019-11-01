let total = 256;
let fac = 1;
let w = 1200;
let r = w*(0.5-0.1);
let nn = 0.3;
let anim = true;

function getLocation(total, i,nn){
    let phi = map((i+noise(nn))%total,0,total,0,TWO_PI);
    v = p5.Vector.fromAngle(phi+PI);
    v.setMag(r);
    return v;
}

function setup() {
  // put setup code here
  createCanvas(w, w);
}

function draw() {
  // put drawing code here
  background(0);
  noStroke();
  fill(188,200);
  let tt = "m = "+fac.toFixed(2);
  textSize(16);
  text(tt,20,w - 50);
  translate(width/2, height/2);
  noFill();
  stroke(150);
  ellipse(0,0,2*r);
  nn = 0;
  // colorMode(HSB);
  for (let i=0;i<total;++i){
    
    a = getLocation(total,i,nn);
    nn +=0.01;
    b = getLocation(total, i*fac,nn);
    let alpha = map(dist(a.x,a.y,b.x,b.y),0,2*r,250,90);
    
    // stroke(alpha,100,100);
    stroke(alpha,200);
    line(a.x,a.y,b.x,b.y);
  }
  if (anim){
    // total += 1;
    fac += 0.001;
    if (fac >= total)
      fac = -total;
  }

  if (mouseIsPressed){
    if (mouseButton === LEFT)
      anim = !anim;
    if (mouseButton === RIGHT)
      fac = 0;
  }
  
}
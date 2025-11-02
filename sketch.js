let width = 500;
let height = 1000;
let fringecolor = [0, 0, 0];
let backgroundcolor = [50, 50, 50];

let mx = 0;
let my = 0;

let serverCount = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);

  readData("testcount", v => serverCount = v);
}

function draw() {
  startCanvas();

  fill(255, 100);
  noStroke();
  text(serverCount, 10, 20);

  ellipse(mx, my, 50);

  endCanvas();
}

function mousePressed() {
  writeData("testcount", serverCount + 1);
}
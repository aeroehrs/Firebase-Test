let width = 500;
let height = 1000;
let fringecolor = [0, 0, 0];
let backgroundcolor = [50, 50, 50];

let mx = 0;
let my = 0;

let countL = 0;
let countR = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);

  readData("countL", v => countL = v);
  readData("countR", v => countR = v);

}

function draw() {
  startCanvas();

  fill(255);
  noStroke();
  rect(0, 0, 250, 750);
  rect(250, 750, 250, 250);

  textAlign(CENTER, CENTER);
  textSize(80);
  fill(50);
  text(countL, 125, 375);
  fill(255);
  text(countR, 375, 375);

  endCanvas();
}

function mousePressed() {
  if ((mx > 0) && (mx < width) && (my > 0) && (my < height)) {
    if (mx < 250) {
      if (my < 750) {
        writeData("countL", countL + 1);
      } else {
        writeData("countL", 0);
      }
    } else {
      if (my < 750) {
        writeData("countR", countR + 1);
      } else {
        writeData("countR", 0);
      }
    }
  }
}
let width = 500;
let height = 500;
let WORLD_SCALE = 2;
let fringecolor = [0, 0, 0];
let backgroundcolor = [50, 50, 50];

let PLAYER_SAT = 40;
let PLAYER_BRI = 95;

let mx = 0;
let my = 0;

let myID;
let myX, myY;
let myColor;
let players = {};

let PLAYER_DIAMETER = 40;
let PLAYER_RADIUS = PLAYER_DIAMETER / 2;
let WALL_THICKNESS = 4;

let cameraX = 0;
let cameraY = 0;
let cameraSmoothness = 0.1;

let MINIMAP_SIZE = 100;
let MINIMAP_PADDING = 20; // distance from screen edge
let MINIMAP_DOT_SIZE = 6;

function setup() {
  createCanvas(windowWidth, windowHeight);

  colorMode(HSB);
  myID = "player_" + floor(random(1000000));

  let spawnMargin = PLAYER_RADIUS + WALL_THICKNESS / 2;
  myX = random(spawnMargin, width * WORLD_SCALE - spawnMargin);
  myY = random(spawnMargin, height * WORLD_SCALE - spawnMargin);

  cameraX = myX;
  cameraY = myY;

  let h = random(360); // 0-360
  myColor = [h, PLAYER_SAT, PLAYER_BRI];

  writeData("players/" + myID, {
    x: myX,
    y: myY,
    color: myColor
  });

  firebase.database().ref("players/" + myID).onDisconnect().remove();

  readData("players", data => {
    if (data) players = data;
  });
}

function draw() {
  startCanvas();

  push();

  cameraX = lerp(cameraX, myX, cameraSmoothness);
  cameraY = lerp(cameraY, myY, cameraSmoothness);
  translate(width / 2 - cameraX, height / 2 - cameraY);

  noFill();
  stroke(255);
  strokeWeight(WALL_THICKNESS);
  rect(0, 0, width * WORLD_SCALE, height * WORLD_SCALE);

  let speed = 4;
  let vx = 0;
  let vy = 0;
  if (keyIsDown(87)) vy -= 1; // W
  if (keyIsDown(83)) vy += 1; // S
  if (keyIsDown(65)) vx -= 1; // A
  if (keyIsDown(68)) vx += 1; // D
  if (vx !== 0 || vy !== 0) {
    let mag = sqrt(vx * vx + vy * vy);
    vx = (vx / mag) * speed;
    vy = (vy / mag) * speed;
  }
  myX += vx;
  myY += vy;

  let margin = PLAYER_RADIUS + WALL_THICKNESS / 2;
  myX = constrain(myX, margin, width * WORLD_SCALE - margin);
  myY = constrain(myY, margin, height * WORLD_SCALE - margin);

  writeData("players/" + myID + "/x", myX);
  writeData("players/" + myID + "/y", myY);

  for (let id in players) {
    if (id === myID) continue;

    let p = players[id];
    if (!p) continue;
    fill(p.color[0], p.color[1], p.color[2]);
    noStroke();
    ellipse(p.x, p.y, PLAYER_DIAMETER);
  }

  fill(myColor[0], myColor[1], myColor[2]);
  noStroke();
  ellipse(myX, myY, PLAYER_DIAMETER);

  pop();

  let mapX = width - MINIMAP_SIZE - MINIMAP_PADDING;
  let mapY = height - MINIMAP_SIZE - MINIMAP_PADDING;
  
  push();

  fill(0);
  noStroke();
  rect(mapX, mapY, MINIMAP_SIZE, MINIMAP_SIZE);

  // Draw all players as dots
  for (let id in players) {
    let p = players[id];
    if (!p) continue;

    fill(p.color[0], p.color[1], p.color[2]);
    noStroke();

    // Scale world position into minimap space
    let px = mapX + (p.x / (width * WORLD_SCALE)) * MINIMAP_SIZE;
    let py = mapY + (p.y / (height * WORLD_SCALE)) * MINIMAP_SIZE;

    ellipse(px, py, MINIMAP_DOT_SIZE);
  }

  pop();


  endCanvas();
}
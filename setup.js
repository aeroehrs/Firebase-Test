const firebaseConfig = {
  apiKey: "AIzaSyCDpfq91fHOY-xSJ_KcTCgh-AHmRrQDZKw",
  authDomain: "roadkill-group-demo.firebaseapp.com",
  databaseURL: "https://roadkill-group-demo-default-rtdb.firebaseio.com",
  projectId: "roadkill-group-demo",
  storageBucket: "roadkill-group-demo.firebasestorage.app",
  messagingSenderId: "5914900639",
  appId: "1:5914900639:web:be55b09067ee3f6f370aaa"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

function writeData(path, value) {
  db.ref(path).set(value);
}

function readData(path, callback, defaultValue = 0) {
  db.ref(path).on("value", s => {
    const v = s.val();
    callback(v ?? defaultValue);
  });
}

function startCanvas() {
  resizeCanvas(windowWidth, windowHeight);
  background(fringecolor[0], fringecolor[1], fringecolor[2]);

  if (windowWidth / windowHeight > width / height) {
    let sf = windowHeight / height;
    translate((windowWidth - width * sf) / 2, 0);
    scale(sf);

    mx = (mouseX - (windowWidth - width * sf) / 2) / sf;
    my = mouseY / sf;
  } else {
    let sf = windowWidth / width;
    translate(0, (windowHeight - height * sf) / 2);
    scale(sf);

    mx = mouseX / sf;
    my = (mouseY - (windowHeight - height * sf) / 2) / sf;
  }

  //fill(backgroundcolor[0], backgroundcolor[1], backgroundcolor[2]);
  fill(myColor[0], PLAYER_SAT, 8);
  noStroke();
  rect(0, 0, width, height);
}

function endCanvas() {
  fill(fringecolor[0], fringecolor[1], fringecolor[2]);
  noStroke();
  if (windowWidth / windowHeight > width / height) {
    let sf = windowHeight / height;
    rect(-(windowWidth - width * sf) / sf, 0, (windowWidth - width * sf) / sf, height);
    rect(width, 0, (windowWidth - width * sf) / sf, height);
  } else {
    let sf = windowWidth / width;
    rect(0, -(windowHeight - height * sf) / sf, width, (windowHeight - height * sf) / sf);
    rect(0, height, width, (windowHeight - height * sf) / sf);
  }
}
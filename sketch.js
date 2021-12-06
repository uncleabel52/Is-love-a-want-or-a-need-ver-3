let bg;
let deFont, alfFont, beginFont;
let pWW, pWH;
let txtHeight, txtSize;
let tColorBase, tColorA, tColorB;

let receiver = "Bonnie",
  sender = "Jonathan";
let sceneIndex = 0;

function preload() {
  bg = loadImage("assets/background0.jpg");
  deFont = loadFont("assets/rough_typewriter.otf");
  altFont = loadFont("assets/rough_typewriter-bld-itl.otf");
  beginFont = loadFont("assets/rough_typewriter-itl.otf");
  stampImg = loadImage("assets/stamp.jpg");
}
function reStyle() {
  pWW = windowWidth;
  pWH = windowHeight;
  txtSize = min(width / 35, height / 30);
  textSize(txtSize);
  textFont(deFont);
  txtHeight = textAscent() + textDescent();
  fill(tColorBase);

  // textLeading(height / 14);
}
function setup() {
  createCanvas(windowWidth, windowHeight);

  //color design
  // bg = color(245, 241, 239);
  tColorBase = color(0);
  tColorA = color(242, 41, 27);
  tColorB = color(181, 45, 196);
  reStyle();

  envelopeTimer = new countdown();
  input_to = createInput();
  input_from = createInput();

  openingSetup();
  endingSetup();
}

function draw() {
  changeCanvas(pWW, pWH);
  reStyle();

  sceneControl(sceneIndex);
}

function mouseClicked() {
  if (sceneIndex == 0) stampCheck();
  else if (sceneIndex == 1) {
    openingClicked();
  } else if (sceneIndex == 2) {
    secondSceneClicked();
  } else if (sceneIndex == 3) {
    thirdSceneClicked();
  } else if (sceneIndex == 4) {
    finalSceneClicked();
  } else if (sceneIndex == 5) {
    endingClicked();
  }
}

function sceneControl(index) {
  if (index == 0) {
    envelopeScene();
  } else if (index == 1) {
    envelopeSceneEnd();
    openingScene();
  } else if (index == 2) {
    secondScene();
  } else if (index == 3) {
    thirdScene();
  } else if (index == 4) {
    finalScene();
  } else if (index == 5) {
    endingScene();
  }
}

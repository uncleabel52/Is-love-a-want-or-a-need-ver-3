let input_to, input_from;
let stampImg,
  stampBox,
  stampBoo = false;
let envelopeTimer;
let envelopeEndTime = 2;
let stampFadeIn = 0;

function envelopeScene() {
  push();
  redBlueEnvelopeBg(width / 60);
  textFont(beginFont);

  //To (reciever) dom setting
  input_to.style("width", "30%");
  input_to.style("font-size", `${height / 13}px`);
  // input_to.style('font-family', 'assets/rough_typewriter.otf');
  input_to.position(width / 3, height * 0.3);
  textAlign(RIGHT, TOP);
  textSize(height / 13);
  text("To ", width / 3, height * 0.3);

  input_from.style("width", "20%");
  input_from.style("font-size", `${height / 17}px`);
  input_from.position((width * 3) / 5, (height * 2) / 3);
  textSize(height / 17);
  text("From ", (width * 3) / 5, (height * 2) / 3);

  noFill();
  stroke(0);
  strokeWeight(width / 800);

  stampBox = new clickBox(
    width * (10 / 12 + 1 / 100) - width / 60,
    height * (0 + 1 / 80) + width / 60,
    width * (2 / 12 - 2 / 100),
    ((width * (2 / 12 - 2 / 100)) / stampImg.width) * stampImg.height
  );
  rect(stampBox.x, stampBox.y, stampBox.w, stampBox.h);
  if (stampBox.clickCheck()) {
    textAlign(LEFT, TOP);
    textFont(deFont);
    textSize(width / 45);
    text(
      "Click to stamp",
      width * (10 / 12 + 1 / 100) - width / 60 + width / 100,
      height * (0 + 1 / 80) + width / 60 + width / 100,
      width * (2 / 12 - 2 / 100) - width / 50
    );
  }

  if (envelopeTimer.run) {
    stampFadeIn = fadeIn(stampFadeIn, 0.04);
    image(stampImg, stampBox.x, stampBox.y, stampBox.w, stampBox.h);
  }
  pop();

  if (envelopeTimer.timesup()) sceneIndex = 1;
}

function stampCheck() {
  if (stampBox.clickCheck()) {
    envelopeTimer.timer(2);
    envelopeTimer.play();
  }
}

let envelopeSceneEnd_oneOff = true;

function envelopeSceneEnd() {
  if (envelopeSceneEnd_oneOff) {
    input_to.hide();
    input_from.hide();
    let tempRegex = /\S/;
    if (tempRegex.test(input_to.value())) receiver = input_to.value();
    if (tempRegex.test(input_from.value())) sender = input_from.value();
    envelopeSceneEnd_oneOff = false;
  }
}

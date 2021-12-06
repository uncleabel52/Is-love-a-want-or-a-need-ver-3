function niceBackground(bgImg) {
  this.imgSiz = width;
  if (height > width) this.imgSiz = height;
  image(bgImg, 0, 0, this.imgSiz, this.imgSiz);
}

//shuffle an array
function shuffleArr(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

//slider to generate different pattern of sentence
function sliderGrammar(str, downLimit, upLimit, sliderValue) {
  let spacePun = [".", ",", ";", ":", "?", "!"];
  this.splitedStr = split(str, " ");
  let result = [];
  for (let i = 0; i < this.splitedStr.length; i++) {
    if (this.splitedStr[i] == "((") {
      let tempBoo = true;
      for (let j = i + 1; j < this.splitedStr.length && tempBoo; j++) {
        if (this.splitedStr[j].includes("))")) {
          tempBoo = false;
          let subStr = [];
          for (let k = i + 1; k < j; k++) {
            subStr.push(this.splitedStr[k]);
          }

          i = j;
          let sliderSub = split(join(subStr, " "), " | ");
          let choiceIndex = floor(
            map(
              sliderValue,
              downLimit,
              upLimit,
              0,
              sliderSub.length - 0.000000001
            )
          );
          if (sliderSub[choiceIndex] != "") result.push(sliderSub[choiceIndex]);
        }
      }
    } else if (this.splitedStr[i] != "))" && this.splitedStr[i] != "|") {
      result.push(this.splitedStr[i]);
    }
  }
  result = join(result, " ");
  spacePun.forEach((a) => (result = result.replaceAll(" " + a, a)));
  return result;
}

//change canvas as window, input previous window size
function changeCanvas(pWindowWidth, pWindowHeight) {
  if (pWindowWidth != windowWidth || pWindowHeight != windowHeight)
    createCanvas(windowWidth, windowHeight);
}

function changeWindow(pWindowWidth, pWindowHeight) {
  let result = false;
  if (pWindowWidth != windowWidth || pWindowHeight != windowHeight)
    result = true;
  return result;
}

function fadeIn(fadeInIndex, rate) {
  tint(255, fadeInIndex);
  return lerp(fadeInIndex, 255, rate);
}

//draw envelop frame
function redBlueEnvelopeBg(bolder) {
  push();
  background(245);
  noStroke();

  this.total = ((width + height) * 10) / width;
  for (let i = 0; i < this.total; i++) {
    if (i % 2 == 0) fill("#da016a");
    else fill("#2d8dcd");
    beginShape();
    vertex(((i + 0.3) * width) / 10, 0);
    vertex(((i + 0.3) * width) / 10 - height, height);
    vertex(((i + 0.7) * width) / 10 - height, height);
    vertex(((i + 0.7) * width) / 10, 0);
    endShape(CLOSE);
  }
  fill(245);
  rect(bolder, bolder, width - bolder * 2, height - bolder * 2);
  pop();
}

//timer(), play(): once, timesup(): draw
class countdown {
  constructor() {
    this.run = false;
  }
  timer(timer) {
    this.timer = timer * 1000;
  }
  play() {
    this.time = millis();
    this.run = true;
  }
  timesup() {
    let result = false;
    if (this.run) {
      if (this.time + this.timer < millis()) {
        result = true;
      }
    }
    return result;
  }
  refresh() {
    this.run = false;
  }
}

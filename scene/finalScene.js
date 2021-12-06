let finalMarkov;
let finalChoices = [];
let finalTyper;
let finalInstructionTyper;
let finalInstructionTxt =
  "Click to delete unwanted sentence.  Click LK_ HERE _LK to proceed.";
let finalOpenTxt = "You tell me this story.";
let finalSceneIndex = 0;
let finalLimit = 10;
let finalMarkovLine;

function finalSceneClicked() {
  if (finalSceneIndex < finalLimit) {
    let tempStr = `LK_ ${finalMarkovLine[finalSceneIndex]} _LK`;
    finalTyper.append(tempStr);
    finalSceneIndex++;
  } else if (finalSceneIndex == finalLimit) {
    if (finalTyper.clickCheck()) {
      let tempBoo = true;
      for (let i = 0; i < finalMarkovLine.length && tempBoo; i++) {
        if (finalTyper.clickCheckWord() == finalMarkovLine[i]) {
          tempBoo = false;
          finalMarkovLine.splice(i, 1);
        }
      }
      let tempStr = `${finalOpenTxt} LK_ ${join(
        finalMarkovLine,
        " _LK LK_ "
      )} _LK`;
      finalTyper = new textTyper(
        tempStr,
        openingBolder,
        txtHeight * 2,
        width - 2 * openingBolder,
        1.2,
        txtSize,
        deFont
      );
    } else if (finalInstructionTyper.clickCheck()) {
      endingSetup();
      sceneIndex++;
    }
  }
}

function finalSceneSetup() {
  finalMarkov = RiTa.markov(3);
  choiceStorage.forEach((a) => {
    finalChoices.push(word33words(a, finalSceneWordList));
    finalMarkov.addText(word33words(a, finalSceneWordList).sentence);
  });
  finalMarkovLine = finalMarkov.generate(7);
  let unpopularLines = [];
  finalChoices.forEach((a) => {
    let tempSplit = RiTa.sentences(a.sentence);
    tempSplit.forEach((b) => {
      let tempObj = { sentence: b, score: areSimilarArr(b, finalMarkovLine) };
      unpopularLines.push(tempObj);
    });
  });
  unpopularLines.sort(function compareFn(a, b) {
    if (a.score > b.score) return 1;
    if (a.score < b.score) return -1;
    return 0;
  });

  if (unpopularLines.length > 3) {
    for (let i = 0; i < 3; i++)
      finalMarkovLine.push(unpopularLines[i].sentence);
    finalMarkovLine = shuffleArr(finalMarkovLine);
  }

  let tempStr = `${finalOpenTxt}`;

  finalTyper = new textTyper(
    tempStr,
    openingBolder,
    txtHeight * 2,
    width - 2 * openingBolder,
    1.2,
    txtSize,
    deFont
  );

  finalTyper.startTime(40, CHAR);

  textFont(deFont);
  textSize(txtSize / 1.5);
  finalInstructionTyper = new textTyper(
    finalInstructionTxt,
    width / 2 - textWidth(finalInstructionTxt) / 2,
    height - txtHeight * 2,
    textWidth(finalInstructionTxt),
    1.2,
    txtSize / 1.5,
    deFont
  );
  finalInstructionTyper.setStyle(
    txtSize / 1.5,
    tColorBase,
    tColorA,
    tColorB,
    deFont,
    deFont,
    altFont,
    ITALIC
  );
}

function finalScene() {
  niceBackground(bg);
  finalTyper.setFrame(
    openingBolder,
    txtHeight * 2,
    width - 2 * openingBolder,
    1.4,
    txtSize
  );
  if (finalSceneIndex < finalLimit - 1) {
    finalTyper.setStyle(
      txtSize,
      tColorBase,
      tColorBase,
      tColorBase,
      deFont,
      deFont,
      deFont,
      NORMAL
    );
  } else if (finalSceneIndex == finalLimit) {
    finalTyper.setStyle(
      txtSize,
      tColorBase,
      tColorBase,
      tColorB,
      deFont,
      deFont,
      altFont,
      ITALIC
    );
    textFont(deFont);
    textSize(txtSize / 1.5);
    finalInstructionTyper.setFrame(
      width / 2 - textWidth(finalInstructionTxt) / 2,
      height - txtHeight * 2,
      textWidth(finalInstructionTxt),
      1.2,
      txtSize / 1.5,
      deFont
    );

    finalInstructionTyper.display();
  }
  finalTyper.display();
}

function areSimilarArr(txt, txt_) {
  this.score = 0;

  txt_.forEach((a) => {
    let tempScore = areSimilar(txt, a);
    if (tempScore > this.score) this.score = tempScore;
  });
  return this.score;
}

function areSimilar(txt, txt_) {
  this.txt = split(txt, " ");
  this.txt_ = split(txt_, " ");
  this.score = 0;

  for (let i = 0; i < this.txt.length; i++) {
    for (let j = 0; j < this.txt_.length; j++) {
      if (this.txt[i] == this.txt_[j]) {
        let tempBoo = true;
        let k = 0;
        while (k < min(this.txt.length - i, this.txt_.length - j) && tempBoo) {
          if (this.txt[i + k] != this.txt_[j + k]) tempBoo = false;
          else k++;
        }
        if (k > this.score) this.score = k;
      }
    }
  }
  return this.score;
}

function word33words(key, bank) {
  let result = "NULL";

  bank.forEach((a) => {
    if (key == a.word) {
      result = a;
    }
  });

  return result;
}

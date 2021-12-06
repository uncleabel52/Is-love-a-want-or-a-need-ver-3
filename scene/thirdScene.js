let thirdScenePick;
let thirdSceneKeyWords = [];
let twoChoiceLine;
let thirdChoiceCount = 0;
let thirdChoiceLimit = 3;
let choiceStorage = [];

function thirdSceneSetup() {
  let tempSplit = split(thirdScenePick, " ");

  tempSplit.forEach((a) => {
    if (!/^an?$/.test(a) && a != "") {
      choiceStorage.push(a);
      thirdSceneKeyWords.push(word22words(a, thirdSceneWordList));
    }
  });

  let tempSubject =
    thirdSceneKeyWords[0].input + " " + thirdSceneKeyWords[1].input;
  let tempFirst =
    thirdSceneKeyWords[0].output[0] + " " + thirdSceneKeyWords[1].output[0];
  let tempFirstArt = RiTa.evaluate(`(${tempFirst}).art()`);
  let tempSecond =
    thirdSceneKeyWords[0].output[1] + " " + thirdSceneKeyWords[1].output[1];
  let tempSecondArt = RiTa.evaluate(`(${tempSecond}).art()`);

  let tempStr;
  if (random(2) < 1)
    tempStr = `L2B L2B Is ${tempSubject} LK_ ${tempFirstArt} _LK or LK_ ${tempSecondArt} _LK?`;
  else
    tempStr = `L2B L2B Is ${tempSubject} LK_ ${tempSecondArt} _LK or LK_ ${tempFirstArt} _LK?`;
  twoChoiceLine = new textTyper(
    tempStr,
    openingBolder,
    txtHeight * 2,
    width - 2 * openingBolder,
    1.2,
    txtSize,
    deFont
  );

  thirdChoiceCount++;
  twoChoiceLine.startTime(40, CHAR);
}

function thirdSceneClicked() {
  if (thirdChoiceCount < thirdChoiceLimit) {
    if (twoChoiceLine.clickCheck()) {
      thirdScenePick = twoChoiceLine.clickCheckWord();
      let tempSplit = split(thirdScenePick, " ");
      thirdSceneKeyWords = [];

      tempSplit.forEach((a) => {
        if (!/^an?$/.test(a) && a != "") {
          choiceStorage.push(a);
          thirdSceneKeyWords.push(word22words(a, thirdSceneWordList));
        }
      });

      let tempSubject =
        thirdSceneKeyWords[0].input + " " + thirdSceneKeyWords[1].input;
      let tempFirst =
        thirdSceneKeyWords[0].output[0] + " " + thirdSceneKeyWords[1].output[0];
      let tempFirstArt = RiTa.evaluate(`(${tempFirst}).art()`);
      let tempSecond =
        thirdSceneKeyWords[0].output[1] + " " + thirdSceneKeyWords[1].output[1];
      let tempSecondArt = RiTa.evaluate(`(${tempSecond}).art()`);

      let tempStr;
      if (random(2) < 1)
        tempStr = `L2B L2B Is ${tempSubject} LK_ ${tempFirstArt} _LK or LK_ ${tempSecondArt} _LK?`;
      else
        tempStr = `L2B L2B Is ${tempSubject} LK_ ${tempSecondArt} _LK or LK_ ${tempFirstArt} _LK?`;

      twoChoiceLine.delink();
      twoChoiceLine.append(tempStr);
      thirdChoiceCount++;
    }
  } else if (thirdChoiceCount == thirdChoiceLimit) {
    if (twoChoiceLine.clickCheck()) {
      thirdScenePick = twoChoiceLine.clickCheckWord();
      let tempSplit = split(thirdScenePick, " ");
      thirdSceneKeyWords = [];

      tempSplit.forEach((a) => {
        if (!/^an?$/.test(a) && a != "") {
          choiceStorage.push(a);
          thirdSceneKeyWords.push(word22words(a, thirdSceneWordList));
        }
      });

      let tempSubject =
        thirdSceneKeyWords[0].input + " " + thirdSceneKeyWords[1].input;

      let tempStr = `L2B L2B Is ${tempSubject} LK_ love _LK?`;

      twoChoiceLine.delink();
      twoChoiceLine.append(tempStr);

      thirdChoiceCount++;
    }
  } else if (thirdChoiceCount > thirdChoiceLimit) {
    if (twoChoiceLine.clickCheck()) {
      finalSceneSetup();
      sceneIndex++;
    }
  }
}

function thirdScene() {
  niceBackground(bg);
    twoChoiceLine.setFrame(
      openingBolder,
      txtHeight * 2,
      width - 2 * openingBolder,
      1.2,
      txtSize
    );
  twoChoiceLine.setStyle(
    txtSize,
    tColorBase,
    tColorA,
    tColorB,
    deFont,
    deFont,
    altFont,
    ITALIC
  );
  twoChoiceLine.display();
}

function word22words(key, bank) {
  let result = "NULL";

  bank.forEach((a) => {
    if (key == a.input) {
      result = a;
    }
  });

  return result;
}

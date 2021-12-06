let secondSceneIndex = 0;
let certainty = 0;
let responseTimeStandard = 1000;
let responseFactorFast = 0.5,
  responseFactorSlow = 1.5;
let avgResponseTime;
let responseTimer;
let sliderLine;
let sliderWrite;
let secondTxtLine;
let margin = 100;
let intervalFloor = 5,
  intervalCeil = 120;
let quickResponseBoo = true;

function secondSceneClicked() {
  if (secondSceneIndex < 13) {
    secondSceneIndex++;
    responseTime = millis() - responseTimer;
    if (quickResponseBoo) {
      certainty = max(certainty - 0.3, 0);
    } else {
      if (responseTime < responseTimeStandard + margin) {
        certainty += max(
          map(
            responseTime,
            responseTimeStandard * responseFactorFast,
            responseTimeStandard,
            -0.2,
            0
          ),
          -0.4
        );
        certainty = max(certainty, 0);
      } else if (responseTime > responseTimeStandard + margin) {
        certainty += min(
          map(
            responseTime,
            responseTimeStandard,
            responseTimeStandard * responseFactorSlow,
            0,
            0.2
          ),
          0.4
        );
        certainty = min(certainty, 1);
      }
    }

    sliderLine.append(
      "L2B " + sliderGrammar(secondTxtLine[secondSceneIndex], 0, 1, certainty)
    );
    sliderLine.setInterval(map(certainty, 0, 1, intervalFloor, intervalCeil));
    // sliderLine.setInterval(1);

    // console.log(certainty);

    avgResponse =
      (avgResponseTime * (secondSceneIndex - 1) + responseTime) /
      secondSceneIndex;
    responseTimer = millis();
    quickResponseBoo = true;
  } else if (secondSceneIndex == 13) {
    if (sliderLine.clickCheck()) {
      thirdScenePick = sliderLine.clickCheckWord();

      thirdSceneSetup();
      sceneIndex++;
    }
  }
}

function secondSceneSetup(choiceIndex) {
  if (choiceIndex == 0) secondTxtLine = wantLine;
  else if (choiceIndex == 1) secondTxtLine = needLine;

  if (responseTime <= responseTimeStandard) {
    certainty = max(
      map(
        responseTime,
        responseTimeStandard * responseFactorFast,
        responseTimeStandard,
        0,
        0.5
      ),
      0
    );
  } else if (responseTime > responseTimeStandard) {
    certainty = min(
      map(
        responseTime,
        responseTimeStandard,
        responseTimeStandard * responseFactorSlow,
        0.5,
        1
      ),
      1
    );
  }
  sliderLine = new textTyper(
    sliderGrammar(secondTxtLine[secondSceneIndex], 0, 1, certainty),
    openingBolder,
    txtHeight * 2,
    width - 2 * openingBolder,
    1.4,
    txtSize,
    deFont
  );
  sliderLine.startTime(50, CHAR);
  sliderLine.setInterval(map(certainty, 0, 1, intervalFloor, intervalCeil));
  // sliderLine.setInterval(1);

  avgResponseTime = responseTime;
  responseTimer = millis();
}

function secondScene() {
  niceBackground(bg);
    sliderLine.setFrame(
      openingBolder,
      txtHeight * 2,
      width - 2 * openingBolder,
      1.4,
      txtSize
    );
  sliderLine.setStyle(
    txtSize,
    tColorBase,
    tColorA,
    tColorB,
    deFont,
    deFont,
    altFont,
    ITALIC
  );
  let responseChange = sliderLine.display();
  if (responseChange) {
    responseTimer = millis();
    quickResponseBoo = false;
  }
}

let endingTxt =
  "So, is love a want or a need?  Maybe some question just doesn't require an answer.";
let endingTyper;
let endingSign;
let endingTimer;

function endingClicked() {
  if (endingSign.clickCheck()) {
    endingSign = new textTyper(
      `Yours, L2B ${sender}`,
      width - openingBolder * 2,
      height - txtHeight * 6,
      width - 2 * openingBolder,
      1.2,
      txtSize,
      deFont
    );
    endingSign.setStyle(
      txtSize,
      tColorBase,
      color(0, 0),
      tColorB,
      deFont,
      deFont,
      altFont,
      ITALIC
    );
    endingSign.writeLimit = 6;
    endingSign.startTime(80, CHAR);

    endingTimer.timer(2);
    endingTimer.play();
  }
  
}

function endingSetup() {
  endingTyper = new textTyper(
    endingTxt,
    openingBolder,
    txtHeight * 6,
    width - 2 * openingBolder,
    1.2,
    txtSize,
    deFont
  );
  endingTyper.setStyle(
    txtSize,
    tColorBase,
    tColorA,
    tColorB,
    deFont,
    deFont,
    altFont,
    ITALIC
  );

  endingTyper.startTime(80, CHAR);

  endingSign = new textTyper(
    "Yours, L2B LK_ Click to save _LK",
    width - openingBolder * 2,
    height - txtHeight * 6,
    width - 2 * openingBolder,
    1.2,
    txtSize,
    deFont
  );
  endingSign.setStyle(
    txtSize,
    tColorBase,
    color(0, 0),
    tColorB,
    deFont,
    deFont,
    altFont,
    ITALIC
  );

  endingTimer = new countdown();
}

function endingScene() {
  niceBackground(bg);

  endingTyper.setFrame(
    openingBolder,
    txtHeight * 9,
    width - 2 * openingBolder,
    1.2,
    txtSize,
    deFont
  );

  endingSign.setFrame(
    width - openingBolder * 2,
    height - txtHeight * 6,
    width - 2 * openingBolder,
    1.2,
    txtSize,
    deFont
  );
  endingTyper.display();
  endingSign.display();
  
  if (endingTimer.timesup()) {
    let finalLetter = [
      `Dear ${receiver}, \n \n${opening}\n\n"Is love LK_ a want or a need?" \n\n`,
      `${sliderLine.str.replaceAll("L2B ", "")}\n\n`,
      `${twoChoiceLine.str.replaceAll("L2B L2B ", "\n")}\n\n`,
      `${finalTyper.str}\n\n`,
      `${endingTxt}\n\n`,
      `Yours, \n${sender}`,
    ];
    let mon = month();
  if (mon < 10) mon = `0${str(month())}`;
  let dai = day();
  if (dai < 10) dai = `0${str(day())}`;
  save(finalLetter, `LoveLetter_${year()}${mon}${dai}.txt`);
    endingTimer.refresh();
  }
}

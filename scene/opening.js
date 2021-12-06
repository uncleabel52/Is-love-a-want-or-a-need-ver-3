let opening = `Sorry of not writing. I know it's time to make up my mind.  But writing is just a painless suffer in this time.  Should we stay or move on?  I have been thinking of it all day and night.  Everytime, these six words strike back to my veil.  `;

let openingLink = `"Is love LK_ a want _LK or LK_ a need _LK ?"`;

let openingLinkBoo = false;
let openingLinkBox;
let openingBolder;
let openingLinkTimer;
let responseTime;
let firstChoiceIndex = 0;

function openingSetup() {
  openingBolder = width / 6;
  openingLinkBox = new textTyper(
    openingLink,
    openingBolder,
    txtHeight * 12,
    width - 2 * openingBolder,
    1.5,
    txtSize,
    deFont
  );
}

function openingClicked() {
  if (!openingLinkBoo) {
    openingLinkBox.startTime(40, CHAR);
    openingLinkBoo = true;
    openingLinkTimer = millis();
  } else if (openingLinkBoo) {
    if (openingLinkBox.clickCheck()) {
      let openingAnswer = openingLinkBox.clickCheckWord();
      responseTime = millis() - openingLinkTimer;

      if (openingAnswer == "a want") firstChoiceIndex = 0;
      else if (openingAnswer == "a need") firstChoiceIndex = 1;

      sceneIndex = 2;
      
      secondSceneSetup(firstChoiceIndex);
    }
  }
}

function openingScene() {
  niceBackground(bg);

  text(
    `Dear ${receiver},`,
    openingBolder,
    txtHeight * 3,
    width - 2 * openingBolder
  );

  let tempStr = "  ";
  tempStr = tempStr.concat("    ", opening.replaceAll("TW_link_", ""));
  tempStr.replaceAll("_TW_link", "");
  tempStr.replaceAll("_TW_link", "");
  text(tempStr, openingBolder, txtHeight * 6, width - 2 * openingBolder);
  let numOfLine = ceil(textWidth(tempStr) / (width - 2 * openingBolder));
  if (openingLinkBoo) {
    openingLinkBox.setFrame(
      openingBolder,
      txtHeight * (8 + numOfLine),
      width - 2 * openingBolder,
      1.5,
      txtSize
    );
    openingLinkBox.setStyle(
      txtSize,
      tColorBase,
      tColorA,
      tColorB,
      deFont,
      deFont,
      altFont,
      ITALIC
    );

    openingLinkBox.display();
  }
}

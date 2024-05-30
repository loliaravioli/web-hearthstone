// attacks differently according to how many cards are currently in play
function AI() {
  const currentHeroHealth = document.getElementById('playerhero').children[1].innerText,
    opponentCards = document.querySelectorAll('.computer-cardinplay'),
    numOfOpponentCards = opponentBoard.count(),
    alliedCards = document.querySelectorAll('.player-cardinplay'),
    numOfAlliedCards = playerBoard.count();

  if ((numOfOpponentCards == 1) && (numOfAlliedCards == 0)) {
    noAlliedCards();
  } else if ((numOfOpponentCards == 2) && (numOfAlliedCards == 0)) {
    noAlliedCards();
  } else if ((numOfOpponentCards == 3) && (numOfAlliedCards == 0)) {
    noAlliedCards();
  } else if ((numOfOpponentCards == 4) && (numOfAlliedCards == 0)) {
    noAlliedCards();
  } else if ((numOfOpponentCards == 5) && (numOfAlliedCards == 0)) {
    noAlliedCards();
  } else if ((numOfOpponentCards == 6) && (numOfAlliedCards == 0)) {
    noAlliedCards();
  } else if ((numOfOpponentCards == 7) && (numOfAlliedCards == 0)) {
    noAlliedCards();
  } else if ((numOfOpponentCards == 1) && (numOfAlliedCards == 1)) {
    oneAlliedCard();
  } else if ((numOfOpponentCards == 2) && (numOfAlliedCards == 1)) {
    oneAlliedCard();
  } else if ((numOfOpponentCards == 3) && (numOfAlliedCards == 1)) {
    oneAlliedCard();
  } else if ((numOfOpponentCards == 4) && (numOfAlliedCards == 1)) {
    oneAlliedCard();
  } else if ((numOfOpponentCards == 5) && (numOfAlliedCards == 1)) {
    oneAlliedCard();
  } else if ((numOfOpponentCards == 6) && (numOfAlliedCards == 1)) {
    oneAlliedCard();
  } else if ((numOfOpponentCards == 7) && (numOfAlliedCards == 1)) {
    oneAlliedCard();
  } else if ((numOfOpponentCards == 1) && (numOfAlliedCards == 2)) {
    twoAlliedCards();
  } else if ((numOfOpponentCards == 2) && (numOfAlliedCards == 2)) {
    twoAlliedCards();
  } else if ((numOfOpponentCards == 3) && (numOfAlliedCards == 2)) {
    twoAlliedCards();
  } else if ((numOfOpponentCards == 4) && (numOfAlliedCards == 2)) {
    twoAlliedCards();
  } else if ((numOfOpponentCards == 5) && (numOfAlliedCards == 2)) {
    twoAlliedCards();
  } else if ((numOfOpponentCards == 6) && (numOfAlliedCards == 2)) {
    twoAlliedCards();
  } else if ((numOfOpponentCards == 7) && (numOfAlliedCards == 2)) {
    twoAlliedCards();
  } else if ((numOfOpponentCards == 1) && (numOfAlliedCards == 3)) {
    threeAlliedCards();
  } else if ((numOfOpponentCards == 2) && (numOfAlliedCards == 3)) {
    threeAlliedCards();
  } else if ((numOfOpponentCards == 3) && (numOfAlliedCards == 3)) {
    threeAlliedCards();
  } else if ((numOfOpponentCards == 4) && (numOfAlliedCards == 3)) {
    threeAlliedCards();
  } else if ((numOfOpponentCards == 5) && (numOfAlliedCards == 3)) {
    threeAlliedCards();
  } else if ((numOfOpponentCards == 6) && (numOfAlliedCards == 3)) {
    threeAlliedCards();
  } else if ((numOfOpponentCards == 7) && (numOfAlliedCards == 3)) {
    threeAlliedCards();
  } else if ((numOfOpponentCards == 1) && (numOfAlliedCards == 4)) {
    fourAlliedCards();
  } else if ((numOfOpponentCards == 2) && (numOfAlliedCards == 4)) {
    fourAlliedCards();
  } else if ((numOfOpponentCards == 3) && (numOfAlliedCards == 4)) {
    fourAlliedCards();
  } else if ((numOfOpponentCards == 4) && (numOfAlliedCards == 4)) {
    fourAlliedCards();
  } else if ((numOfOpponentCards == 5) && (numOfAlliedCards == 4)) {
    fourAlliedCards();
  } else if ((numOfOpponentCards == 6) && (numOfAlliedCards == 4)) {
    fourAlliedCards();
  } else if ((numOfOpponentCards == 7) && (numOfAlliedCards == 4)) {
    fourAlliedCards();
  } else if ((numOfOpponentCards == 1) && (numOfAlliedCards == 5)) {
    fiveAlliedCards();
  } else if ((numOfOpponentCards == 2) && (numOfAlliedCards == 5)) {
    fiveAlliedCards();
  } else if ((numOfOpponentCards == 3) && (numOfAlliedCards == 5)) {
    fiveAlliedCards();
  } else if ((numOfOpponentCards == 4) && (numOfAlliedCards == 5)) {
    fiveAlliedCards();
  } else if ((numOfOpponentCards == 5) && (numOfAlliedCards == 5)) {
    fiveAlliedCards();
  } else if ((numOfOpponentCards == 6) && (numOfAlliedCards == 5)) {
    fiveAlliedCards();
  } else if ((numOfOpponentCards == 7) && (numOfAlliedCards == 5)) {
    fiveAlliedCards();
  } else if ((numOfOpponentCards == 1) && (numOfAlliedCards == 6)) {
    sixAlliedCards();
  } else if ((numOfOpponentCards == 2) && (numOfAlliedCards == 6)) {
    sixAlliedCards();
  } else if ((numOfOpponentCards == 3) && (numOfAlliedCards == 6)) {
    sixAlliedCards();
  } else if ((numOfOpponentCards == 4) && (numOfAlliedCards == 6)) {
    sixAlliedCards();
  } else if ((numOfOpponentCards == 5) && (numOfAlliedCards == 6)) {
    sixAlliedCards();
  } else if ((numOfOpponentCards == 6) && (numOfAlliedCards == 6)) {
    sixAlliedCards();
  } else if ((numOfOpponentCards == 7) && (numOfAlliedCards == 6)) {
    sixAlliedCards();
  } else if ((numOfOpponentCards == 1) && (numOfAlliedCards == 7)) {
    sevenAlliedCards();
  } else if ((numOfOpponentCards == 2) && (numOfAlliedCards == 7)) {
    sevenAlliedCards();
  } else if ((numOfOpponentCards == 3) && (numOfAlliedCards == 7)) {
    sevenAlliedCards();
  } else if ((numOfOpponentCards == 4) && (numOfAlliedCards == 7)) {
    sevenAlliedCards();
  } else if ((numOfOpponentCards == 5) && (numOfAlliedCards == 7)) {
    sevenAlliedCards();
  } else if ((numOfOpponentCards == 6) && (numOfAlliedCards == 7)) {
    sevenAlliedCards();
  } else if ((numOfOpponentCards == 7) && (numOfAlliedCards == 7)) {
    sevenAlliedCards();
  }

  // checks if the player has lost
  const newHeroHealth = document.getElementById('playerhero').children[1].innerText;
  if (newHeroHealth < currentHeroHealth) {
    checkForLoss()
  }

  if (numOfOpponentCards >= 1) {
    Audio("src/sounds/attack.mp3").play();
  }

  for (let i = 0; i < numOfAlliedCards; i++) {
    setTimeout(function () {
      let cardToCheck = parseInt(alliedCards[i].children[1].children[0].innerText);
      if (cardToCheck <= 0) {
        alliedCards[i].remove();
      }
    }, 250);
  }

  for (let i = 0; i < numOfOpponentCards; i++) {
    setTimeout(function () {
      let cardToCheck = parseInt(opponentCards[i].children[1].children[0].innerText);
      if (cardToCheck <= 0) {
        opponentCards[i].remove();
      }
    }, 250);
  }

  return true
}

/* returns the element with the largest attack on the opponent's side 
where the parameter 'largestValue' determines the value of n 
when nth value is returned*/
function findMaxOpponentAttack(largestValue) {
  const opponentCards = document.querySelectorAll('.computer-cardinplay'),
    numOfOpponentCards = opponentBoard.count(),
    alliedCards = document.querySelectorAll('player-cardinplay'),
    numOfAlliedCards = playerBoard.count();

  let attackValues = [],
    biggestValue = 0;

  for (let i = 0; i < opponentCards.length; i++) {
    attackValues.push(opponentCards[i].children[0].children[0].innerText);
  }

  for (let i = 0; i < attackValues.length; i++) {
    if (opponentCards[i].children[0].children[0].innerText > biggestValue) {
      biggestValue = opponentCards[i].children[0].children[0].innerText;
    }
  }

  for (let i = 0; i < largestValue; i++) {
    let index = attackValues.indexOf(biggestValue);
    attackValues.splice(index, 1);
    biggestValue = 0;
    for (let i = 0; i < attackValues.length; i++) {
      if (opponentCards[i].children[0].children[0].innerText > biggestValue) {
        biggestValue = opponentCards[i].children[0].children[0].innerText;
      }
    }
  }

  for (let i = 0; i < opponentCards.length; i++) {
    if (opponentCards[i].children[0].children[0].innerText == biggestValue) {
      return opponentCards[i]
    }
  }

  return true
}

/* returns the element with the largest attack on the player's side 
where the parameter 'largestValue' determines wheather the 2nd largest value
3rd largest value 4th largest etc. is returned*/
function findMaxPlayerAttack(largestValue) {
  const opponentCards = document.querySelectorAll('.computer-cardinplay'),
    numOfOpponentCards = opponentBoard.count(),
    alliedCards = document.querySelectorAll('.player-cardinplay'),
    numOfAlliedCards = playerBoard.count();

  let attackValues = [],
    biggestValue = 0;

  for (let i = 0; i < alliedCards.length; i++) {
    attackValues.push(alliedCards[i].children[0].children[0].innerText);
  }

  for (let i = 0; i < attackValues.length; i++) {
    if (alliedCards[i].children[0].children[0].innerText > biggestValue) {
      biggestValue = alliedCards[i].children[0].children[0].innerText;
    }
  }

  for (let i = 0; i < largestValue; i++) {
    let index = attackValues.indexOf(biggestValue);
    attackValues.splice(index, 1);
    biggestValue = 0;
    for (let i = 0; i < attackValues.length; i++) {
      if (alliedCards[i].children[0].children[0].innerText > biggestValue) {
        biggestValue = alliedCards[i].children[0].children[0].innerText;
      }
    }
  }

  for (let i = 0; i < alliedCards.length; i++) {
    if (alliedCards[i].children[0].children[0].innerText == biggestValue) {
      return alliedCards[i]
    }
  }

  return true
}

/* returns the element with the largest health on the opponent's side 
where the parameter 'largestValue' determines wheather the 2nd largest value
3rd largest value 4th largest etc. is returned*/
function findMaxOpponentHealth(largestValue) {
  const opponentCards = document.querySelectorAll('.computer-cardinplay'),
    numOfOpponentCards = opponentBoard.count(),
    alliedCards = document.querySelectorAll('player-cardinplay'),
    numOfAlliedCards = playerBoard.count();

  let healthValues = [],
    biggestValue = 0;

  for (let i = 0; i < opponentCards.length; i++) {
    healthValues.push(opponentCards[i].children[1].children[0].innerText);
  }

  for (let i = 0; i < healthValues.length; i++) {
    if (opponentCards[i].children[0].children[0].innerText > biggestValue) {
      biggestValue = opponentCards[i].children[1].children[0].innerText;
    }
  }

  for (let i = 0; i < largestValue; i++) {
    let index = healthValues.indexOf(biggestValue);
    healthValues.splice(index, 1);
    for (let i = 0; i < healthValues.length; i++) {
      if (opponentCards[i].children[0].children[0].innerText > biggestValue) {
        biggestValue = opponentCards[i].children[1].children[0].innerText;
      }
    }
  }

  for (let i = 0; i < opponentCards.length; i++) {
    if (opponentCards[i].children[1].children[0].innerText == biggestValue) {
      return opponentCards[i]
    }
  }

  return true
}

/* returns the element with the largest health on the player's side 
where the parameter 'largestValue' determines wheather the 2nd largest value
3rd largest value 4th largest etc. is returned*/
function findMaxPlayerHealth(largestValue) {
  const opponentCards = document.querySelectorAll('.computer-cardinplay'),
    numOfOpponentCards = opponentBoard.count(),
    alliedCards = document.querySelectorAll('.player-cardinplay'),
    numOfAlliedCards = playerBoard.count();

  let healthValues = [],
    biggestValue = 0;

  for (let i = 0; i < alliedCards.length; i++) {
    healthValues.push(alliedCards[i].children[1].children[0].innerText);
  }

  for (let i = 0; i < healthValues.length; i++) {
    if (alliedCards[i].children[0].children[0].innerText > biggestValue) {
      biggestValue = alliedCards[i].children[1].children[0].innerText;
    }
  }

  for (let i = 0; i < largestValue; i++) {
    let index = attackValues.indexOf(biggestValue);
    attackValues.splice(index, 1);
    for (let i = 0; i < healthValues.length; i++) {
      if (alliedCards[i].children[0].children[0].innerText > biggestValue) {
        biggestValue = alliedCards[i].children[1].children[0].innerText;
      }
    }
  }

  for (let i = 0; i < alliedCards.length; i++) {
    if (alliedCards[i].children[1].children[0].innerText == biggestValue) {
      return alliedCards[i]
    }
  }

  return true
}

function checkForLoss() {
  if (document.getElementById('playerhero').children[1].innerText <= 0) {
    playerHero.style.display = "none";
  }

  if (window.getComputedStyle(playerHero).display === "none") {
    setTimeout(function () {
      alert("You've Lost!")
      location.reload();
    }, 1000);
  }

  return true
}

function getSumOfAttack() {
  const opponentCards = document.querySelectorAll('.computer-cardinplay'),
    numOfOpponentCards = opponentBoard.count();

  let sumOfAttack = 0,
    heroHealth = document.getElementById('playerhero').children[1].innerText;

  for (let i = 0; i < numOfOpponentCards; i++) {
    sumOfAttack += parseInt(opponentCards[i].children[0].children[0].innerText);
  }

  return sumOfAttack
}

function showDamageLabel(currentAttackerAttack) {
  document.querySelector("#playerdamagevalue").innerText = "-" + currentAttackerAttack;
  document.querySelector("#playerdamagecontainer").style.visibility = "visible";
  document.getElementById('playerdamagecontainer').style.opacity = "1";
  document.getElementById('playerdamagecontainer').style.transition = "none";
  document.querySelector("#playerdamagelabel").classList.add("openMenuAnim");
  document.querySelector("#playerdamagevalue").classList.add("openMenuAnim");
  document.querySelector("#playerdamagelabel").classList.remove("fadeOutAnim");
  document.querySelector("#playerdamagevalue").classList.remove("fadeOutAnim");
  setTimeout(function () {
    document.querySelector("#playerdamagelabel").classList.add("fadeOutAnim");
    document.querySelector("#playerdamagevalue").classList.add("fadeOutAnim");
    document.querySelector("#playerdamagelabel").classList.remove("openMenuAnim");
    document.querySelector("#playerdamagevalue").classList.remove("openMenuAnim");
    setTimeout(function () {
      document.getElementById('playerdamagecontainer').style.visibility = "hidden";
      document.getElementById('playerdamagecontainer').style.opacity = "0";
    }, 1000);
  }, 2000);
  return true
}

// AI RELATED
function noAlliedCards() {
  let sumOfAttack = getSumOfAttack();
  document.getElementById('playerhero').children[1].innerText -= sumOfAttack;
  showDamageLabel(sumOfAttack);
}

function oneAlliedCard() {
  const opponentCards = document.querySelectorAll('.computer-cardinplay'),
    alliedCards = document.querySelectorAll('.player-cardinplay'),
    numOfOpponentCards = opponentBoard.count();

  let maxAttack = findMaxOpponentAttack(0),
    healthModifier = 10;

  // attacks hero if the hero is on 12 hp or lower
  // starts at 10 increments by 2 every time +1 opponent card
  if (numOfOpponentCards == 2) {
    healthModifier += 2;
  } else if (numOfOpponentCards == 3) {
    healthModifier += 4;
  } else if (numOfOpponentCards == 4) {
    healthModifier += 6;
  } else if (numOfOpponentCards == 6) {
    healthModifier += 8;
  } else if (numOfOpponentCards == 7) {
    healthModifier += 10;
  }

  if (document.getElementById('playerhero').children[1].innerText <= healthModifier) {
    for (let i = 0; i < numOfOpponentCards; i++) {
      let opponentAttack = parseInt(opponentCards[i].children[0].children[0].innerText),
        heroHealth = document.getElementById('playerhero').children[1].innerText;
      document.getElementById('playerhero').children[1].innerText = heroHealth - opponentAttack;
      showDamageLabel(opponentAttack);
    }
  } else {
    // otherwise attacks the highest attack card on the board and attacks the hero with the other
    let heroHealth = document.getElementById('playerhero').children[1].innerText,
      opponentAttack = parseInt(maxAttack.children[0].children[0].innerText),
      opponentHealth = maxAttack.children[1].children[0].innerText,
      alliedAttack = alliedCards[0].children[0].children[0].innerText,
      alliedHealth = alliedCards[0].children[1].children[0].innerText;

    maxAttack.children[1].children[0].innerText = opponentHealth - alliedAttack;
    if (alliedCards[0].classList.contains("hasDivineShield")) {
      alliedCards[0].classList.remove("hasDivineShield");
      playerBoard.htmlElement.children[0].children[2].classList.add("divineShieldBreak");
      setTimeout(function () {
        playerBoard.htmlElement.children[0].children[2].style.visibility = "hidden";
      }, 400);
    } else {
      alliedCards[0].children[1].children[0].innerText = alliedHealth - opponentAttack;
    }

    let totalAttack = 0;
    for (let i = 0; i < numOfOpponentCards; i++) {
      totalAttack += parseInt(opponentCards[i].children[0].children[0].innerText);
    }

    heroHealth = document.getElementById('playerhero').children[1].innerText;
    totalAttack -= opponentAttack;
    document.getElementById('playerhero').children[1].innerText = heroHealth - totalAttack;
    if (numOfOpponentCards >= 2) {
      showDamageLabel(totalAttack);
    }
    setTimeout(function () {
      if (alliedCards[0].classList.contains("hasDivineShield")) {
        alliedCards[0].classList.remove("hasDivineShield");
        alliedCards[0].children[2].classList.add("divineShieldBreak");
        setTimeout(function () {
          alliedCards[0].children[2].style.visibility = "hidden";
        }, 400);
      }
      else if (alliedCards[0].children[1].children[0].innerHTML <= 0) {
        alliedCards[0].remove();
      }
      if (maxAttack.children[1].children[0].innerHTML <= 0) {
        maxAttack.remove();
      }
    }, 250);
  }

  return true
}

function twoAlliedCards() {
  const opponentCards = document.querySelectorAll('.computer-cardinplay'),
    alliedCards = document.querySelectorAll('.player-cardinplay'),
    numOfOpponentCards = opponentBoard.count(),
    numOfAlliedCards = playerBoard.count();

  let remainingToAttack = numOfOpponentCards - numOfAlliedCards,
    healthModifier = 9;

  if (numOfOpponentCards == 2) {
    healthModifier += 2;
  } else if (numOfOpponentCards == 3) {
    healthModifier += 4;
  } else if (numOfOpponentCards == 4) {
    healthModifier += 6;
  } else if (numOfOpponentCards == 6) {
    healthModifier += 8;
  } else if (numOfOpponentCards == 7) {
    healthModifier += 10;
  }

  if ((tauntExists == true) && (numOfOpponentCards <= 1)) {
    for (let i = 0; i < playerBoard.count(); i++) {
      if (playerBoard.htmlElement.children[i].classList.contains("hasTaunt")) {
        let maxOpponentAttack = findMaxOpponentAttack(0),
          alliedAttack = playerBoard.htmlElement.children[i].children[0].children[0].innerText,
          alliedHealth = playerBoard.htmlElement.children[i].children[1].children[0].innerText,
          opponentAttack = maxOpponentAttack.children[0].children[0].innerText,
          opponentHealth = maxOpponentAttack.children[1].children[0].innerText;

        playerBoard.htmlElement.children[i].children[1].children[0].innerText = alliedHealth - opponentAttack;
        maxOpponentAttack.children[1].children[0].innerText = opponentHealth - alliedAttack;
        break
      }
    }
  } else if (document.getElementById('playerhero').children[1].innerText <= healthModifier) {
    for (let i = 0; i < numOfOpponentCards; i++) {
      var opponentAttack = parseInt(opponentCards[i].children[0].children[0].innerText);
      var heroHealth = document.getElementById('playerhero').children[1].innerText;
      document.getElementById('playerhero').children[1].innerText = heroHealth - opponentAttack;
      showDamageLabel(opponentAttack);
    }
  } else {
    // otherwise attacks with the highest attack card on the board and attacks the player hero with the other
    if (numOfOpponentCards <= 2) {
      for (let i = 0; i < numOfOpponentCards; i++) {
        var maxOpponentAttack = findMaxOpponentAttack(i)
        var maxPlayerAttack = findMaxPlayerAttack(i)
        var alliedAttack = maxPlayerAttack.children[0].children[0].innerText;
        var alliedHealth = maxPlayerAttack.children[1].children[0].innerText;
        var opponentAttack = maxOpponentAttack.children[0].children[0].innerText;
        var opponentHealth = maxOpponentAttack.children[1].children[0].innerText;
        maxOpponentAttack.children[1].children[0].innerText = opponentHealth - alliedAttack;
        if (playerBoard.htmlElement.children[i].classList.contains("hasDivineShield")) {
          playerBoard.htmlElement.children[i].classList.remove("hasDivineShield");
          playerBoard.htmlElement.children[i].children[2].classList.add("divineShieldBreak");
          setTimeout(function () {
            playerBoard.htmlElement.children[i].children[2].style.visibility = "hidden";
          }, 400);
        } else {
          maxPlayerAttack.children[1].children[0].innerText = alliedHealth - opponentAttack;
        }

        setTimeout(function () {
          if (maxPlayerAttack.classList.contains("hasDivineShield")) {
            maxPlayerAttack.classList.remove("hasDivineShield");
            maxPlayerAttack.children[2].classList.add("divineShieldBreak");
            setTimeout(function () {
              maxPlayerAttack.children[2].style.visibility = "hidden";
            }, 400);
          }
          else if (maxPlayerAttack.children[1].children[0].innerHTML <= 0) {
            maxPlayerAttack.remove();
          }
          if (maxOpponentAttack.children[1].children[0].innerHTML <= 0) {
            maxOpponentAttack.remove();
          }
        }, 250);
      }
    } else if (numOfOpponentCards >= 3) {
      let opponentAttackSum = 0;
      for (let i = 0; i < 2; i++) {
        let maxOpponentAttack = findMaxOpponentAttack(i),
          maxPlayerAttack = findMaxPlayerAttack(i),
          alliedAttack = maxPlayerAttack.children[0].children[0].innerText,
          alliedHealth = maxPlayerAttack.children[1].children[0].innerText,
          opponentAttack = parseInt(maxOpponentAttack.children[0].children[0].innerText),
          opponentHealth = maxOpponentAttack.children[1].children[0].innerText;

        opponentAttackSum += opponentAttack;
        maxOpponentAttack.children[1].children[0].innerText = opponentHealth - alliedAttack;
        maxPlayerAttack.children[1].children[0].innerText = alliedHealth - opponentAttack;

        setTimeout(function () {
          if (maxPlayerAttack.classList.contains("hasDivineShield")) {
            maxPlayerAttack.classList.remove("hasDivineShield");
            maxPlayerAttack.children[2].classList.add("divineShieldBreak");
            setTimeout(function () {
              maxPlayerAttack.children[2].style.visibility = "hidden";
            }, 400);
          }
          else if (parseInt(maxPlayerAttack.children[1].children[0].innerText) <= 0) {
            maxPlayerAttack.remove();
          }
          if (parseInt(maxOpponentAttack.children[1].children[0].innerText) <= 0) {
            maxOpponentAttack.remove();
          }
        }, 250);
      }

      let sumOfAttack = getSumOfAttack();
      sumOfAttack -= opponentAttackSum;
      console.log(sumOfAttack)
      document.getElementById('playerhero').children[1].innerText -= sumOfAttack;
      showDamageLabel(sumOfAttack);
    }
  }

  return true
}

function threeAlliedCards() {
  const opponentCards = document.querySelectorAll('.computer-cardinplay'),
    alliedCards = document.querySelectorAll('.player-cardinplay'),
    numOfOpponentCards = opponentBoard.count(),
    numOfAlliedCards = playerBoard.count();

  let remainingToAttack = numOfOpponentCards - numOfAlliedCards,
    healthModifier = 8;

  if (numOfOpponentCards == 2) {
    healthModifier += 2;
  } else if (numOfOpponentCards == 3) {
    healthModifier += 4;
  } else if (numOfOpponentCards == 4) {
    healthModifier += 6;
  } else if (numOfOpponentCards == 6) {
    healthModifier += 8;
  } else if (numOfOpponentCards == 7) {
    healthModifier += 10;
  }

  if ((tauntExists == true) && (numOfOpponentCards <= 1)) {
    for (let i = 0; i < playerBoard.count(); i++) {
      if (playerBoard.htmlElement.children[i].classList.contains("hasTaunt")) {
        let maxOpponentAttack = findMaxOpponentAttack(0),
          alliedAttack = playerBoard.htmlElement.children[i].children[0].children[0].innerText,
          alliedHealth = playerBoard.htmlElement.children[i].children[1].children[0].innerText,
          opponentAttack = maxOpponentAttack.children[0].children[0].innerText,
          opponentHealth = maxOpponentAttack.children[1].children[0].innerText;

        playerBoard.htmlElement.children[i].children[1].children[0].innerText = alliedHealth - opponentAttack;
        maxOpponentAttack.children[1].children[0].innerText = opponentHealth - alliedAttack;
        break
      }
    }
  } else if (document.getElementById('playerhero').children[1].innerText <= healthModifier) {
    for (let i = 0; i < numOfOpponentCards; i++) {
      let opponentAttack = parseInt(opponentCards[i].children[0].children[0].innerText),
        heroHealth = document.getElementById('playerhero').children[1].innerText;
      document.getElementById('playerhero').children[1].innerText = heroHealth - opponentAttack;
      showDamageLabel(opponentAttack);
    }
  } else {
    // otherwise attacks with the highest attack card on the board and attacks the player hero with the other
    if (numOfOpponentCards <= 3) {
      for (let i = 0; i < numOfOpponentCards; i++) {
        let maxOpponentAttack = findMaxOpponentAttack(i),
          maxPlayerAttack = findMaxPlayerAttack(i),
          alliedAttack = maxPlayerAttack.children[0].children[0].innerText,
          alliedHealth = maxPlayerAttack.children[1].children[0].innerText,
          opponentAttack = maxOpponentAttack.children[0].children[0].innerText,
          opponentHealth = maxOpponentAttack.children[1].children[0].innerText;
        maxOpponentAttack.children[1].children[0].innerText = opponentHealth - alliedAttack;

        if (playerBoard.htmlElement.children[i].classList.contains("hasDivineShield")) {
          playerBoard.htmlElement.children[i].classList.remove("hasDivineShield");
          playerBoard.htmlElement.children[i].children[2].classList.add("divineShieldBreak");
          setTimeout(function () {
            playerBoard.htmlElement.children[i].children[2].style.visibility = "hidden";
          }, 400);
        } else {
          maxPlayerAttack.children[1].children[0].innerText = alliedHealth - opponentAttack;
        }

        setTimeout(function () {
          if (maxPlayerAttack.classList.contains("hasDivineShield")) {
            maxPlayerAttack.classList.remove("hasDivineShield");
            maxPlayerAttack.children[2].classList.add("divineShieldBreak");
            setTimeout(function () {
              maxPlayerAttack.children[2].style.visibility = "hidden";
            }, 400);
          }
          else if (maxPlayerAttack.children[1].children[0].innerHTML <= 0) {
            maxPlayerAttack.remove();
          }
          if (maxOpponentAttack.children[1].children[0].innerHTML <= 0) {
            maxOpponentAttack.remove();
          }
        }, 250);
      }
    } else if (numOfOpponentCards >= 4) {
      let opponentAttackSum = 0;
      for (let i = 0; i < 2; i++) {
        let maxOpponentAttack = findMaxOpponentAttack(i),
          maxPlayerAttack = findMaxPlayerAttack(i),
          alliedAttack = maxPlayerAttack.children[0].children[0].innerText,
          alliedHealth = maxPlayerAttack.children[1].children[0].innerText,
          opponentAttack = parseInt(maxOpponentAttack.children[0].children[0].innerText),
          opponentHealth = maxOpponentAttack.children[1].children[0].innerText;

        opponentAttackSum += opponentAttack;
        maxOpponentAttack.children[1].children[0].innerText = opponentHealth - alliedAttack;

        if (playerBoard.htmlElement.children[i].classList.contains("hasDivineShield")) {
          playerBoard.htmlElement.children[i].classList.remove("hasDivineShield");
          playerBoard.htmlElement.children[i].children[2].classList.add("divineShieldBreak");
          setTimeout(function () {
            playerBoard.htmlElement.children[i].children[2].style.visibility = "hidden";
          }, 400);
        } else {
          maxPlayerAttack.children[1].children[0].innerText = alliedHealth - opponentAttack;
        }

        setTimeout(function () {
          if (maxPlayerAttack.classList.contains("hasDivineShield")) {
            maxPlayerAttack.classList.remove("hasDivineShield");
            maxPlayerAttack.children[2].classList.add("divineShieldBreak");
            setTimeout(function () {
              maxPlayerAttack.children[2].style.visibility = "hidden";
            }, 400);
          } else if (parseInt(maxPlayerAttack.children[1].children[0].innerText) <= 0) {
            maxPlayerAttack.remove();
          }

          if (parseInt(maxOpponentAttack.children[1].children[0].innerText) <= 0) {
            maxOpponentAttack.remove();
          }
        }, 250);
      }
      let sumOfAttack = getSumOfAttack();
      sumOfAttack -= opponentAttackSum;
      console.log(sumOfAttack)
      document.getElementById('playerhero').children[1].innerText -= sumOfAttack;
      showDamageLabel(sumOfAttack);
    }
  }

  return true
}

function fourAlliedCards() {
  const opponentCards = document.querySelectorAll('.computer-cardinplay'),
    alliedCards = document.querySelectorAll('.player-cardinplay'),
    numOfOpponentCards = opponentBoard.count(),
    numOfAlliedCards = playerBoard.count();

  let remainingToAttack = numOfOpponentCards - numOfAlliedCards,
    healthModifier = 7;

  if (numOfOpponentCards == 2) {
    healthModifier += 2;
  } else if (numOfOpponentCards == 3) {
    healthModifier += 4;
  } else if (numOfOpponentCards == 4) {
    healthModifier += 6;
  } else if (numOfOpponentCards == 6) {
    healthModifier += 8;
  } else if (numOfOpponentCards == 7) {
    healthModifier += 10;
  }

  if ((tauntExists == true) && (numOfOpponentCards <= 1)) {
    for (let i = 0; i < playerBoard.count(); i++) {
      if (playerBoard.htmlElement.children[i].classList.contains("hasTaunt")) {
        let maxOpponentAttack = findMaxOpponentAttack(0),
          alliedAttack = playerBoard.htmlElement.children[i].children[0].children[0].innerText,
          alliedHealth = playerBoard.htmlElement.children[i].children[1].children[0].innerText,
          opponentAttack = maxOpponentAttack.children[0].children[0].innerText,
          opponentHealth = maxOpponentAttack.children[1].children[0].innerText;

        playerBoard.htmlElement.children[i].children[1].children[0].innerText = alliedHealth - opponentAttack;
        maxOpponentAttack.children[1].children[0].innerText = opponentHealth - alliedAttack;
        break;
      }
    }
  } else if (document.getElementById('playerhero').children[1].innerText <= healthModifier) {
    for (let i = 0; i < numOfOpponentCards; i++) {
      let opponentAttack = parseInt(opponentCards[i].children[0].children[0].innerText),
        heroHealth = document.getElementById('playerhero').children[1].innerText;

      document.getElementById('playerhero').children[1].innerText = heroHealth - opponentAttack;
      showDamageLabel(opponentAttack);
    }
  } else {
    // otherwise attacks with the highest attack card on the board and attacks the player hero with the other
    if (numOfOpponentCards <= 4) {
      for (let i = 0; i < numOfOpponentCards; i++) {
        let maxOpponentAttack = findMaxOpponentAttack(i),
          maxPlayerAttack = findMaxPlayerAttack(i),
          alliedAttack = maxPlayerAttack.children[0].children[0].innerText,
          alliedHealth = maxPlayerAttack.children[1].children[0].innerText,
          opponentAttack = maxOpponentAttack.children[0].children[0].innerText,
          opponentHealth = maxOpponentAttack.children[1].children[0].innerText;

        maxOpponentAttack.children[1].children[0].innerText = opponentHealth - alliedAttack;

        if (playerBoard.htmlElement.children[i].classList.contains("hasDivineShield")) {
          playerBoard.htmlElement.children[i].classList.remove("hasDivineShield");
          playerBoard.htmlElement.children[i].children[2].classList.add("divineShieldBreak");
          setTimeout(function () {
            playerBoard.htmlElement.children[i].children[2].style.visibility = "hidden";
          }, 400);
        } else {
          maxPlayerAttack.children[1].children[0].innerText = alliedHealth - opponentAttack;
        }

        setTimeout(function () {
          if (maxPlayerAttack.classList.contains("hasDivineShield")) {
            maxPlayerAttack.classList.remove("hasDivineShield");
            maxPlayerAttack.children[2].classList.add("divineShieldBreak");
            setTimeout(function () {
              maxPlayerAttack.children[2].style.visibility = "hidden";
            }, 400);
          } else if (maxPlayerAttack.children[1].children[0].innerHTML <= 0) {
            maxPlayerAttack.remove();
          }

          if (maxOpponentAttack.children[1].children[0].innerHTML <= 0) {
            maxOpponentAttack.remove();
          }
        }, 250);
      }
    } else if (numOfOpponentCards >= 5) {
      let opponentAttackSum = 0;
      for (let i = 0; i < 2; i++) {
        let maxOpponentAttack = findMaxOpponentAttack(i),
          maxPlayerAttack = findMaxPlayerAttack(i),
          alliedAttack = maxPlayerAttack.children[0].children[0].innerText,
          alliedHealth = maxPlayerAttack.children[1].children[0].innerText,
          opponentAttack = parseInt(maxOpponentAttack.children[0].children[0].innerText),
          opponentHealth = maxOpponentAttack.children[1].children[0].innerText;

        opponentAttackSum += opponentAttack;
        maxOpponentAttack.children[1].children[0].innerText = opponentHealth - alliedAttack;

        if (playerBoard.htmlElement.children[i].classList.contains("hasDivineShield")) {
          playerBoard.htmlElement.children[i].classList.remove("hasDivineShield");
          playerBoard.htmlElement.children[i].children[2].classList.add("divineShieldBreak");
          setTimeout(function () {
            playerBoard.htmlElement.children[i].children[2].style.visibility = "hidden";
          }, 400);
        } else {
          maxPlayerAttack.children[1].children[0].innerText = alliedHealth - opponentAttack;
        }

        setTimeout(function () {
          if (maxPlayerAttack.classList.contains("hasDivineShield")) {
            maxPlayerAttack.classList.remove("hasDivineShield");
            maxPlayerAttack.children[2].classList.add("divineShieldBreak");
            setTimeout(function () {
              maxPlayerAttack.children[2].style.visibility = "hidden";
            }, 400);
          } else if (parseInt(maxPlayerAttack.children[1].children[0].innerText) <= 0) {
            maxPlayerAttack.remove();
          }

          if (parseInt(maxOpponentAttack.children[1].children[0].innerText) <= 0) {
            maxOpponentAttack.remove();
          }
        }, 250);
      }

      let sumOfAttack = getSumOfAttack();
      sumOfAttack -= opponentAttackSum;
      console.log(sumOfAttack)
      document.getElementById('playerhero').children[1].innerText -= sumOfAttack;
      showDamageLabel(sumOfAttack);
    }
  }

  return true
}

function fiveAlliedCards() {
  const opponentCards = document.querySelectorAll('.computer-cardinplay'),
    alliedCards = document.querySelectorAll('.player-cardinplay'),
    numOfOpponentCards = opponentBoard.count(),
    numOfAlliedCards = playerBoard.count();

  let remainingToAttack = numOfOpponentCards - numOfAlliedCards,
    healthModifier = 6;

  if (numOfOpponentCards == 2) {
    healthModifier += 2;
  } else if (numOfOpponentCards == 3) {
    healthModifier += 4;
  } else if (numOfOpponentCards == 4) {
    healthModifier += 6;
  } else if (numOfOpponentCards == 6) {
    healthModifier += 8;
  } else if (numOfOpponentCards == 7) {
    healthModifier += 10;
  }

  if ((tauntExists == true) && (numOfOpponentCards <= 1)) {
    for (let i = 0; i < playerBoard.count(); i++) {
      if (playerBoard.htmlElement.children[i].classList.contains("hasTaunt")) {
        let maxOpponentAttack = findMaxOpponentAttack(0),
          alliedAttack = playerBoard.htmlElement.children[i].children[0].children[0].innerText,
          alliedHealth = playerBoard.htmlElement.children[i].children[1].children[0].innerText,
          opponentAttack = maxOpponentAttack.children[0].children[0].innerText,
          opponentHealth = maxOpponentAttack.children[1].children[0].innerText;

        playerBoard.htmlElement.children[i].children[1].children[0].innerText = alliedHealth - opponentAttack;
        maxOpponentAttack.children[1].children[0].innerText = opponentHealth - alliedAttack;

        break;
      }
    }
  }
  else if (document.getElementById('playerhero').children[1].innerText <= healthModifier) {
    for (let i = 0; i < numOfOpponentCards; i++) {
      let opponentAttack = parseInt(opponentCards[i].children[0].children[0].innerText),
        heroHealth = document.getElementById('playerhero').children[1].innerText;

      document.getElementById('playerhero').children[1].innerText = heroHealth - opponentAttack;
      showDamageLabel(opponentAttack);
    }
  } else {
    // otherwise attacks with the highest attack card on the board and attacks the player hero with the other
    if (numOfOpponentCards <= 5) {
      for (let i = 0; i < numOfOpponentCards; i++) {
        let maxOpponentAttack = findMaxOpponentAttack(i),
          maxPlayerAttack = findMaxPlayerAttack(i),
          alliedAttack = maxPlayerAttack.children[0].children[0].innerText,
          alliedHealth = maxPlayerAttack.children[1].children[0].innerText,
          opponentAttack = maxOpponentAttack.children[0].children[0].innerText,
          opponentHealth = maxOpponentAttack.children[1].children[0].innerText;

        maxOpponentAttack.children[1].children[0].innerText = opponentHealth - alliedAttack;

        if (playerBoard.htmlElement.children[i].classList.contains("hasDivineShield")) {
          playerBoard.htmlElement.children[i].classList.remove("hasDivineShield");
          playerBoard.htmlElement.children[i].children[2].classList.add("divineShieldBreak");
          setTimeout(function () {
            playerBoard.htmlElement.children[i].children[2].style.visibility = "hidden";
          }, 400);
        } else {
          maxPlayerAttack.children[1].children[0].innerText = alliedHealth - opponentAttack;
        }

        setTimeout(function () {
          if (maxPlayerAttack.classList.contains("hasDivineShield")) {
            maxPlayerAttack.classList.remove("hasDivineShield");
            maxPlayerAttack.children[2].classList.add("divineShieldBreak");
            setTimeout(function () {
              maxPlayerAttack.children[2].style.visibility = "hidden";
            }, 400);
          } else if (maxPlayerAttack.children[1].children[0].innerHTML <= 0) {
            maxPlayerAttack.remove();
          }

          if (maxOpponentAttack.children[1].children[0].innerHTML <= 0) {
            maxOpponentAttack.remove();
          }
        }, 250);
      }
    } else if (numOfOpponentCards >= 6) {
      let opponentAttackSum = 0;
      for (let i = 0; i < 2; i++) {
        let maxOpponentAttack = findMaxOpponentAttack(i),
          maxPlayerAttack = findMaxPlayerAttack(i),
          alliedAttack = maxPlayerAttack.children[0].children[0].innerText,
          alliedHealth = maxPlayerAttack.children[1].children[0].innerText,
          opponentAttack = parseInt(maxOpponentAttack.children[0].children[0].innerText),
          opponentHealth = maxOpponentAttack.children[1].children[0].innerText;

        opponentAttackSum += opponentAttack;
        maxOpponentAttack.children[1].children[0].innerText = opponentHealth - alliedAttack;

        if (playerBoard.htmlElement.children[i].classList.contains("hasDivineShield")) {
          playerBoard.htmlElement.children[i].classList.remove("hasDivineShield");
          playerBoard.htmlElement.children[i].children[2].classList.add("divineShieldBreak");
          setTimeout(function () {
            playerBoard.htmlElement.children[i].children[2].style.visibility = "hidden";
          }, 400);
        } else {
          maxPlayerAttack.children[1].children[0].innerText = alliedHealth - opponentAttack;
        }

        setTimeout(function () {
          if (maxPlayerAttack.classList.contains("hasDivineShield")) {
            maxPlayerAttack.classList.remove("hasDivineShield");
            maxPlayerAttack.children[2].classList.add("divineShieldBreak");
            setTimeout(function () {
              maxPlayerAttack.children[2].style.visibility = "hidden";
            }, 400);
          } else if (parseInt(maxPlayerAttack.children[1].children[0].innerText) <= 0) {
            maxPlayerAttack.remove();
          }

          if (parseInt(maxOpponentAttack.children[1].children[0].innerText) <= 0) {
            maxOpponentAttack.remove();
          }
        }, 250);
      }

      let sumOfAttack = getSumOfAttack();
      sumOfAttack -= opponentAttackSum;
      console.log(sumOfAttack)
      document.getElementById('playerhero').children[1].innerText -= sumOfAttack;
      showDamageLabel(sumOfAttack);
    }
  }

  return true
}

function sixAlliedCards() {
  const opponentCards = document.querySelectorAll('.computer-cardinplay'),
    alliedCards = document.querySelectorAll('.player-cardinplay'),
    numOfOpponentCards = opponentBoard.count(),
    numOfAlliedCards = playerBoard.count();

  let remainingToAttack = numOfOpponentCards - numOfAlliedCards,
    healthModifier = 5;

  if (numOfOpponentCards == 2) {
    healthModifier += 2;
  } else if (numOfOpponentCards == 3) {
    healthModifier += 4;
  } else if (numOfOpponentCards == 4) {
    healthModifier += 6;
  } else if (numOfOpponentCards == 6) {
    healthModifier += 8;
  } else if (numOfOpponentCards == 7) {
    healthModifier += 10;
  }

  if ((tauntExists == true) && (numOfOpponentCards <= 1)) {
    for (let i = 0; i < playerBoard.count(); i++) {
      if (playerBoard.htmlElement.children[i].classList.contains("hasTaunt")) {
        let maxOpponentAttack = findMaxOpponentAttack(0),
          alliedAttack = playerBoard.htmlElement.children[i].children[0].children[0].innerText,
          alliedHealth = playerBoard.htmlElement.children[i].children[1].children[0].innerText,
          opponentAttack = maxOpponentAttack.children[0].children[0].innerText,
          opponentHealth = maxOpponentAttack.children[1].children[0].innerText;

        playerBoard.htmlElement.children[i].children[1].children[0].innerText = alliedHealth - opponentAttack;
        maxOpponentAttack.children[1].children[0].innerText = opponentHealth - alliedAttack;

        break;
      }
    }
  } else if (document.getElementById('playerhero').children[1].innerText <= healthModifier) {
    for (let i = 0; i < numOfOpponentCards; i++) {
      let opponentAttack = parseInt(opponentCards[i].children[0].children[0].innerText),
        heroHealth = document.getElementById('playerhero').children[1].innerText;

      document.getElementById('playerhero').children[1].innerText = heroHealth - opponentAttack;
      showDamageLabel(opponentAttack);
    }
  } else {
    // otherwise attacks with the highest attack card on the board and attacks the player hero with the other
    if (numOfOpponentCards <= 6) {
      for (let i = 0; i < numOfOpponentCards; i++) {
        let maxOpponentAttack = findMaxOpponentAttack(i),
          maxPlayerAttack = findMaxPlayerAttack(i),
          alliedAttack = maxPlayerAttack.children[0].children[0].innerText,
          alliedHealth = maxPlayerAttack.children[1].children[0].innerText,
          opponentAttack = maxOpponentAttack.children[0].children[0].innerText,
          opponentHealth = maxOpponentAttack.children[1].children[0].innerText;

        maxOpponentAttack.children[1].children[0].innerText = opponentHealth - alliedAttack;

        if (playerBoard.htmlElement.children[i].classList.contains("hasDivineShield")) {
          playerBoard.htmlElement.children[i].classList.remove("hasDivineShield");
          playerBoard.htmlElement.children[i].children[2].classList.add("divineShieldBreak");
          setTimeout(function () {
            playerBoard.htmlElement.children[i].children[2].style.visibility = "hidden";
          }, 400);
        } else {
          maxPlayerAttack.children[1].children[0].innerText = alliedHealth - opponentAttack;
        }

        setTimeout(function () {
          if (maxPlayerAttack.classList.contains("hasDivineShield")) {
            maxPlayerAttack.classList.remove("hasDivineShield");
            maxPlayerAttack.children[2].classList.add("divineShieldBreak");
            setTimeout(function () {
              maxPlayerAttack.children[2].style.visibility = "hidden";
            }, 400);
          } else if (maxPlayerAttack.children[1].children[0].innerHTML <= 0) {
            maxPlayerAttack.remove();
          }

          if (maxOpponentAttack.children[1].children[0].innerHTML <= 0) {
            maxOpponentAttack.remove();
          }
        }, 250);
      }
    } else if (numOfOpponentCards >= 7) {
      let opponentAttackSum = 0;
      for (let i = 0; i < 2; i++) {
        let maxOpponentAttack = findMaxOpponentAttack(i),
          maxPlayerAttack = findMaxPlayerAttack(i),
          alliedAttack = maxPlayerAttack.children[0].children[0].innerText,
          alliedHealth = maxPlayerAttack.children[1].children[0].innerText,
          opponentAttack = parseInt(maxOpponentAttack.children[0].children[0].innerText),
          opponentHealth = maxOpponentAttack.children[1].children[0].innerText;

        opponentAttackSum += opponentAttack;
        maxOpponentAttack.children[1].children[0].innerText = opponentHealth - alliedAttack;

        if (playerBoard.htmlElement.children[i].classList.contains("hasDivineShield")) {
          playerBoard.htmlElement.children[i].classList.remove("hasDivineShield");
          playerBoard.htmlElement.children[i].children[2].classList.add("divineShieldBreak");
          setTimeout(function () {
            playerBoard.htmlElement.children[i].children[2].style.visibility = "hidden";
          }, 400);
        } else {
          maxPlayerAttack.children[1].children[0].innerText = alliedHealth - opponentAttack;
        }

        setTimeout(function () {
          if (maxPlayerAttack.classList.contains("hasDivineShield")) {
            maxPlayerAttack.classList.remove("hasDivineShield");
            maxPlayerAttack.children[2].classList.add("divineShieldBreak");
            setTimeout(function () {
              maxPlayerAttack.children[2].style.visibility = "hidden";
            }, 400);
          } else if (parseInt(maxPlayerAttack.children[1].children[0].innerText) <= 0) {
            maxPlayerAttack.remove();
          }

          if (parseInt(maxOpponentAttack.children[1].children[0].innerText) <= 0) {
            maxOpponentAttack.remove();
          }
        }, 250);
      }

      let sumOfAttack = getSumOfAttack();
      sumOfAttack -= opponentAttackSum;
      console.log(sumOfAttack)
      document.getElementById('playerhero').children[1].innerText -= sumOfAttack;
      showDamageLabel(sumOfAttack);
    }
  }

  return true
}

function sevenAlliedCards() {
  const opponentCards = document.querySelectorAll('.computer-cardinplay'),
    alliedCards = document.querySelectorAll('.player-cardinplay'),
    numOfOpponentCards = opponentBoard.count(),
    numOfAlliedCards = playerBoard.count();

  let remainingToAttack = numOfOpponentCards - numOfAlliedCards,
    healthModifier = 4;

  if (numOfOpponentCards == 2) {
    healthModifier += 2;
  } else if (numOfOpponentCards == 3) {
    healthModifier += 4;
  } else if (numOfOpponentCards == 4) {
    healthModifier += 6;
  } else if (numOfOpponentCards == 6) {
    healthModifier += 8;
  } else if (numOfOpponentCards == 7) {
    healthModifier += 10;
  }

  if (tauntExists && (numOfOpponentCards <= 1)) {
    for (let i = 0; i < playerBoard.count(); i++) {
      if (playerBoard.htmlElement.children[i].classList.contains("hasTaunt")) {
        let maxOpponentAttack = findMaxOpponentAttack(0),
          alliedAttack = playerBoard.htmlElement.children[i].children[0].children[0].innerText,
          alliedHealth = playerBoard.htmlElement.children[i].children[1].children[0].innerText,
          opponentAttack = maxOpponentAttack.children[0].children[0].innerText,
          opponentHealth = maxOpponentAttack.children[1].children[0].innerText;

        playerBoard.htmlElement.children[i].children[1].children[0].innerText = alliedHealth - opponentAttack;
        maxOpponentAttack.children[1].children[0].innerText = opponentHealth - alliedAttack;

        break;
      }
    }
  } else if (document.getElementById('playerhero').children[1].innerText <= healthModifier) {
    for (let i = 0; i < numOfOpponentCards; i++) {
      let opponentAttack = parseInt(opponentCards[i].children[0].children[0].innerText),
        heroHealth = document.getElementById('playerhero').children[1].innerText;

      document.getElementById('playerhero').children[1].innerText = heroHealth - opponentAttack;
      showDamageLabel(opponentAttack);
    }
  } else {
    // otherwise attacks with the highest attack card on the board and attacks the player hero with the other
    if (numOfOpponentCards <= 7) {
      for (let i = 0; i < numOfOpponentCards; i++) {
        let maxOpponentAttack = findMaxOpponentAttack(i),
          maxPlayerAttack = findMaxPlayerAttack(i),
          alliedAttack = maxPlayerAttack.children[0].children[0].innerText,
          alliedHealth = maxPlayerAttack.children[1].children[0].innerText,
          opponentAttack = maxOpponentAttack.children[0].children[0].innerText,
          opponentHealth = maxOpponentAttack.children[1].children[0].innerText;

        maxOpponentAttack.children[1].children[0].innerText = opponentHealth - alliedAttack;

        if (playerBoard.htmlElement.children[i].classList.contains("hasDivineShield")) {
          playerBoard.htmlElement.children[i].classList.remove("hasDivineShield");
          playerBoard.htmlElement.children[i].children[2].classList.add("divineShieldBreak");
          setTimeout(function () {
            playerBoard.htmlElement.children[i].children[2].style.visibility = "hidden";
          }, 400);
        } else {
          maxPlayerAttack.children[1].children[0].innerText = alliedHealth - opponentAttack;
        }

        setTimeout(function () {
          if (maxPlayerAttack.classList.contains("hasDivineShield")) {
            maxPlayerAttack.classList.remove("hasDivineShield");
            maxPlayerAttack.children[2].classList.add("divineShieldBreak");
            setTimeout(function () {
              maxPlayerAttack.children[2].style.visibility = "hidden";
            }, 400);
          } else if (maxPlayerAttack.children[1].children[0].innerHTML <= 0) {
            maxPlayerAttack.remove();
          }

          if (maxOpponentAttack.children[1].children[0].innerHTML <= 0) {
            maxOpponentAttack.remove();
          }
        }, 250);
      }
    }
  }

  return true
}
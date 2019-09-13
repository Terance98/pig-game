/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer, dice, gamePlaying,prevDice;

init();

//Looking for the click event to happen on ROLL DICE Button
document.querySelector(".btn-roll").addEventListener("click", () => {
  //Do something here
  if (gamePlaying) {
    //1. A random number
    dice = Math.floor(Math.random() * 6) + 1;
    // 2. Display the result
    let diceDom = document.querySelector(".dice");
    diceDom.style.display = "block";
    diceDom.src = "dice-" + dice + ".png";

    //3. Update the round score IF the rolled number was NOT 1
    if (dice !== 1 && (prevDice !==6 || dice !== 6)) {
      console.log(`PrevDice: ${prevDice}, CurrentDice: ${dice}`);

      //Add score
      roundScore += dice;
      document.querySelector("#current-" + activePlayer).textContent = roundScore;
    } else {
      //Next player
      if (prevDice === 6 && dice === 6){
        scores[activePlayer] = 0;
        document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
      }
      console.log(`PrevDice: ${prevDice}, CurrentDice: ${dice}`);
      nextPlayer();
    }
    prevDice = dice;

  }
});

document.querySelector(".btn-hold").addEventListener("click", () => {
  if (gamePlaying) {
    // Add current score to GLOBAL Score
    scores[activePlayer] += roundScore;

    //Update the UI
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    //Check if player won the game
    if (scores[activePlayer] >= 20) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner";
      document.querySelector(".dice").style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gamePlaying = false;
    } else {
      //Next Player
      nextPlayer();
    }
  }
});

function nextPlayer() {
  activePlayer ? (activePlayer = 0) : (activePlayer = 1);
  roundScore = 0;
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  document.querySelector(".dice").style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;
  prevDice = undefined;
  document.querySelector(".dice").style.display = "none";

  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}

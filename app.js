/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer, dice1, dice2, gamePlaying, winningScore;

init();

//Looking for the click event to happen on ROLL DICE Button
document.querySelector(".btn-roll").addEventListener("click", () => {
  //Do something here
  if (gamePlaying) {
    //1. A random number
    dice1 = Math.floor(Math.random() * 6) + 1;
    dice2 = Math.floor(Math.random() * 6) + 1;

    // 2. Display the result
    let diceDom = document.getElementsByClassName("dice");
    diceDom[0].style.display = "block";
    diceDom[0].src = "dice-" + dice1 + ".png";
    diceDom[1].style.display = "block";
    diceDom[1].src = "dice-" + dice2 + ".png";


    //3. Update the round score IF the rolled number was NOT 1
    if (dice1 !== 1 && dice2 !== 1) {
      //Add score
      roundScore += dice1 + dice2;
      document.querySelector("#current-" + activePlayer).textContent = roundScore;
    } else {
      //Next player
      if (prevDice === 6 && dice1 === 6) {
        scores[activePlayer] = 0;
        document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
      }
      nextPlayer();
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", () => {
  if (gamePlaying) {
    // Add current score to GLOBAL Score
    scores[activePlayer] += roundScore;

    //Update the UI
    document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];

    //Check if player won the game
    if (scores[activePlayer] >= winningScore) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner";
      removeDiceImage();
      document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
      document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
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
  removeDiceImage();
}

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  prevDice = undefined;
  document.querySelector('.winning-score-div').style.display = "block";
  removeDiceImage();


  document.querySelector('input').value = "";

  document.querySelector('input').addEventListener('keydown', (e) => {
    if (e.keyCode == 13) {
      winningScore = document.querySelector('input').value;
      document.querySelector('.winning-score-div').style.display = "none";
      gamePlaying = true;

    }
  });


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

function removeDiceImage() {
  document.getElementsByClassName("dice")[0].style.display = "none";
  document.getElementsByClassName("dice")[1].style.display = "none";
}
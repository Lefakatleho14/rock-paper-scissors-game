/**
 * The main script for the Rock Paper Scissors game.
 * @author: Karim Aouaouda
 * @author: Lefa
 * @author: Tony 
 */

import { insensitiveCompare } from './helpers.js';



const gameStateObj = {
  round: 0,
  isGameOver: false,
  winner: null,
  score: {
    player: 0,
    computer: 0
  },
  winConditions: {
    "rock": "scissors",
    "paper": "rock",
    "scissors": "paper"
  },
  choices: ["rock", "paper", "scissors"],
}

const gameState = new Proxy(gameStateObj, {
  get(target, property) {
    // make it recursive proxy for nested objects
    if (typeof target[property] === 'object' && target[property] !== null) {
      return new Proxy(target[property], this);
    }

    return target[property];
  },
  set(target, property, value) {
    // this function will be called whenever a property is set on the gameState object. We can use this to enforce rules or trigger side effects.

    target[property] = value;

    if (property === 'player' || property === 'computer') { // if the score is updated, check if the game is over
      if (gameState.score.player >= 3) { // if the player has won 3 rounds, they win the game
        gameState.winner = 'player';
        gameState.isGameOver = true;
      } else if (gameState.score.computer >= 3) { // if the computer has won 3 rounds, it wins the game
        gameState.winner = 'computer';
        gameState.isGameOver = true;
      }
    }

    return true;
  }
});



// 2. COMPUTER LOGIC (To be written by Lefa)
function computerPlay() {
  // Math.random() logic goes here
}

/**
 * Plays a single round of Rock Paper Scissors.
 * @param {string} playerSelection - The player's choice.
 * @param {string} computerSelection - The computer's choice.
 * @returns {number} 1 if the player wins, -1 if the computer wins, 0 if it's a tie.
 */
function playRound(playerSelection, computerSelection) {
  // no need to validate playerSelection, as it is already validated in promptChoice()

  // Check for a tie : player chose the same as computer
  if (playerSelection === computerSelection) {
    return 0;
  }
  // Check if the player's selection beats the computer's selection
  if (winConditions[playerSelection] === computerSelection) {
    gameState.score.player++;
    return 1;
  }
  // If the player didn't win and it's not a tie, the computer wins
  gameState.score.computer++;
  return -1;
}

// 4. GAME LOOP (To be written by Tony)
function game() {
  // while loop, prompt(), score tracking goes here
  let playerOptions = ["rock", "paper", "scissors"]
  let feedback = "Start";
  do {
    let playerSelection = prompt(`${feedback}\nYou ${gameState.score.player} — ${gameState.score.computer} Computer\nrock, paper or scissors?`);
    if (playerSelection === null) {
      if (confirm("Are you sure you want to quit?")) {
        alert("Goodbye!");
        return 1
      }
      else {
        continue
      }
    }
    else {
      playerSelection = playerSelection.trim().toLowerCase();
      if (playerOptions.includes(playerSelection)) {
        let computerSelection = computerPlay()
        let outcome = playRound(playerSelection, computerSelection);
        feedback = ["Computer wins", "Draw", "You win"][outcome + 1];
      }
      else {
        alert("Please enter a valid option.");
        continue;
      }
    }
  } while (!gameState.isGameOver);
  return 0
}

// START THE GAME
let endStatus = game();

if (endStatus == 0) {
  alert("Game Over! The winner is: " + gameState.winner);
}
else {
  close()
}

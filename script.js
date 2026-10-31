// ==========================================
// 1. TEAM INSTRUCTIONS (UX)
// ==========================================
alert("Welcome to Rock, Paper, Scissors vs. the Evil AI!\n\nIMPORTANT: Press F12 (or Right-Click -> Inspect -> Console) to see the game logs and scoreboard.\n\nFirst to 3 points wins. Press 'Cancel' at any time to quit.");
console.clear();

// ==========================================
// 2. COMPUTER LOGIC (Lefa)
// ==========================================
const CHOICES = ["rock", "paper", "scissors"];
const WIN_SCORE = 3;

/**
 * Returns the computer's choice at random.
 * @author Lefa
 * @returns {string} "rock", "paper", or "scissors".
 */
function computerPlay() {
  return CHOICES[Math.floor(Math.random() * CHOICES.length)];
}

// ==========================================
// 3. GAME STATE (Karim's Proxy Logic)
// ==========================================
const gameState = {
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
  }
};

// ==========================================
// 4. ROUND LOGIC (Karim)
// ==========================================

/**
 * Compares the two selections. Pure: reads state, writes nothing.
 * @author Karim
 * @param {string} playerSelection - The player's choice.
 * @param {string} computerSelection - The computer's choice.
 * @returns {number} 1 if the player wins, -1 if the computer wins, 0 for a draw.
 */
function getRoundOutcome(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    return 0;
  }

  if (gameState.winConditions[playerSelection] === computerSelection) {
    return 1;
  }

  return -1;
}

/**
 * Puts one round's result on the scoreboard.
 * @author Karim
 * @param {number} outcome - 1 player won, -1 computer won, 0 draw (ignored).
 * @returns {void}
 */
function updateScore(outcome) {
  if (outcome === 1) {
    gameState.score.player++;
  }
  if (outcome === -1) {
    gameState.score.computer++;
  }
}

/**
 * Plays one shot: decides the winner, then scores it.
 * Kept for tests.js, which asserts that the score changes.
 * @author Karim
 * @param {string} playerSelection - The player's choice.
 * @param {string} computerSelection - The computer's choice.
 * @returns {number} 1 if the player wins, -1 if the computer wins, 0 for a draw.
 */
function playRound(playerSelection, computerSelection) {
  const outcome = getRoundOutcome(playerSelection, computerSelection);
  updateScore(outcome);
  return outcome;
}

/**
 * Ends the game once someone reaches WIN_SCORE: sets winner and isGameOver.
 * @author Karim
 * @returns {void}
 */
function checkWinner() {
  if (gameState.score.player >= WIN_SCORE) {
    gameState.winner = "Player";
    gameState.isGameOver = true;
  } else if (gameState.score.computer >= WIN_SCORE) {
    gameState.winner = "Computer (The Evil AI)";
    gameState.isGameOver = true;
  }
}

// ==========================================
// 5. GAME LOOP & HELPERS (Tony)
// ==========================================

/**
 * Asks until the player types a valid choice (case-insensitive, trimmed).
 * @author Tony
 * @param {string} message - The prompt text, including score and last result.
 * @returns {string|null} The validated choice, or null when the player cancels.
 */
function promptChoice(message) {
  let raw = prompt(message);
  while (raw !== null) {
    const choice = raw.trim().toLowerCase();
    if (CHOICES.includes(choice)) {
      return choice;
    }
    alert("Invalid input! Please enter rock, paper, or scissors.");
    raw = prompt(message);
  }
  return null;
}

/**
 * Asks the player to confirm quitting; says goodbye when they do.
 * @author Tony
 * @returns {boolean} True when the player confirmed the quit.
 */
function confirmQuit() {
  if (confirm("Are you sure you want to quit?")) {
    alert("Goodbye!");
    return true;
  }
  return false;
}

/**
 * Describes the round that just happened, for the next prompt and the console.
 * @author Tony
 * @param {number} outcome - 1 player won, -1 computer won, 0 draw.
 * @param {string} playerSelection - The player's choice.
 * @param {string} computerSelection - The computer's choice.
 * @returns {string} The feedback message.
 */
function roundMessage(outcome, playerSelection, computerSelection) {
  if (outcome === 1) {
    return `You Win this round! ${playerSelection} beats ${computerSelection}.`;
  }
  if (outcome === -1) {
    return `You Lose this round! ${computerSelection} beats ${playerSelection}.`;
  }
  return `It's a Draw! Both chose ${playerSelection}.`;
}

/**
 * Puts the scoreboard back to the start state, ready for a fresh game.
 * @author Tony
 * @returns {void}
 */
function resetGame() {
  gameState.score.player = 0;
  gameState.score.computer = 0;
  gameState.winner = null;
  gameState.isGameOver = false;
}

/**
 * Runs rounds until someone reaches WIN_SCORE, or the player quits.
 * Orchestration only: every job is delegated to a helper.
 * @author Tony
 * @returns {void} Check gameState.isGameOver and gameState.winner afterwards.
 */
function game() {
  let feedback = "Game Started!";

  while (!gameState.isGameOver) {
    const playerSelection = promptChoice(`${feedback}\n\nScore -> You: ${gameState.score.player} | AI: ${gameState.score.computer}\n\nType rock, paper, or scissors:`);

    if (playerSelection === null) {
      if (confirmQuit()) {
        return;
      }
      continue;
    }

    const computerSelection = computerPlay();
    const outcome = playRound(playerSelection, computerSelection);

    feedback = roundMessage(outcome, playerSelection, computerSelection);
    console.log(feedback);

    checkWinner();
  }

  const finalMessage = `GAME OVER!\n\nThe winner is: ${gameState.winner}\nFinal Score -> You: ${gameState.score.player} | AI: ${gameState.score.computer}`;
  console.log(finalMessage);
}

// ==========================================
// 6. START THE GAME (with replay)
// ==========================================
do {
  resetGame();

  game();

  if (!gameState.isGameOver) break;
} while (confirm(
  `GAME OVER! ${gameState.winner} wins.\n` +
  `Final score -> You: ${gameState.score.player} | AI: ${gameState.score.computer}\n\n` +
  `Do you want to play again?`
));

close();
if (gameState.isGameOver) alert("Thanks for playing — you can close this tab.");

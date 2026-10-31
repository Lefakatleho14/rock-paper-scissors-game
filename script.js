alert("Welcome to Rock, Paper, Scissors vs. the Evil AI!\n\nIMPORTANT: Press F12 (or Right-Click -> Inspect -> Console) to see the game logs and scoreboard.\n\nFirst to 3 points wins. Press 'Cancel' at any time to quit.");
console.clear();

const CHOICES = ["rock", "paper", "scissors"];
const WIN_SCORE = 3;

function computerPlay() {
  return CHOICES[Math.floor(Math.random() * CHOICES.length)];
}

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

function getRoundOutcome(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    return 0;
  }

  if (gameState.winConditions[playerSelection] === computerSelection) {
    return 1;
  }

  return -1;
}

function updateScore(outcome) {
  if (outcome === 1) {
    gameState.score.player++;
  }
  if (outcome === -1) {
    gameState.score.computer++;
  }
}

function playRound(playerSelection, computerSelection) {
  const outcome = getRoundOutcome(playerSelection, computerSelection);
  updateScore(outcome);
  return outcome;
}

function checkWinner() {
  if (gameState.score.player >= WIN_SCORE) {
    gameState.winner = "Player";
    gameState.isGameOver = true;
  } else if (gameState.score.computer >= WIN_SCORE) {
    gameState.winner = "Computer (The Evil AI)";
    gameState.isGameOver = true;
  }
}

function resetGame() {
  gameState.score.player = 0;
  gameState.score.computer = 0;
  gameState.winner = null;
  gameState.isGameOver = false;
}

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

function confirmQuit() {
  if (confirm("Are you sure you want to quit?")) {
    alert("Goodbye!");
    return true;
  }
  return false;
}

function roundMessage(outcome, playerSelection, computerSelection) {
  if (outcome === 1) {
    return `You Win this round! ${playerSelection} beats ${computerSelection}.`;
  }
  if (outcome === -1) {
    return `You Lose this round! ${computerSelection} beats ${playerSelection}.`;
  }
  return `It's a Draw! Both chose ${playerSelection}.`;
}

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

// ==========================================
// 1. TEAM INSTRUCTIONS (UX)
// ==========================================
alert("Welcome to Rock, Paper, Scissors vs. the Evil AI!\n\nIMPORTANT: Press F12 (or Right-Click -> Inspect -> Console) to see the game logs and scoreboard.\n\nFirst to 3 points wins. Press 'Cancel' at any time to quit.");
console.clear();

// ==========================================
// 2. COMPUTER LOGIC (Lefa)
// ==========================================
function computerPlay() {
  const randomNum = Math.floor(Math.random() * 3) + 1;
  if (randomNum === 1) return "rock";
  if (randomNum === 2) return "paper";
  return "scissors";
}

// ==========================================
// 3. GAME STATE (Karim's Proxy Logic)
// ==========================================
// We removed the 'new Proxy' to keep it simple and compatible with a single file, 
// but we kept the structure Karim built.
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
function playRound(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    return 0; // Draw
  }

  // Check if player wins
  if (gameState.winConditions[playerSelection] === computerSelection) {
    gameState.score.player++;
    return 1; // Player wins
  }

  // If not draw and not win, computer wins
  gameState.score.computer++;
  return -1; // Computer wins
}

// ==========================================
// 5. GAME LOOP & HELPERS (Tony)
// ==========================================
function game() {
  let playerOptions = ["rock", "paper", "scissors"]
  let feedback = "Game Started!";
  while (!gameState.isGameOver) {
    let playerSelection = prompt(`${feedback}\n\nScore -> You: ${gameState.score.player} | AI: ${gameState.score.computer}\n\nType rock, paper, or scissors:`);
    if (playerSelection === null) {
      if (confirm("Are you sure you want to quit?")) {
        alert("Goodbye!");
        return;
      }
      else {
        continue;
      }
    }
    else {
      playerSelection = playerSelection.trim().toLowerCase();

      // Valid input: Play the round
      if (playerOptions.includes(playerSelection)) {
        let computerSelection = computerPlay()
        let outcome = playRound(playerSelection, computerSelection);

        // Update feedback based on outcome (1 = win, 0 = draw, -1 = lose)
        if (outcome === 1) {
          feedback = `You Win this round! ${playerSelection} beats ${computerSelection}.`;
          console.log(feedback);
        } else if (outcome === -1) {
          feedback = `You Lose this round! ${computerSelection} beats ${playerSelection}.`;
          console.log(feedback);
        } else {
          feedback = `It's a Draw! Both chose ${playerSelection}.`;
          console.log(feedback);
        }

        // Check for game over (First to 3)
        if (gameState.score.player >= 3) {
          gameState.winner = "Player";
          gameState.isGameOver = true;
        } else if (gameState.score.computer >= 3) {
          gameState.winner = "Computer (The Evil AI)";
          gameState.isGameOver = true;
        }
      }
      else {
        alert("Invalid input! Please enter rock, paper, or scissors.");
        continue;
      }
    }
  }

  // Announce Final Winner
  const finalMessage = `GAME OVER!\n\nThe winner is: ${gameState.winner}\nFinal Score -> You: ${gameState.score.player} | AI: ${gameState.score.computer}`;
  alert(finalMessage);
  console.log(finalMessage);
};


// ==========================================
// 6. START THE GAME
// ==========================================
game();

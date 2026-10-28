// ==========================================
// 1. TEAM INSTRUCTIONS & INIT
// ==========================================
alert("Welcome to Rock, Paper, Scissors vs. the Evil AI!\n\nIMPORTANT: Press F12 (or Right-Click -> Inspect -> Console) to see the game logs and scoreboard.\n\nFirst to 3 points wins. Press 'Cancel' at any time to quit.");
console.clear();

let gameState = {
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
// 2. COMPUTER LOGIC
// ==========================================
function computerPlay() {
  const randomNum = Math.floor(Math.random() * 3) + 1;
  if (randomNum === 1) return "rock";
  if (randomNum === 2) return "paper";
  return "scissors";
}

// ==========================================
// 3. ROUND LOGIC
// ==========================================
function playRound(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) return 0;
  
  if (gameState.winConditions[playerSelection] === computerSelection) {
    gameState.score.player++;
    return 1;
  }
  
  gameState.score.computer++;
  return -1;
}

// ==========================================
// 4. PLAYER INPUT & VALIDATION
// ==========================================
function getPlayerChoice(feedback) {
  let playerOptions = ["rock", "paper", "scissors"];
  let isValid = false;
  let playerSelection;

  while (!isValid) {
    playerSelection = prompt(`${feedback}\n\nScore -> You: ${gameState.score.player} | AI: ${gameState.score.computer}\n\nType rock, paper, or scissors:`);
    
    if (playerSelection === null) {
      if (confirm("Are you sure you want to quit?")) {
        return null; 
      } else {
        continue; 
      }
    }

    playerSelection = playerSelection.trim().toLowerCase();

    if (playerOptions.includes(playerSelection)) {
      isValid = true; 
    } else {
      alert("Invalid input! Please enter rock, paper, or scissors.");
    }
  }

  return playerSelection; 
}

// ==========================================
// 5. MAIN GAME LOOP
// ==========================================
function game() {
  let feedback = "Game Started!";
  
  function generateFeedback(outcome, pChoice, cChoice) {
    if (outcome === 1) return `You Win this round! ${pChoice} beats ${cChoice}.`;
    if (outcome === -1) return `You Lose this round! ${cChoice} beats ${pChoice}.`;
    return `It's a Draw! Both chose ${pChoice}.`;
  }

  while (!gameState.isGameOver) {
    let playerSelection = getPlayerChoice(feedback);
    
    if (playerSelection === null) {
      alert("Goodbye!");
      return;
    }

    let computerSelection = computerPlay();
    let outcome = playRound(playerSelection, computerSelection);

    feedback = generateFeedback(outcome, playerSelection, computerSelection);
    console.log(feedback);

    if (gameState.score.player >= 3) {
      gameState.winner = "Player";
      gameState.isGameOver = true;
    } else if (gameState.score.computer >= 3) {
      gameState.winner = "Computer (The Evil AI)";
      gameState.isGameOver = true;
    }
  }

  const finalMessage = `GAME OVER!\n\nThe winner is: ${gameState.winner}\nFinal Score -> You: ${gameState.score.player} | AI: ${gameState.score.computer}`;
  alert(finalMessage);
  console.log(finalMessage);
}

// ==========================================
// 6. GAME INITIALIZATION & REPLAY
// ==========================================
function startGame() {
  let playAgain = true;

  while (playAgain) {
    gameState.score.player = 0;
    gameState.score.computer = 0;
    gameState.winner = null;
    gameState.isGameOver = false;
    console.clear();

    game();

    if (gameState.winner === null) break; 

    playAgain = confirm("Do you want to play again?");
  }
  
  if (!playAgain) {
    alert("Thanks for playing — you can close this tab.");
  }
}

startGame();
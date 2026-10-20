# rock-paper-scissors-game
JavaScript Only - Rock Paper Scissors
# Rock, Paper, Scissors 

A browser-based JavaScript game built as part of the Practicum assignment. 

## 🚀 How to Play
1. Open the `index.html` file in your browser.
2. **Important:** Press `F12` (or Right-Click -> Inspect -> Console) to open the Developer Console. The console acts as our live scoreboard.
3. Follow the pop-up prompts to play! First to 3 points wins. You can press "Cancel" at any time to exit safely.

## 🛡️ Special Cases & Edge Cases Handled
We designed our game to be robust. Here is how we handled unexpected user behavior:

*   **The "Cancel" Button:** If the user clicks "Cancel" on the prompt, the input returns `null`. We immediately check for this and exit the game safely without throwing a console error.
*   **Invalid Inputs (e.g., "Banana"):** If the user types something other than Rock, Paper, or Scissors, the game alerts them and uses `continue` to loop back. The computer does *not* make a move, and no points are awarded.
*   **Unnecessary Spaces & Capitalization:** We use `.trim()` and `.toLowerCase()` to ensure that inputs like `"  RoCk  "` are treated exactly the same as `"rock"`.
*   **Draws:** If both the player and the computer choose the same item, the round is logged as a draw, and neither score increments.

## 🧪 Unit Testing (Logic Verification)
To ensure our core logic is bulletproof, we included a custom testing suite (`tests.js`). 

To run the tests:
1. Open `script.js` and comment out the `game();` call at the bottom.
2. Open `tests.js` and uncomment the `runTests();` call.
3. Refresh the browser and open the Console (F12) to see the test results (Pass/Fail).

**Tests Included:**
*   Player Win conditions (Rock beats Scissors)
*   Player Lose conditions (Scissors loses to Rock)
*   Draw conditions
*   Case insensitivity (e.g., "ROCK" vs "rock")
*   `computerPlay()` validation (runs 100 times to ensure it never returns an invalid string).

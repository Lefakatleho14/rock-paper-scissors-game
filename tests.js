function runTests() {
    console.log("🧪 STARTING UNIT TESTS 🧪");
    let passed = 0;
    let failed = 0;

    function assertEquals(actual, expected, testName) {
        if (actual === expected) {
            console.log(`✅ PASS: ${testName}`);
            passed++;
        } else {
            console.error(`❌ FAIL: ${testName}. Expected "${expected}", got "${actual}"`);
            failed++;
        }
    }

    gameState.score.player = 0;
    gameState.score.computer = 0;

    assertEquals(playRound("rock", "scissors"), 1, "Player wins: Rock beats Scissors");
    assertEquals(playRound("scissors", "rock"), -1, "Player loses: Scissors loses to Rock");
    assertEquals(playRound("paper", "paper"), 0, "Draw: Paper vs Paper");

    assertEquals(gameState.score.player, 1, "Player score correctly incremented");
    assertEquals(gameState.score.computer, 1, "Computer score correctly incremented");

    let validChoices = ["rock", "paper", "scissors"];
    let isAlwaysValid = true;
    for (let i = 0; i < 100; i++) {
        let choice = computerPlay().toLowerCase();
        if (!validChoices.includes(choice)) {
            isAlwaysValid = false;
        }
    }
    assertEquals(isAlwaysValid, true, "computerPlay returns valid choice (100 iterations)");

    gameState.score.player = 0;
    gameState.score.computer = 0;
    gameState.isGameOver = false;

    console.log(`\n📊 TEST SUMMARY: ${passed} Passed, ${failed} Failed`);
}

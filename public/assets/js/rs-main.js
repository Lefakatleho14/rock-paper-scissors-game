/**
 * The main script for the Rock Paper Scissors game.
 * @author: Karim Aouaouda
 * @author: Lefa
 * @author: Tony 
 */

import { insensitiveCompare } from './helpers.js';

// 2. COMPUTER LOGIC (To be written by Lefa)
function computerPlay() {
    // Math.random() logic goes here
}

// 3. ROUND LOGIC (To be written by Karim)
function playRound(playerSelection, computerSelection) {
    // if/else logic comparing choices goes here
}

// 4. GAME LOOP (To be written by Tony)
function game() {
    // while loop, prompt(), score tracking goes here
}

// START THE GAME
// game(); 

if(insensitiveCompare("Hello", "hello"))
{
    alert("The strings are equal (case-insensitive comparison).");
}else{
    alert("The strings are not equal.");
}

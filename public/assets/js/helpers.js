/**
 * This file contains helper functions that are used throughout the assignment.
 * @author: Karim Aouaouda
 */


/**
 * Returns a random integer between min and max (inclusive).
 * @param {*} min 
 * @param {*} max 
 * @returns {number} A random integer between min and max (inclusive).
 */
export function getRandomInt(min, max)
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Returns a random choice from an array of choices.
 * @param {*} choices An array of possible choices.
 * @returns {string} A random choice from the array.
 */
export function getRandomChoice(choices) {
    const randomIndex = getRandomInt(0, choices.length - 1);
    return choices[randomIndex];
}


/**
 * Prompts the user for a string input.
 * @param {*} message The message to display to the user.
 * @param {*} minLength The minimum length of the input.
 * @param {*} maxLength The maximum length of the input.
 * @returns {string} The user's input.
 */
export function promptString(message, minLength, maxLength) {
    const input = prompt(message);
    if (input === null) {
        return null;
    }
    if (input.length < minLength || input.length > maxLength) {
        alert(`Input must be between ${minLength} and ${maxLength} characters long.`);
        return promptString(message, minLength, maxLength);
    }
    return input;
};

/**
 * Prompts the user for a choice from a list of options.
 * @param {*} message The message to display to the user.
 * @param {*} choices The list of possible choices.
 * @returns {string} The user's choice.
 */
export function promptChoice(message, choices) {
    const input = prompt(message);
    if (input === null) {
        return null;
    }

    if (!choices.includes(input)) {
        alert(`Input must be one of the following: ${choices.join(", ")}`);
        return promptChoice(message, choices);
    }
    return input;
}



/**
 * Compares two strings in a case-insensitive manner.
 * @param {*} str1 The first string to compare.
 * @param {*} str2 The second string to compare.
 * @returns {boolean} True if the strings are equal (case-insensitive), false otherwise.
 */
export function insensitiveCompare(str1, str2) {
    return str1.toLowerCase() === str2.toLowerCase();
}

/**
 * This file contains tests for the helper functions.
 * @author: Karim Aouaouda
 */

import { getRandomInt } from './helpers.js';

function assert(name, condition, message) {
    if (!condition) {
        throw new Error(message || "Assertion failed");
    }

    console.log("Test passed: " + name + " - " + message);
}

function testGetRandomInt() {
    console.log("Testing getRandomInt function...")
    assert("testGetRandomInt", getRandomInt(1, 10) >= 1 && getRandomInt(1, 10) <= 10, "getRandomInt should return a number between 1 and 10");

    assert("testGetRandomInt", Number.isInteger(getRandomInt(1, 10)), "getRandomInt should return a valid integer and not floting point number");
}






const tests = [
    testGetRandomInt,
]


let testResults = [];

for (const test of tests) {
    try {
        test();
        testResults.push({ name: test.name, status: "passed" });
    } catch (error) {
        console.error("Test failed: " + test.name + " - " + error.message);
        testResults.push({ name: test.name, status: "failed" });
    }
}

// show results summary in the console
console.log("Test Results Summary:");
console.table(testResults);
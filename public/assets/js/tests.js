/**
 * This file contains tests for the helper functions.
 * @author: Karim Aouaouda
 */

import { getRandomInt, getRandomChoice, insensitiveCompare } from './helpers.js';

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

function testGetRandomChoice() {
    console.log("Testing getRandomChoice function...")
    const choices = ["rock", "paper", "scissors"];
    const randomChoice = getRandomChoice(choices);
    assert("testGetRandomChoice", choices.includes(randomChoice), "getRandomChoice should return a valid choice");
}

function testInsensitiveCompare() {
    console.log("Testing insensitiveCompare function...")
    assert("testInsensitiveCompare", insensitiveCompare("Hello", "hello"), "insensitiveCompare should return true for case-insensitive comparison");
    assert("testInsensitiveCompare", !insensitiveCompare("Hello", "world"), "insensitiveCompare should return false for different strings");
}

const tests = [
    testGetRandomInt,
    testGetRandomChoice,
    testInsensitiveCompare
]


let testResults = [];

for (const test of tests) {
    try {
        test();
        testResults.push({ name: test.name, status: "passed" });
    } catch (error) {
        console.error("Test failed: " + test.name + " - " + error.message);
        testResults.push({ name: test.name, status: "failed", reason: error.message });
    }
}

// show results summary in the console
console.log("Test Results Summary:");
console.log("------------------------failed results--------------------------");
console.table(testResults.filter(result => result.status === "failed"), ["name", "status", "reason"]);

console.log("------------------------successful results--------------------------");
console.table(testResults.filter(result => result.status === "passed"));
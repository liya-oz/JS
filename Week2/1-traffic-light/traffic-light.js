"use strict";

/**
 * The `trafficLight` object is defined in function `main()` and was used as a parameter to other
 * functions.
 */

function getCurrentState(trafficLight) {
  switch (trafficLight.stateIndex) {
    case 0:
       return "green";
    case 1:
       return "orange";
    case 2:
       return "red";
    default:
       return "unknown state"; 
    }
  // This function returns the the color name based on the stateIndex.
  // object passed as a parameter.
}

function getNextStateIndex(trafficLight) { // I changed function name to match usage
  let nextIndex = trafficLight.stateIndex + 1;
  
  if (nextIndex >= trafficLight.possibleStates.length) {
    nextIndex = 0;
  }
  return nextIndex; // Return the next state index
}

function waitSync(secs) {
  const start = Date.now();
  while (Date.now() - start < secs * 1000) {
  }
}

function main() {
  const trafficLight = {
    possibleStates: ["green", "orange", "red"],
    stateIndex: 0,
  };

  for (let cycle = 0; cycle < 6; cycle++) {
    const currentState = getCurrentState(trafficLight);
    console.log(cycle, "The traffic light is now", currentState);

    waitSync(1);
    trafficLight.stateIndex = getNextStateIndex(trafficLight);
  }
}

main();

/**
 * The output should be:
0 The traffic light is now green
1 The traffic light is now orange
2 The traffic light is now red
3 The traffic light is now green
4 The traffic light is now orange
5 The traffic light is now red
*/


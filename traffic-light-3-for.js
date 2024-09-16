"use strict";

const trafficLight = {
  states: ["green", "orange", "red"],
  stateIndex: 0,
};
let cycle = 0;
let currentState = 0

console.log("The traffic light is on.");

for (cycle = 0; cycle < 2; cycle++) {

  for (currentState = 0; currentState < 3; currentState++) { 
    trafficLight.stateIndex = currentState;
    console.log("The traffic light is on " +trafficLight.states[trafficLight.stateIndex] + ".");  
  }
}

console.log("The traffic light is off.");
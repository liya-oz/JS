"use strict";

const trafficLight = {
  possibleStates: ["green", "orange", "red"],
  stateIndex: 0,
};
let cycle = 0;
while (cycle < 2) {
  const currentState = trafficLight.possibleStates[trafficLight.stateIndex];
  console.log("The traffic light is on", currentState);
  trafficLight.stateIndex++;
  if (trafficLight.stateIndex >= trafficLight.possibleStates.length) {
    trafficLight.stateIndex = 0;
    cycle++;  
  }
}
console.log("The traffic light made 2 cycles and stopped working.");
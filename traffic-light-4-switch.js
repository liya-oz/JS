"use strict";

const trafficLight = {
  states: ["green", "orange", "red"],
  stateIndex: 0,
};

let cycle = 0;
const stagesPerCycle = 3; 
const totalStages = 2 * stagesPerCycle;

console.log("The traffic light is on.");

function updateTrafficLight() {
  const currentState = trafficLight.states[trafficLight.stateIndex];
  switch(currentState) {
    case ('green'):
      console.log("The traffic light is on green.");
      break;
    case ('orange'):
      console.log("The traffic light is on orange.");
      break;
    case ('red'):
      console.log("The traffic light is on red.");
      break;
      default:
        console.log("Traffic light is not working");
    }

  trafficLight.stateIndex = (trafficLight.stateIndex + 1) % trafficLight.states.length;
  cycle++;

  if (cycle >= totalStages) {
    clearInterval(intervalId);
    console.log("The traffic light is off.");
  }
}

const intervalId = setInterval(updateTrafficLight, 1000);

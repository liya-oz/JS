import { modules, students, mentors, classes } from "./hyf.js";

/**
 * Tjebbe would like help to get a list of possible mentors for a module.
 * Fill in this function that finds all the mentors that can teach the given module.
 *
 * It should return an array of names. So something like:
 *  ['John', 'Mary']
 */
export const possibleMentorsForModule = (moduleName) => {
  return mentors
    .filter((mentor) => mentor.canTeach.includes(moduleName))
    .map((mentor) => mentor.name);
};
// You can uncomment out this line to try your function
console.log(possibleMentorsForModule('using-apis'));

/**
 * Tjebbe wants to make it even easier for himself.
 * Fill in this function that chooses a random mentor to teach the given module.
 *
 * It should return a single name.
 */
export const findMentorForModule = (moduleName) => {
  const possibleMentors = mentors.filter((mentor) =>
    mentor.canTeach.includes(moduleName),
  );

  //console.log('Possible Mentors:', possibleMentors);

  if (possibleMentors.length > 0) {
    const randomIndex = Math.floor(Math.random() * possibleMentors.length);
    return possibleMentors[randomIndex].name; 
  }
  
  return null;
};

console.log(findMentorForModule('javascript'));

 
import { getPeopleOfClass, studentsOfClass, mentorsOfClass, getActiveClasses } from "./1-find-mentors.js";

describe('Mentor Selection Functions', () => {
  test('possibleMentorsForModule should return a list of mentors for a given module', () => {
    const result = possibleMentorsForModule('javascript');
    expect(result).toEqual([ 'Stas', 'Rohan', 'Yash']); 
  });

  test('findMentorForModule should return a random mentor for a given module', () => {
    const randomMentor = findMentorForModule('using-apis');
    expect(['Stas', 'Andrej', 'Yash', 'Collin']).toContain(randomMentor);
  });

  test('findMentorForModule should return a random mentor from possible mentors', () => {
    const results = [];
    const randomMentor = findMentorForModule('javascript');
    expect(['Stas', 'Yash', 'Rohan']).toContain(randomMentor);
  });
});
const names = ['Harry Potter', 'Hermione Granger', 'Ron Weasley', 'Severus Snape'];

/*
names.push('sirvan monfared'); // adds to the end of array
names.unshift('sirvan monfared'); // adds as the first element of array
names.pop(); // removes and returns the last element
names.shift(); // removes and returns the last element

names[1] // returns the value of second element

names[2] = 'draco malfoy'; //changes the value of third element

names[10] // returns undefined

names[10] = 'albus'; //makes empty elements from 5 to 9 and then adds albus as the last element
*/

// --------------------------- SPLICE METHOD --------------------------- //
names.splice(0, 0, 'sirvan monfared'); // add one element as first item
names.splice(1, 0, 'some item'); // add one element from index 1 without deleting anything
names.splice(1, 0, 'one', 'two'); // add two elements from index 1 without deleting anything
names.splice(0, 1); // removes first element
names.splice(1, 3); // removes 3 element from index 1 (only first element remains)
names.splice(1); // removes all elements after index 1
names.splice(0) // removes all elements
const removedElements = names.splice(0, 2); // return removed elements as an array
names.splice(-1, 1); // removes last element
names.splice(-2, 1); // removes second to last element


// --------------------------- SLICE METHOD --------------------------- //
let names2 = names.splice(); // creates a real copy of array
names2 = names.splice(0, 2);  // returns a new array from index 0 to index 2 (names array wont be touched)
names2 = names.splice(1);  // returns a new array from index 1 to end of names array








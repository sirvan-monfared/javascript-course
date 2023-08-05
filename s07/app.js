const names = ['Harry Potter', 'Hermione Granger', 'Ron Weasley', 'Severus Snape'];

names.push('sirvan monfared'); // adds to the end of array
names.unshift('sirvan monfared'); // adds as the first element of array
names.pop(); // removes and returns the last element
names.shift(); // removes and returns the last element

names[1] // returns the value of second element

names[2] = 'draco malfoy'; //changes the value of third element

names[10] // returns undefined

names[10] = 'albus'; //makes empty elements from 5 to 9 and then adds albus as the last element

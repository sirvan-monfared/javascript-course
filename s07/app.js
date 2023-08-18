const names = ['harry', 'hermione', 'ron', 'albos', 'ron', 'malfoy', 'minevra'];

const newArray = Array.of(...new Set(names));

console.log(newArray);

// for(person of newNames) {
//     console.log(person);
// }
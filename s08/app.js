const movie = {
    title: 'Harray Potter',
    actors: ['Daniel Radcliffe', 'Emma Watson', 'Rupert Grint'],
    getCastNames() {
        this.actors.forEach((actor) => {
            console.log(actor + '--' + this.title);
        })
    }
};

// const movie = {
//     title: 'Harray Potter',
//     actors: ['Daniel Radcliffe', 'Emma Watson', 'Rupert Grint'],
//     getCastNames() {
//         this.actors.forEach(function (actor) {
//             console.log(this);
//             console.log(actor + '--' + this.title);
//         })
//     }
// };

movie.getCastNames();
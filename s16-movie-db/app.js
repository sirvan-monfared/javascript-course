import {LaraMovie} from './App/LaraMovie.js';

class App {
    static init() {
        axios.defaults.headers.common['accept'] = 'application/json';
        axios.defaults.headers.common['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlY2NiMmExMzFjMjQ0YzZiZWQxZjJmYjcxYTZmYTA2OSIsInN1YiI6IjY1MzI1MDA0NmY4ZDk1MDE0ZDZhOWI2ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.F-V3m--hOBNie0PkEttESH-oKdclDMI4BXtj6Pl9pyg';
        
        this.laraMovie = new LaraMovie();
    }
}

App.init();
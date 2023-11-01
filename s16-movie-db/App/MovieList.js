import { Loading } from "./Loading.js";

export class MovieList {
    constructor() {
        this.listElm = document.getElementById('movies-list');
        this.templateElm = document.getElementById('movie-list-item');

        this._listentToNewFetchedMovies();
    }

    render(movies) {
        Loading.show();
        
        this.listElm.innerHTML = '';
        
        movies.forEach((movie) => {

            const movieElm = document.importNode(this.templateElm.content, true);

            movieElm.querySelector('.media-box-title').innerText = movie.title;
            movieElm.querySelector('.rate').innerText = movie.vote_average.toFixed(1);
            movieElm.querySelector('.media-thumb').style.backgroundImage = `url(https://image.tmdb.org/t/p/w300/${movie.poster_path})`;

            this.listElm.append(movieElm);
        });

        Loading.hide();
    }

    _listentToNewFetchedMovies() {
        document.addEventListener('moviesFetched', (event) => {
            this.render(event.detail.movies);
        })
    }
}


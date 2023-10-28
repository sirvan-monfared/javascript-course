
class Search {
    constructor() {
        this._formElm = document.getElementById('filter-form');
        this._selectBoxes = this._formElm.querySelectorAll('select');
        this._clearBtn = this._formElm.querySelector('[data-clears-filter]');
        this._keywordElm = this._formElm.querySelector('#keyword-search');

        this._handleFilter();
    }

    _handleFilter() {
        this._selectBoxes.forEach((selectElm) => {
            selectElm.addEventListener('change', this._byAdvancedFilter.bind(this));
        })

        this._clearBtn.addEventListener('click', this._clearadvancedFilter.bind(this));

        this._keywordElm.addEventListener('keyup', this._byKeywordFilter.bind(this));
    }

    async _byKeywordFilter() {
        if (this._keywordElm.value.trim() === '') {
            this._byAdvancedFilter();
            return;
        }

        const movies = await this._keywordFilterRequest();

        this._fireMovieFetchedEvent(movies);
    }

    async _byAdvancedFilter() {
        const movies = await this._advancedFilterRequest();

        this._fireMovieFetchedEvent(movies);
    }

    async _keywordFilterRequest() {
        const {data: response} = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${this._keywordElm.value}`);

        return response.results;
    }

    async _advancedFilterRequest() {
        const queryStrings = this._convertParamsToQueryStrings(this._advancedFilterParams());

        const {data: response} = await axios.get(`https://api.themoviedb.org/3/discover/movie?${queryStrings}`);

        return response.results;
    }

    _advancedFilterParams() {
        const params = [];
        this._selectBoxes.forEach(selectElm => {

            if (selectElm.value.trim() === '') return;

            params.push({
                name: selectElm.name,
                value: selectElm.value
            })
        })

        return params;
    }

    _convertParamsToQueryStrings(params) {
        return params.map((paramObj) => {
            return `${paramObj.name}=${paramObj.value}`;
        }).join("&");
    }

    _fireMovieFetchedEvent(movies) {
        document.dispatchEvent(
            new CustomEvent('moviesFetched', {
                detail: {
                    movies: movies
                }
            })
        );
    }

    _clearadvancedFilter() {
        this._selectBoxes.forEach((selectElm) => {
            selectElm.value = '';
        })

        this._selectBoxes[0].dispatchEvent(new Event('change'));
    }
}


class YearsList {
    constructor() {
        this.selectElm = document.getElementById('filter-years');

        this.render();
    }

    loadYears() {
        const years = [];
        return new Promise((resolve) => {
            for(let i = 1980; i <= (new Date().getFullYear()); i++) {
                years.push(i);
            }
            resolve(years);
        })
    }

    async render() {
        const years = await this.loadYears();

        years.reverse().forEach((year) => {
            const optionElm = document.createElement('option');
            optionElm.value = year;
            optionElm.innerText = year;
            this.selectElm.append(optionElm);
        })
    }
}

class GenreList {
    constructor() {
        this.selectElm = document.getElementById('filter-genres');
        this.loadList();
    }

    fetch() {
        return axios.get('https://api.themoviedb.org/3/genre/movie/list?language=en');
    }

    async loadList() {
        const {data: response} = await this.fetch();

        this.render(response.genres);
    }

    render(genres) {
        genres.forEach((genre) => {
            const optionElm = document.createElement('option');
            optionElm.value = genre.id;
            optionElm.innerText = genre.name;
            this.selectElm.append(optionElm);
        });
    }
}



class MovieList {
    constructor() {
        this.listElm = document.getElementById('movies-list');
        this.templateElm = document.getElementById('movie-list-item');
        this.fetchTrends();

        this._listentToNewFetchedMovies();
    }

    async fetchTrends() {
        const {data: response} = await axios.get('https://api.themoviedb.org/3/trending/movie/week?language=en-US');

        this.render(response.results);
    }

    render(movies) {
        this.listElm.innerHTML = '';
        
        movies.forEach((movie) => {

            const movieElm = document.importNode(this.templateElm.content, true);

            movieElm.querySelector('.media-box-title').innerText = movie.title;
            movieElm.querySelector('.rate').innerText = movie.vote_average.toFixed(1);
            movieElm.querySelector('.media-thumb').style.backgroundImage = `url(https://image.tmdb.org/t/p/w300/${movie.poster_path})`;

            this.listElm.append(movieElm);
        })
    }

    _listentToNewFetchedMovies() {
        document.addEventListener('moviesFetched', (event) => {
            this.render(event.detail.movies);
        })
    }
}

class LaraMovie {
    constructor() {

        this.movieList = new MovieList();
        this.genereList = new GenreList();
        this.yearsList = new YearsList();
        this.search = new Search();
    }
}


class App {
    static init() {
        axios.defaults.headers.common['accept'] = 'application/json';
        axios.defaults.headers.common['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlY2NiMmExMzFjMjQ0YzZiZWQxZjJmYjcxYTZmYTA2OSIsInN1YiI6IjY1MzI1MDA0NmY4ZDk1MDE0ZDZhOWI2ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.F-V3m--hOBNie0PkEttESH-oKdclDMI4BXtj6Pl9pyg';
        
        this.laraMovie = new LaraMovie();
    }
}

App.init();
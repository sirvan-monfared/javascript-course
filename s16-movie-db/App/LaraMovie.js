import {GenreList} from './GenreList.js';
import {MovieList} from './MovieList.js';
import YearsList from './YearsList.js';
import { Search } from './Search.js';

export class LaraMovie {
    constructor() {

        this.movieList = new MovieList();
        this.genereList = new GenreList();
        this.yearsList = new YearsList();
        this.search = new Search();

        this.search.byAdvancedFilter();
    }
}
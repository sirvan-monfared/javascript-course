import {Loading} from './Loading.js';



export class Search {
    constructor() {
        this._formElm = document.getElementById('filter-form');
        this._selectBoxes = this._formElm.querySelectorAll('select');
        this._clearBtn = this._formElm.querySelector('[data-clears-filter]');
        this._keywordElm = this._formElm.querySelector('#keyword-search');

        this._debounceTimer = null;

        this._handleFilter();
    }

    async byAdvancedFilter() {
        const movies = await this._advancedFilterRequest();

        this._fireMovieFetchedEvent(movies);
    }

    _handleFilter() {
        this._selectBoxes.forEach((selectElm) => {
            selectElm.addEventListener('change', this.byAdvancedFilter.bind(this));
        })

        this._clearBtn.addEventListener('click', this._clearadvancedFilter.bind(this));

        this._keywordElm.addEventListener('keyup', () => {
            this._debounce(this._byKeywordFilter.bind(this));
        });
    }

    async _byKeywordFilter() {
        
        if (this._keywordElm.value.trim() === '') {
            this.byAdvancedFilter();
            return;
        }

        const movies = await this._keywordFilterRequest();

        this._fireMovieFetchedEvent(movies);
    }

    async _keywordFilterRequest() {
        Loading.show();
        
        const {data: response} = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${this._keywordElm.value}`);

        return response.results;
    }

    async _advancedFilterRequest() {
        Loading.show();
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
        import('./Clearing.js').then(module => {
            new module.Clearing();
        })

        this._selectBoxes.forEach((selectElm) => {
            selectElm.value = '';
        })

        this._selectBoxes[0].dispatchEvent(new Event('change'));
    }

    
    _setTimer (callback, delay = 500) {
        this._debounceTimer = setTimeout(() => {
            callback();
        }, delay);
    }

    _debounce(callback, delay) {
        clearTimeout(this._debounceTimer);
        this._setTimer(callback, delay);
    }
}
import { Genre } from './Genre.js'

export class GenreList extends Genre {
    constructor() {
        super();

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
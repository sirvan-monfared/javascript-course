export default class {
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
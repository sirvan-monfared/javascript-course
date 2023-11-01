export class Loading {
    static show() {
        const loading =  document.getElementById('loading');

        loading.classList.remove('hidden');
        loading.nextElementSibling.classList.add('hidden');
    }

    static hide() {
        const loading =  document.getElementById('loading');

        loading.classList.add('hidden');
        loading.nextElementSibling.classList.remove('hidden');
    }
}
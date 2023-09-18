const modalElm = document.getElementById('modal');

const removeFromCartHandler = (id) => {
    if (! cartItems.has(id)) {
        return;
    }
    
    cartItems.delete(id);

    document.getElementById(`cart-item-${id}`).remove();

    updateCartTotal();

    removeEmptyCartItem();

    updateCartNotification();
}


const hideModal = () => {
  modalElm.classList.add('hidden');
  const newButton = modalElm.querySelector('.modal-add-to-cart').cloneNode(true);
  modalElm.querySelector('.modal-add-to-cart').remove();

  modalElm.querySelector('.book-price').before(newButton);
}

const viewDetailsHandler = (id) => {
    modalElm.classList.remove('hidden');

    const foundBook = books.find((book) => book.id === id);

    const modalContentElm = modalElm.querySelector('#modal-content');

    modalContentElm.querySelector('img').src = foundBook.imageUrl;
    modalContentElm.querySelector('h2').innerText = foundBook.title;
    modalContentElm.querySelector('p').innerText = `By: ${foundBook.author}`;
    modalContentElm.querySelector('.book-description').innerText = foundBook.description;
    modalContentElm.querySelector('.book-price').innerHTML = foundBook.showPrice();
    modalContentElm.querySelector('.modal-add-to-cart').addEventListener('click', addToCartHandler.bind(null, foundBook.id));

};



modalElm.querySelector('#modal-close').addEventListener('click', hideModal)



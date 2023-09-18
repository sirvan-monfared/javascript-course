

const cartItemsListElm = document.getElementById('cart-items-list');
const cartEmptyElm = document.getElementById('empty-cart');
const cartTotalElm = document.getElementById('cart-total');
const cartNotification = document.getElementById('cart-notification');
const modalElm = document.getElementById('modal');



const cartItems = new Set([]);

{
  id: 3456436436,
  quantity: 3
},
{
  id: 3456436436,
  quantity: 2
}

const fillDummyBooks = () => {
  
};

const removeEmptyCartItem = () => {
   if (! cartItems.size) {
        cartEmptyElm.classList.remove('hidden');
        cartItemsListElm.classList.add('hidden');
   } else {
        cartEmptyElm.classList.add('hidden');
        cartItemsListElm.classList.remove('hidden');
   }
}

const updateCartNotification = () => {
    cartNotification.innerText = cartItems.size
    if (cartItems.size) {
        cartNotification.classList.remove('hidden');
    } else {
        cartNotification.classList.add('hidden');
    }
}

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

const updateCartTotal = () => {
    // cartTotalElm
    const totalPrice = Array.from(cartItems).reduce((prevValue, book_id) => {
        return prevValue + books.find(item => item.id === book_id).price
    }, 0);

    cartTotalElm.innerText = `$${totalPrice}`;
}

const addToCartHandler = (id) => {

    if (cartItems.has(id)) return;

    cartItems.add(id);

    removeEmptyCartItem();

    const foundBook = books.find(book => book.id === id);

    const newCartItem = document.createElement("li");
    newCartItem.className = "flex items-center justify-between gap-4 truncate h-14  cursor-pointer hover:bg-gray-100";
    newCartItem.id = `cart-item-${foundBook.id}`;
    newCartItem.innerHTML = `
        <div class="w-10" style="flex-shrink: 0">
            <img class=" h-14 rounded-md" src="${foundBook.imageUrl}">
        </div>
        <div class="flex flex-col justify-between items-start h-full">
            <p class="truncate">${foundBook.title}</p>
            <p class="font-semibold">$${foundBook.price}</p>
        </div>
        <button class="text-red-500 px-2 h-full cursor-pointer">x</button>
    `;

    newCartItem.addEventListener('click', removeFromCartHandler.bind(null, foundBook.id));

    updateCartTotal();
    updateCartNotification();

    cartItemsListElm.firstElementChild.append(newCartItem);
};

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

const generateBookHTML = (book) => {


 

  

  listUI.append(newElm);
};

const addBook = (title, author, price, prevPrice, description, imageUrl) => {
 

  books.push(newBook);
  generateBookHTML(newBook);
};

fillDummyBooks();



modalElm.querySelector('#modal-close').addEventListener('click', hideModal)



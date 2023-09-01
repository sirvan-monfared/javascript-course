const listWrapper = document.getElementById("list-wrapper");
const cartIcon = document.getElementById('cart-icon');
const cartTotal = document.getElementById('cart-total');
const cartNotificationElm = document.getElementById('cart-notification');
const cartItemsListElm = document.getElementById('cart-items-list');
const emptyCartElm = document.getElementById('empty-cart');
const modalElm = document.getElementById('modal');

const books = [];
const cartItems = new Set([]);

const viewButtonHandler = (id) => {

    const foundBook = books.find(book => book.id === id);

    const modalContentElm = document.getElementById('modal-content');

    modalContentElm.querySelector('img').src = foundBook.imageURL;
    modalContentElm.querySelector('h2').innerText = foundBook.title;
    modalContentElm.querySelector('p').innerText = foundBook.author;
    modalContentElm.querySelector('.book-summary').innerHTML = foundBook.summary;
    modalContentElm.querySelector('.book-price').innerHTML = foundBook.showPrice();

    modalContentElm.querySelector('button').addEventListener('click', addToCartHandler.bind(null, id));

    modalElm.classList.remove('hidden');
};

const updateCartEmptyStatus = () => {
    if (cartItems.size) {
        cartItemsListElm.classList.remove('hidden');
        emptyCartElm.classList.add('hidden');
    } else {
        cartItemsListElm.classList.add('hidden');
        emptyCartElm.classList.remove('hidden');
    }
}

const removeFromCarthandler = (id) => {

    if (! cartItems.has(id)) return;

    cartItems.delete(id);

    document.getElementById(`cart-item-${id}`).remove();

    updateCartTotalPrice();
    updateCartNotification();
    updateCartEmptyStatus();
}

const updateCartTotalPrice = () => {
    const totalPrice = Array.from(cartItems).reduce((prevValue, book_id) => {
        return prevValue + books.find(book => book.id === book_id).price
    }, 0);

    cartTotal.innerText = `$${totalPrice}`;
}

const updateCartNotification = () => {
    cartNotificationElm.innerText = cartItems.size;
    if(cartItems.size) {
        cartNotificationElm.classList.remove('hidden');
    } else {
        cartNotificationElm.classList.add('hidden');
    }
}

const addToCartHandler = (id) => {

    console.log('called' + id);

    if (cartItems.has(id)) {
        return;
    }

    cartItems.add(id);

    updateCartEmptyStatus();
    
    const foundBook = books.find((item) => item.id === id);

    
    const newCartElm = document.createElement('li');
    newCartElm.className = 'flex items-center justify-between gap-4 truncate h-14  cursor-pointer hover:bg-gray-100';
    newCartElm.id = `cart-item-${id}`;

    newCartElm.innerHTML = `
        <img class="w-14 h-14 rounded-md" src="${foundBook.imageURL}">
        <div class="flex flex-col justify-between items-start h-full truncate">
            <p class="truncate">${foundBook.title}</p>
            <p class="font-semibold">$${foundBook.price}</p>
        </div>
        <button class="text-red-500 px-2 h-full cursor-pointer">x</button>
    `;

    newCartElm.addEventListener('click', removeFromCarthandler.bind(null, foundBook.id));

    cartItemsListElm.firstElementChild.append(newCartElm);

    updateCartTotalPrice();

    updateCartNotification();
};

const generateHTMLCodeForBook = (book) => {
    const newElm = document.createElement("div");
    newElm.className = "bg-white p-4 shadow-md rounded-lg";
    newElm.innerHTML = `
            <div class="">
                <img src="${book.imageURL}" alt="Book Title" class="w-full h-full object-cover mb-4">
                <h3 class="text-xl font-semibold">${book.title}</h3>
                <p class="text-gray-600">${book.author}</p>
                <p class="text-blue-500 font-semibold mt-2 text-blue-500"><span>${book.showPrice()}</span></p>
                <div class="flex items-center justify-between text-xs gap-2" id="book-footer-${book.id}">
                </div>
            </div>
    `;

    const bookFooter = newElm.querySelector(`#book-footer-${book.id}`);

    const viewButtonElm = document.createElement("a");
    viewButtonElm.className =
        "mt-4 px-4 py-2 bg-gray-500 text-white hover:bg-gray-400 rounded-lg cursor-pointer";
    viewButtonElm.textContent = "View Details";

    const addToCartElm = viewButtonElm.cloneNode(true);
    addToCartElm.textContent = "Add to Cart";
    addToCartElm.classList.add("bg-blue-500", "hover:bg-blue-400");

    bookFooter.append(viewButtonElm);
    bookFooter.append(addToCartElm);

    viewButtonElm.addEventListener(
        "click",
        viewButtonHandler.bind(null, book.id)
    );

    addToCartElm.addEventListener(
        "click", 
        addToCartHandler.bind(null, book.id)
    );

    listWrapper.append(newElm);
};

const addNewBook = (title, author, prevPrice, price, summary, imageURL) => {
    const newBook = {
        id: Math.ceil(new Date().getTime().toString() * Math.random()),
        title,
        author,
        prevPrice,
        price,
        summary,
        imageURL,
        showPrice() {
            if (! prevPrice) {
                return `<span class="text-blue-500">$${this.price}</span>`;
            }

            return `<span class="line-through text-red-500">$${this.prevPrice}</span> <span class="text-blue-500">$${this.price}</span>`;
        }
    };

    books.push(newBook);

    generateHTMLCodeForBook(newBook);
};

const addDummyBooks = () => {
    addNewBook(
        "Harry Potter and the Philosophers Stone",
        "J. K. Rowling",
        null,
        60,
        "The book is about 11 year old Harry Potter, who receives a letter saying that he is invited to attend Hogwarts, school of witchcraft and wizardry. He then learns that a powerful wizard and his minions are after the sorcerer's stone that will make this evil wizard immortal and undefeatable.",
        "https://res.cloudinary.com/bloomsbury-atlas/image/upload/w_568,c_scale/jackets/9781408855652.jpg"
    );

    addNewBook(
        "Harry Potter and the Chamber of Secrets",
        "J. K. Rowling",
        120,
        55,
        'The plot follows Harrys second year at Hogwarts School of Witchcraft and Wizardry, during which a series of messages on the walls of the schools corridors warn that the "Chamber of Secrets" has been opened and that the "heir of Slytherin" would kill all pupils who do not come from all-magical families.',
        "https://m.media-amazon.com/images/I/81S0LnPGGUL._AC_UF894,1000_QL80_.jpg"
    );

    addNewBook(
        "Harry Potter and the Prisoner of Azkaban",
        "J. K. Rowling",
        140,
        65,
        "Harry Potter & The Prisoner of Azkaban is about Harry's 3rd year at Hogwarts. Along with friends Ron and Hermione, Harry investigates the case of Sirius Black, an escaped prisoner from Azkaban, the wizard prison.",
        "https://m.media-amazon.com/images/I/81f7bXC-tTL._AC_UF894,1000_QL80_.jpg"
    );

    addNewBook(
        "Harry Potter and the Goblet of Fire",
        "J. K. Rowling",
        130,
        70,
        `It follows Harry Potter, a wizard in his fourth year at Hogwarts School of Witchcraft and Wizardry, and the mystery surrounding the entry of Harry's name into the Triwizard Tournament, in which he is forced to compete. The book was published in the United Kingdom by Bloomsbury and in the United States by Scholastic.`,
        "https://m.media-amazon.com/images/I/810jKiNChxL._AC_UF894,1000_QL80_.jpg"
    );

    addNewBook(
        "Harry Potter and the Order of the Phoenix",
        "J. K. Rowling",
        null,
        80,
        `Harry Potter and the Order of the Phoenix is a fantasy novel written by British author J. K. Rowling and the fifth novel in the Harry Potter series. It follows Harry Potter's struggles through his fifth year at Hogwarts School of Witchcraft and Wizardry, including the surreptitious return of the antagonist Lord Voldemort, O.W.L. exams, and an obstructive Ministry of Magic. The novel was published on 21 June 2003 by Bloomsbury in the United Kingdom, Scholastic in the United States, and Raincoast in Canada. It sold five million copies in the first 24 hours of publication`,
        "https://m.media-amazon.com/images/I/81a4yXpXjnL._AC_UF1000,1000_QL80_.jpg"
    );

    addNewBook(
        "Harry Potter and the Half-Blood Prince",
        "J. K. Rowling",
        120,
        80,
        `Harry Potter and the Half-Blood Prince is a fantasy novel written by British author J. K. Rowling and the sixth and penultimate novel in the Harry Potter series. Set during Harry Potter's sixth year at Hogwarts, the novel explores the past of the boy wizard's nemesis, Lord Voldemort, and Harry's preparations for the final battle against Voldemort alongside his headmaster and mentor Albus Dumbledore.
                The book was published in the United Kingdom by Bloomsbury and in the United States by Scholastic on 16 July 2005, as well as in several other countries. It sold almost seven million copies in the first 24 hours after its release,[1] a record eventually broken by its sequel, Harry Potter and the Deathly Hallows.[2] There were many controversies before and after it was published, including the right-to-read copies delivered before the release date in Canada. Reception to the novel was generally positive, and it won several awards and honours, including the 2006 British Book of the Year award.`,
        "https://m.media-amazon.com/images/I/81p2+4nYtkL._AC_UF894,1000_QL80_.jpg"
    );

    addNewBook(
        "Harry Potter and the Deathly Hallows",
        "J. K. Rowling",
        null,
        80,
        `Harry Potter and the Deathly Hallows is a fantasy novel written by British author J. K. Rowling and the seventh and final novel in the Harry Potter series. It was released on 21 July 2007 in the United Kingdom by Bloomsbury Publishing, in the United States by Scholastic, and in Canada by Raincoast Books. The novel chronicles the events directly following Harry Potter and the Half-Blood Prince (2005) and the final confrontation between the wizards Harry Potter and Lord Voldemort.
            
                Deathly Hallows shattered sales records upon release, surpassing marks set by previous titles of the Harry Potter series. It holds the Guinness World Record for most novels sold within 24 hours of release, with 8.3 million sold in the US and 2.65 million in the UK.[1][2] Reception to the book was generally positive, and the book won the 2008 Colorado Blue Spruce Book Award, and the American Library Association named it the "Best Book for Young Adults". A play, Harry Potter and the Cursed Child, was written by Jack Thorne, and based on an original story written by J. K. Rowling, John Tiffany, and Thorne, premiering at the Palace Theatre in London on 30 July 2016. Rowling has referred to the play as "the eighth Harry Potter story", and is set nineteen years after the events of the Deathly Hallows, effectively picking up where the epilogue of the seventh book ended.
                `,
        "https://m.media-amazon.com/images/I/81Whkax7IGL._AC_UF894,1000_QL80_.jpg"
    );
};

addDummyBooks();


cartIcon.addEventListener('click', () => {
    cartIcon.nextElementSibling.classList.toggle('hidden');
})


modalElm.querySelector('button').addEventListener('click', () => {
    modalElm.classList.add('hidden');



    const modalAddToCartElm = modalElm.querySelector('.modal-add-to-cart');

    const newButton = modalAddToCartElm.cloneNode(true);

    modalAddToCartElm.replaceWith(newButton);
});
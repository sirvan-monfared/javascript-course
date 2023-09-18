class Book {
    constructor(title, author, prevPrice, price, imageUrl, description) {
        this.id = Math.ceil(new Date().getTime().toString() * Math.random())
        this.title = title;
        this.author = author;
        this.prevPrice = prevPrice;
        this.price = price;
        this.imageUrl = imageUrl;
        this.description = description;
    }

    showPrice() {
        if (!this.prevPrice) {
            return `<span>$${this.price}</span>`;
        }

        return `<span class="line-through text-red-500">$${this.prevPrice}</span> <span>$${this.price}</span>`;
    }

    render() {
        const newElm = document.createElement("div");
        newElm.className = "bg-white p-4 shadow-md rounded-lg";
        newElm.innerHTML = `
            <div class="">
                <img src="${this.imageUrl}" alt="Book Title" class="w-full h-full object-cover mb-4">
                <h3 class="text-xl font-semibold">${this.title}</h3>
                <p class="text-gray-600">${this.author}</p>
                <p class="text-blue-500 font-semibold mt-2 text-blue-500">${this.showPrice()}</p>
                <div class="flex items-center justify-between text-xs gap-2" id="book-footer-${this.id}"></div>
            </div>
        `;

        const newBookFooter = newElm.querySelector(`#book-footer-${this.id}`);

        const viewDetailsButton = document.createElement("a");
        viewDetailsButton.className =
          "mt-4 px-4 py-2 bg-gray-500 text-white hover:bg-gray-400 rounded-lg cursor-pointer";
        viewDetailsButton.textContent = "View Details";
        newBookFooter.append(viewDetailsButton);
      
        const addToCartButton = viewDetailsButton.cloneNode(true);
        addToCartButton.textContent = "Add to Cart";
        addToCartButton.classList.add("bg-blue-500", "hover:bg-blue-400");
        newBookFooter.append(addToCartButton);

        viewDetailsButton.addEventListener(
            "click",
            this.viewDetailsHandler
        );
        
        addToCartButton.addEventListener(
            "click",
            this.addToCartHandler.bind(this)
        );

        return newElm;
    }

    viewDetailsHandler() {
        console.log('view details');
    }

    addToCartHandler() {
        App.getCart().add(this.id);
    }
}


class BookList {
    constructor() {
        this.books = [];
        this.listUI = document.getElementById("list-wrapper");
    }

    add(title, author, prevPrice, price, description, imageUrl) {
        const newBook = new Book(title, author, prevPrice, price, imageUrl, description);

        this.books.push(newBook);

        this.listUI.append(newBook.render());
    }

    find(id) {
        return this.books.find(item => item.id === id);
    }
}

class CartItem {
    constructor(id, quantity) {
        this.id = id;
        this.quantity = quantity;
    }

    findBook(id) {
        return App.getBookList().find(id);
    }

    htmlElementId() {
        return `cart-item-${this.id}`;
    }

    render(id) {

        const book = this.findBook(id);

        const newCartItem = document.createElement("li");
        newCartItem.className = "flex items-center justify-between gap-4 truncate h-14";
        newCartItem.id = this.htmlElementId();
        newCartItem.innerHTML = `
            <div class="w-10" style="flex-shrink: 0">
                <img class=" h-14 rounded-md" src="${book.imageUrl}">
            </div>
            <div class="flex flex-col justify-between items-start h-full">
                <p class="truncate">${book.title}</p>

                <div class="flex items-center justift-start w-full">
                    <p class="font-semibold">$${book.price}</p>

                    <div class="flex items-center px-5 gap-2">
                        <span class="quantity-decrease bg-blue-500 text-white rounded-md py-1 px-2 cursor-pointer text-sm">-</span>
                        <span class="quantity">1</span>
                        <span class="quantity-increase bg-blue-500 text-white rounded-md py-1 px-2 cursor-pointer text-sm">+</span>
                    </div>
                </div>
            </div>
        `;

        newCartItem.querySelector('.quantity-decrease').addEventListener('click', this.decreaseQuantity.bind(this))

        newCartItem.querySelector('.quantity-increase').addEventListener('click', this.increaseQuantity.bind(this))



        return newCartItem;
    }

    decreaseQuantity() {
        this.quantity--;

        if (this.quantity < 1) {
            App.getCart().remove(this.id);
            return;
        }

        this.updateQuantityUI();

        App.getCart().updateCartTotal();
    }

    increaseQuantity() {
        this.quantity++;

        this.updateQuantityUI();

        App.getCart().updateCartTotal();
    }

    updateQuantityUI() {
        const cartItemElm = document.getElementById(this.htmlElementId());
        cartItemElm.querySelector('.quantity').innerText = this.quantity;
    }

}

class Cart {
    constructor() {
        this.items = [];

        this.cartEmptyElm = document.getElementById('empty-cart');
        this.cartItemsListElm = document.getElementById('cart-items-list');
        this.cartTotalElm = document.getElementById('cart-total');
        this.cartNotification = document.getElementById('cart-notification');
    }

    has(id) {
        return this.items.find(item => item.id === id);
    }

    add(id) {

        if (this.has(id)) {
            return;
        }

        const cartItem = new CartItem(id, 1);

        this.items.push(cartItem);

        this.removeEmptyCartBox();

        const cartItemElm = cartItem.render(id);

        this.cartItemsListElm.firstElementChild.append(cartItemElm);

        this.updateCartTotal();
        this.updateCartNotification();
    }

    remove(id) {
        if (! this.has(id)) {
            return;
        }

        const index = this.items.findIndex(item => item.id === id);

        document.getElementById(this.items[index].htmlElementId()).remove();

        this.items.splice(index, 1);

        this.updateCartTotal();
        this.updateCartNotification();
        this.removeEmptyCartBox();
    }

    updateCartTotal() {
        const totalPrice = this.items.reduce((prevValue, cartItem) => {
            return prevValue + (App.getBookList().find(cartItem.id).price * cartItem.quantity)
        }, 0);
    
        this.cartTotalElm.innerText = `$${totalPrice}`;
    }

    updateCartNotification() {
        this.cartNotification.innerText = this.items.length;

        if (this.items.length) {
            this.cartNotification.classList.remove('hidden');
        } else {
            this.cartNotification.classList.add('hidden');
        }
    }

    removeEmptyCartBox() {
        if (! this.items.length) {
            this.cartEmptyElm.classList.remove('hidden');
            this.cartItemsListElm.classList.add('hidden');
       } else {
            this.cartEmptyElm.classList.add('hidden');
            this.cartItemsListElm.classList.remove('hidden');
       }
    }
}

class Shop {
    constructor() {
        this.bookList = new BookList();
        this.cart = new Cart();


        this.handleUiInteractions();
        this.generateDemoBooks();
    }

    handleUiInteractions() {
        const cartIconElm = document.getElementById("cart-icon");

        cartIconElm.addEventListener("click", () => {
            cartIconElm.nextElementSibling.classList.toggle("hidden");
        });
    }

    generateDemoBooks() {
        this.bookList.add(
            "Harry Potter and the Philosophers Stone",
            "J. K. Rowling",
            60,
            null,
            "The book is about 11 year old Harry Potter, who receives a letter saying that he is invited to attend Hogwarts, school of witchcraft and wizardry. He then learns that a powerful wizard and his minions are after the sorcerer's stone that will make this evil wizard immortal and undefeatable.",
            "images/9781408855652.jpg"
          );
        
          this.bookList.add(
            "Harry Potter and the Chamber of Secrets",
            "J. K. Rowling",
            55,
            120,
            'The plot follows Harrys second year at Hogwarts School of Witchcraft and Wizardry, during which a series of messages on the walls of the schools corridors warn that the "Chamber of Secrets" has been opened and that the "heir of Slytherin" would kill all pupils who do not come from all-magical families.',
            "images/81S0LnPGGUL._AC_UF894,1000_QL80_.jpg"
          );
        
          this.bookList.add(
            "Harry Potter and the Prisoner of Azkaban",
            "J. K. Rowling",
            65,
            140,
            'Harry Potter & The Prisoner of Azkaban is about Harry\'s 3rd year at Hogwarts. Along with friends Ron and Hermione, Harry investigates the case of Sirius Black, an escaped prisoner from Azkaban, the wizard prison.',
            "images/81f7bXC-tTL._AC_UF894,1000_QL80_.jpg"
          );
        
          this.bookList.add(
            "Harry Potter and the Goblet of Fire",
            "J. K. Rowling",
            70,
            130,
            `It follows Harry Potter, a wizard in his fourth year at Hogwarts School of Witchcraft and Wizardry, and the mystery surrounding the entry of Harry's name into the Triwizard Tournament, in which he is forced to compete. The book was published in the United Kingdom by Bloomsbury and in the United States by Scholastic.`,
            "images/810jKiNChxL._AC_UF894,1000_QL80_.jpg"
          );
          this.bookList.add(
            "Harry Potter and the Order of the Phoenix",
            "J. K. Rowling",
            80,
            null,
            `Harry Potter and the Order of the Phoenix is a fantasy novel written by British author J. K. Rowling and the fifth novel in the Harry Potter series. It follows Harry Potter's struggles through his fifth year at Hogwarts School of Witchcraft and Wizardry, including the surreptitious return of the antagonist Lord Voldemort, O.W.L. exams, and an obstructive Ministry of Magic. The novel was published on 21 June 2003 by Bloomsbury in the United Kingdom, Scholastic in the United States, and Raincoast in Canada. It sold five million copies in the first 24 hours of publication`,
            "images/81a4yXpXjnL._AC_UF1000,1000_QL80_.jpg"
          );
          this.bookList.add(
            "Harry Potter and the Half-Blood Prince",
            "J. K. Rowling",
            80,
            120,
            `Harry Potter and the Half-Blood Prince is a fantasy novel written by British author J. K. Rowling and the sixth and penultimate novel in the Harry Potter series. Set during Harry Potter's sixth year at Hogwarts, the novel explores the past of the boy wizard's nemesis, Lord Voldemort, and Harry's preparations for the final battle against Voldemort alongside his headmaster and mentor Albus Dumbledore.
            The book was published in the United Kingdom by Bloomsbury and in the United States by Scholastic on 16 July 2005, as well as in several other countries. It sold almost seven million copies in the first 24 hours after its release,[1] a record eventually broken by its sequel, Harry Potter and the Deathly Hallows.[2] There were many controversies before and after it was published, including the right-to-read copies delivered before the release date in Canada. Reception to the novel was generally positive, and it won several awards and honours, including the 2006 British Book of the Year award.`,
            "images/81p2+4nYtkL._AC_UF894,1000_QL80_.jpg"
          );
          this.bookList.add(
            "Harry Potter and the Deathly Hallows",
            "J. K. Rowling",
            80,
            null,
            `Harry Potter and the Deathly Hallows is a fantasy novel written by British author J. K. Rowling and the seventh and final novel in the Harry Potter series. It was released on 21 July 2007 in the United Kingdom by Bloomsbury Publishing, in the United States by Scholastic, and in Canada by Raincoast Books. The novel chronicles the events directly following Harry Potter and the Half-Blood Prince (2005) and the final confrontation between the wizards Harry Potter and Lord Voldemort.
        
            Deathly Hallows shattered sales records upon release, surpassing marks set by previous titles of the Harry Potter series. It holds the Guinness World Record for most novels sold within 24 hours of release, with 8.3 million sold in the US and 2.65 million in the UK.[1][2] Reception to the book was generally positive, and the book won the 2008 Colorado Blue Spruce Book Award, and the American Library Association named it the "Best Book for Young Adults". A play, Harry Potter and the Cursed Child, was written by Jack Thorne, and based on an original story written by J. K. Rowling, John Tiffany, and Thorne, premiering at the Palace Theatre in London on 30 July 2016. Rowling has referred to the play as "the eighth Harry Potter story", and is set nineteen years after the events of the Deathly Hallows, effectively picking up where the epilogue of the seventh book ended.`,
            "images/81Whkax7IGL._AC_UF894,1000_QL80_.jpg"
          );
    }
}


class App {
    static init() {
        this.shop = new Shop();
    }

    static getCart() {
        return this.shop.cart;
    }

    static getBookList() {
        return this.shop.bookList;
    }
}

App.init();
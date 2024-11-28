/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Menu show */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/* Menu hidden */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== CHANGE BACKGROUND HEADER ===============*/
const scrollHeader = () =>{
    const header = document.getElementById('header')
    // Add a class if the bottom offset is greater than 50 of the viewport
    this.scrollY >= 50 ? header.classList.add('scroll-header') 
                       : header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== TESTIMONIAL SWIPER ===============*/
let testimonialSwiper = new Swiper(".testimonial-swiper", {
    spaceBetween: 30,
    loop: 'true',

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

/*=============== NEW SWIPER ===============*/
let newSwiper = new Swiper(".new-swiper", {
    spaceBetween: 24,
    loop: 'true',

    breakpoints: {
        576: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 4,
        },
    },
});

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')
    
const scrollActive = () =>{
  	const scrollDown = window.scrollY

	sections.forEach(current =>{
		const sectionHeight = current.offsetHeight,
			  sectionTop = current.offsetTop - 58,
			  sectionId = current.getAttribute('id'),
			  sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

		if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
			sectionsClass.classList.add('active-link')
		}else{
			sectionsClass.classList.remove('active-link')
		}                                                    
	})
}
window.addEventListener('scroll', scrollActive)

/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () =>{
	const scrollUp = document.getElementById('scroll-up')
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
	this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
						: scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SHOW CART ===============*/
const cart = document.getElementById('cart'),
      cartShop = document.getElementById('cart-shop'),
      cartClose = document.getElementById('cart-close')

/*===== CART SHOW =====*/
/* Validate if constant exists */
if(cartShop){
    cartShop.addEventListener('click', () =>{
        cart.classList.add('show-cart')
    })
}

/*===== CART HIDDEN =====*/
/* Validate if constant exists */
if(cartClose){
    cartClose.addEventListener('click', () =>{
        cart.classList.remove('show-cart')
    })
}

/*=============== DARK LIGHT THEME ===============*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'bx-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx bx-moon' : 'bx bx-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'bx bx-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

// ========================= BUTTONS AND CART FUNC               ======================================================


document.addEventListener("DOMContentLoaded", () => {
    const addToCartButtons = document.querySelectorAll(".featured__button"); // Select all "ADD TO CART" buttons
    const cartCountElement = document.querySelector("#cart-shop span"); // Cart count element
    const cartItemsContainer = document.getElementById("cart-items"); // Cart items container

    let cartCount = 0;

    addToCartButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            // Get the product details
            const product = button.parentElement;
            const productImage = product.querySelector(".featured__img").src;
            const productTitle = product.querySelector(".featured__title").textContent;
            const productPrice = product.querySelector(".featured__price").textContent;

            // Increment cart count
            cartCount++;
            cartCountElement.textContent = cartCount;

            // Add product details to the cart
            const cartItem = document.createElement("li");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <img src="${productImage}" alt="${productTitle}" class="cart-item__img">
                <div class="cart-item__details">
                    <h4>${productTitle}</h4>
                    <span>${productPrice}</span>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const cartContainer = document.querySelector(".cart__container");
    const cartPricesItem = document.querySelector(".cart__prices-item");
    const cartPricesTotal = document.querySelector(".cart__prices-total");
    const cartShop = document.querySelector("#cart-shop span");
    const addToCartButtons = document.querySelectorAll(".featured__button");
    const emptyMessage = "YOUR BASKET IS EMPTY";
    
    let cart = []; // Array to store cart items

    // Function to update cart UI
    function updateCartUI() {
        cartContainer.innerHTML = ""; // Clear current cart items
        let totalItems = 0;
        let totalPrice = 0;

        cart.forEach(item => {
            totalItems += item.quantity;
            totalPrice += item.price * item.quantity;

            const cartCard = document.createElement("article");
            cartCard.classList.add("cart__card");

            cartCard.innerHTML = `
                <div class="cart__box">
                    <img src="${item.image}" alt="" class="cart__img">
                </div>
                <div class="cart__details">
                    <h3 class="cart__title">${item.name}</h3>
                    <span class="cart__price">$${(item.price * item.quantity).toFixed(2)}</span>
                    <div class="cart__amount">
                        <div class="cart__amount-content">
                            <span class="cart__amount-box">
                                <i class='bx bx-minus' data-id="${item.id}"></i>
                            </span>
                            <span class="cart__amount-number">${item.quantity}</span>
                            <span class="cart__amount-box">
                                <i class='bx bx-plus' data-id="${item.id}"></i>
                            </span>
                        </div>
                        <i class='bx bx-trash-alt cart__amount-trash' data-id="${item.id}"></i>
                    </div>
                </div>
            `;

            cartContainer.appendChild(cartCard);
        });

        // Update totals
        cartPricesItem.textContent = `${totalItems} items`;
        cartPricesTotal.textContent = `$${totalPrice.toFixed(2)}`;
        cartShop.textContent = totalItems;

        // Show empty message if the cart is empty
        if (cart.length === 0) {
            cartContainer.innerHTML = `<p>${emptyMessage}</p>`;
            cartPricesItem.textContent = "0 items";
            cartPricesTotal.textContent = "$0.00";
            cartShop.textContent = "0";
        }
    }

    // Function to add an item to the cart
    function addToCart(product) {
        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        updateCartUI();
    }

    // Function to remove an item from the cart
    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        updateCartUI();
    }

    // Function to update quantity
    function updateQuantity(productId, increment) {
        const item = cart.find(item => item.id === productId);

        if (item) {
            item.quantity += increment;
            if (item.quantity <= 0) removeFromCart(productId);
            updateCartUI();
        }
    }

    // Add event listeners for plus, minus, and trash icons
    cartContainer.addEventListener("click", (e) => {
        const productId = e.target.dataset.id;

        if (e.target.classList.contains("bx-plus")) {
            updateQuantity(productId, 1);
        }

        if (e.target.classList.contains("bx-minus")) {
            updateQuantity(productId, -1);
        }

        if (e.target.classList.contains("bx-trash-alt")) {
            removeFromCart(productId);
        }
    });

    // Add event listeners for "ADD TO CART" buttons
    addToCartButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const featuredCard = e.target.closest(".featured__card");
            const productName = featuredCard.querySelector(".featured__title").textContent;
            const productPrice = parseFloat(featuredCard.querySelector(".featured__price").textContent.replace("$", ""));
            const productImage = featuredCard.querySelector(".featured__img").src;
            const productId = productName.toLowerCase().replace(/\s+/g, "-");

            const product = {
                id: productId,
                name: productName,
                price: productPrice,
                image: productImage,
            };

            addToCart(product);
        });
    });

    // Initialize the cart UI
    updateCartUI();
});

// ================ PROCEED BUTTON
document.addEventListener("DOMContentLoaded", () => {
    const checkoutButton = document.querySelector(".checks");
    const popup = document.getElementById("popup");
    const proceedButton = document.getElementById("proceedButton");

    // Show popup on checkout button click
    checkoutButton.addEventListener("click", () => {
        popup.style.display = "flex"; // Show popup
    });

    // Close popup on proceed button click
    proceedButton.addEventListener("click", () => {
        popup.style.display = "none"; // Hide popup
    });

    // Optional: Close popup when clicking outside of it
    window.addEventListener("click", (event) => {
        if (event.target === popup) {
            popup.style.display = "none";
        }
    });
});document.addEventListener("DOMContentLoaded", () => {
    const checkoutButton = document.querySelector(".checks");
    const popup = document.getElementById("popup");
    const proceedButton = document.getElementById("proceedButton");

    // Show popup on checkout button click
    checkoutButton.addEventListener("click", () => {
        popup.style.display = "flex"; // Show popup
    });

    // Close popup on proceed button click
    proceedButton.addEventListener("click", () => {
        popup.style.display = "none"; // Hide popup
    });

    // Optional: Close popup when clicking outside of it
    window.addEventListener("click", (event) => {
        if (event.target === popup) {
            popup.style.display = "none";
        }
    });
});

//--=================== BILL-----===============
document.querySelector('.checks').addEventListener('click', async (e) => {
    e.preventDefault();

    // Get form values
    const email = document.getElementById('email').value;
    const firstName = document.querySelector('[placeholder="First Name"]').value;
    const lastName = document.querySelector('[placeholder="Last Name"]').value;
    const phone = document.querySelector('[placeholder="Phone"]').value;
    const address = document.querySelector('[placeholder="Address"]').value;
    const city = document.querySelector('[placeholder="City*"]').value;
    const zipCode = document.querySelector('[placeholder="ZIP Code"]').value;
    const paymentMethod = "Credit Card"; // Hardcoded for simplicity
    const orderTotal = 2495.00; // Example value

    try {
        // Send data to the server
        const response = await fetch('process_order.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                firstName,
                lastName,
                phone,
                address,
                city,
                zipCode,
                paymentMethod,
                orderTotal,
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Order saved successfully:', result);
        alert('Order saved successfully!');
    } catch (error) {
        console.error('Failed to save order:', error);
        alert('Order saved successfully.');
    }
});
document.getElementById("newsletterForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    // Display the popup
    const popup = document.getElementById("popupContainer");
    popup.classList.remove("hidden");
  
    // Hide the popup after 3 seconds
   
  });
// Close the popup when the close button is clicked
document.getElementById("closePopupButton").addEventListener("click", function () {
  const popup = document.getElementById("popupContainer");
  popup.classList.add("hidden");
});  
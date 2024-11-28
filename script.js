document.addEventListener("DOMContentLoaded", () => {
    const productList = document.getElementById("productList");
    const cartModal = document.getElementById("cartModal");
    const cartButton = document.getElementById("cartButton");
    const closeModal = document.getElementById("closeModal");
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");
    const cartCount = document.getElementById("cartCount");

    let cart = [];

    // Fetch products from the backend
    fetch('/api/products')
        .then(response => response.json())
        .then(products => {
            products.forEach(product => {
                const productDiv = document.createElement("div");
                productDiv.classList.add("product");

                productDiv.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>$${product.price}</p>
                    <button data-id="${product._id}" data-price="${product.price}" data-name="${product.name}">Add to Cart</button>
                `;

                productList.appendChild(productDiv);
            });

            document.querySelectorAll(".product button").forEach(button => {
                button.addEventListener("click", (e) => {
                    const id = e.target.dataset.id;
                    const name = e.target.dataset.name;
                    const price = parseFloat(e.target.dataset.price);

                    const item = cart.find(item => item.id === id);
                    if (item) {
                        item.quantity++;
                    } else {
                        cart.push({ id, name, price, quantity: 1 });
                    }

                    updateCart();
                });
            });
        });

    cartButton.addEventListener("click", () => {
        cartModal.style.display = "flex";
    });

    closeModal.addEventListener("click", () => {
        cartModal.style.display = "none";
    });

    const updateCart = () => {
        cartItems.innerHTML = "";
        let total = 0;

        cart.forEach(item => {
            const li = document.createElement("li");
            li.textContent = `${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
            cartItems.appendChild(li);

            total += item.price * item.quantity;
        });

        cartTotal.textContent = total.toFixed(2);
        cartCount.textContent = cart.length;
    };
});

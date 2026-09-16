
const products = [

    {
        id: 1,
        name: "Statue",
        description: "Handmade clat statue",
        price: 299,
        stock: 5,
        image :"statue.jpg"
    },

    {
        id: 2,
        name: "Bookmark",
        description: "Harry potter themed",
        price: 99,
        stock: 8,
        image: "bookmark.jpg"
    },

    {
        id: 3,
        name: "Handmade Jewellery",
        description: "Elegant handmade jewellery piece.",
        price: 149,
        stock: 6,
        image: "WhatsApp Image 2026-09-08 at 18.26.00.jpeg"
    },

    {
        id: 4,
        name: "Madhubani painting",
        description: "Handmade ",
        price: 299,
        stock: 10,
        image: "WhatsApp Image 2026-09-09 at 09.24.34.jpeg"
    },

    {
        id: 5,
        name: "Phone cover",
        description: "Customize phonecover",
        price: 199,
        stock: 7,
        image: "spider.jpg"
    },

    {
        id: 6,
        name: "Sketch",
        description: "Anime character sketch",
        price: 149,
        stock: 4,
        image: "sketch.jpg"
    },

    {
        id: 7,
        name: "Spiderman box",
        description: "Creative gift box",
        price: 299,
        stock: 9,
        image: "box.jpg"
    },

    
];



let cart = [];

let discountApplied = false;

const TAX_RATE = 0.05;



function displayProducts(){

    const grid = document.getElementById("product-grid");

    grid.innerHTML = "";

    products.forEach(product => {

        const cartItem = cart.find(item => item.id === product.id);

        const currentQuantity = cartItem
            ? cartItem.quantity
            : 0;

        const availableStock =
            product.stock - currentQuantity;

        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `

            <div class="product-image">
                <img src="${product.image}"alt="
             ${product.image}">
            </div>

            <div class="product-info">

                <h3>${product.name}</h3>

                <p>${product.description}</p>

                <div class="price">
                    ₹${product.price}
                </div>

                <div class="stock">
                    ${
                        availableStock > 0
                        ? `${availableStock} items available`
                        : "Out of stock"
                    }
                </div>

                <button
                    class="add-btn"
                    onclick="addToCart(${product.id})"
                    ${availableStock <= 0 ? "disabled" : ""}
                >
                    ${
                        availableStock <= 0
                        ? "Out of Stock"
                        : "Add to Cart"
                    }
                </button>

            </div>
        `;

        grid.appendChild(card);

    });
}
                

function addToCart(productId) {

    const product =
        products.find(p => p.id === productId);

    if (!product) return;


    const existingItem =
        cart.find(item => item.id === productId);


    if (existingItem) {

        if (existingItem.quantity < product.stock) {

            existingItem.quantity++;

        } else {

            alert("Sorry! No more stock available.");

            return;

        }

    } else {

        cart.push({

            id: product.id,

            name: product.name,

            price: product.price,

            image: product.image,

            quantity: 1

        });

    }


    updateCart();

}
    

function removeFromCart(productId) {

    cart =
        cart.filter(item => item.id !== productId);

    updateCart();

}

function changeQuantity(productId, change) {

    const item =
        cart.find(item => item.id === productId);

    const product =
        products.find(p => p.id === productId);


    if (!item || !product) return;


    const newQuantity =
        item.quantity + change;


    if (newQuantity <= 0) {

        removeFromCart(productId);

        return;

    }


    if (newQuantity > product.stock) {

        alert(
            `Only ${product.stock} units are available.`
        );

        return;

    }


    item.quantity = newQuantity;

    updateCart();

}


function updateCart() {

    displayCart();

    calculateTotals();

    updateCartCount();

    displayProducts();

}


function displayCart() {

    const container =
        document.getElementById("cart-items");


    if (cart.length === 0) {

        container.innerHTML = `

            <p class="empty-cart">
                Your cart is empty.
            </p>`

        ;

        return;

    }


    container.innerHTML = "";


    cart.forEach(item => {

        const cartItem =
            document.createElement("div");

        cartItem.className = "cart-item";


        cartItem.innerHTML = `
            <div class="cart-item-image">
                ${item.image}
            </div>

            <div class="cart-item-info">

                <h4>${item.name}</h4>

                <p>
                    ₹${item.price * item.quantity}
                </p>

                <div class="quantity">

                    <button
                        onclick="changeQuantity(${item.id}, -1)"
                    >
                        −
                    </button>

                    <span>${item.quantity}</span>

                    <button
                        onclick="changeQuantity(${item.id}, 1)"
                    >
                        +
                    </button>

                    <button
                        class="remove-btn"
                        onclick="removeFromCart(${item.id})"
                    >
                        Remove
                    </button>

                </div>

            </div>

        `;

        container.appendChild(cartItem);

    });

}




function updateCartCount() {

    const count =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );

    document.getElementById("cart-count")
        .textContent = count;

}




function calculateTotals() {

    const subtotal =
        cart.reduce(
            (total, item) =>
                total +
                item.price * item.quantity,
            0
        );


    let discount = 0;


    if (discountApplied) {

        discount = subtotal * 0.20;

    }


    const taxableAmount =
        subtotal - discount;


    const tax =
        taxableAmount * TAX_RATE;


    const grandTotal =
        taxableAmount + tax;


    document.getElementById("subtotal")
        .textContent =
       ` ₹${subtotal.toFixed(2)}`;


    document.getElementById("discount")
        .textContent =
        `₹${discount.toFixed(2)}`;


    document.getElementById("tax")
        .textContent =
        `₹${tax.toFixed(2)}`;


    document.getElementById("grand-total")
        .textContent =
        `₹${grandTotal.toFixed(2)}`;


    document.getElementById("payment-total")
        .textContent =
        grandTotal.toFixed(2);


    document.getElementById("checkout-button")
        .disabled =
        cart.length === 0;

}


function applyPromo() {const code =
        document
            .getElementById("promo-code")
            .value
            .trim()
            .toUpperCase();


    const message =
        document.getElementById("promo-message");


    if (code === "SAVE20") {

        if (discountApplied) {

            message.textContent =
                "Promo code already applied.";

            return;

        }


        discountApplied = true;

        message.textContent =
            "✓ 20% discount applied!";

        message.style.color =
            "#16875d";


        calculateTotals();

    } else {

        discountApplied = false;

        message.textContent =
            "Invalid promo code. Try SAVE20.";

        message.style.color =
            "#dc3545";


        calculateTotals();

    }

}

function openCart() {

    document
        .getElementById("cart-sidebar")
        .classList.add("open");

}


function closeCart() {

    document
        .getElementById("cart-sidebar")
        .classList.remove("open");

}

function startCheckout() {

    if (cart.length === 0) {

        alert("Please add a product first.");

        return;

    }


    closeCart();


    document
        .getElementById("checkout")
        .scrollIntoView({
            behavior: "smooth"
        });


    showStep(1);

}


function showStep(step) {

    document
        .querySelectorAll(".checkout-step")
        .forEach(element => {

            element.classList.remove("active");

        });


    document
        .getElementById(
            `checkout-step-${step}`
        )
        .classList.add("active");


    document
        .querySelectorAll(".progress-step")
        .forEach((element, index) => {

            element.classList.toggle(
                "active",
                index < step
            );

        });

}


function nextStep(currentStep) {

    if (currentStep === 1) {

        if (!validateCustomer()) return;

    }


    if (currentStep === 2) {

        if (!validateAddress()) return;

    }


    showStep(currentStep + 1);

}


function previousStep(currentStep) {

    showStep(currentStep - 1);

}


/* ================= VALIDATION HELPERS ================= */

function setError(id, message) {

    const input =
        document.getElementById(id);

    const error =
        document.getElementById(
            `${id}-error`
        );


    if (message) {

        input.classList.add("invalid");

        input.classList.remove("valid");

        error.textContent = message;

        return false;

    } else {

        input.classList.remove("invalid");

        input.classList.add("valid");

        error.textContent = "";

        return true;

    }

}


/* ================= CUSTOMER VALIDATION ================= */

function validateCustomer() {

    const name =
        document
            .getElementById("name")
            .value
            .trim();


    const email =
        document
            .getElementById("email")
            .value
            .trim();


    const phone =
        document
            .getElementById("phone")
            .value
            .trim();


    let valid = true;


    if (name.length < 3) {

        setError(
            "name",
            "Please enter your full name."
        );

        valid = false;

    } else {

        setError("name", "");

    }


    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailPattern.test(email)) {

        setError(
            "email",
            "Enter a valid email address."
        );

        valid = false;

    } else {

        setError("email", "");

    }


    if (!/^[0-9]{10}$/.test(phone)) {

        setError(
            "phone",
            "Phone number must contain 10 digits."
        );

        valid = false;

    } else {

        setError("phone", "");

    }


    return valid;

}
    /* ================= ADDRESS VALIDATION ================= */

function validateAddress() {

    const address =
        document
            .getElementById("address")
            .value
            .trim();


    const city =
        document
            .getElementById("city")
            .value
            .trim();


    const pincode =
        document
            .getElementById("pincode")
            .value
            .trim();


    let valid = true;


    if (address.length < 10) {

        setError(
            "address",
            "Please enter a complete address."
        );

        valid = false;

    } else {

        setError("address", "");

    }


    if (city.length < 2) {

        setError(
            "city",
            "Please enter your city."
        );

        valid = false;

    } else {

        setError("city", "");

    }


    if (!/^[0-9]{6}$/.test(pincode)) {

        setError(
            "pincode",
            "PIN code must contain 6 digits."
        );

        valid = false;

    } else {

        setError("pincode", "");

    }


    return valid;

}




function validatePayment() {

    const card =
        document
            .getElementById("card")
            .value
            .replace(/\s/g, "");


    const expiry =
        document
            .getElementById("expiry")
            .value
            .trim();


    const cvv =
        document
            .getElementById("cvv")
            .value
            .trim();


    let valid = true;


    if (!/^[0-9]{16}$/.test(card)) {

        setError(
            "card",
            "Card number must contain 16 digits."
        );

        valid = false;

    } else {

        setError("card", "");

    }


    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {

        setError(
            "expiry",
            "Use MM/YY format."
        );

        valid = false;

    } else {

        setError("expiry", "");

    }

    if (!/^[0-9]{3}$/.test(cvv)) {

        setError(
            "cvv",
            "CVV must contain 3 digits."
        );

        valid = false;

    } else {

        setError("cvv", "");

    }


    return valid;

}

document
    .getElementById("email")
    .addEventListener("input", function () {

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailPattern.test(this.value)) {

            setError("email", "");

        } else {

            this.classList.remove("valid");

        }

    });


document
    .getElementById("phone")
    .addEventListener("input", function () {

        this.value =
            this.value.replace(/\D/g, "");

    });


document
    .getElementById("pincode")
    .addEventListener("input", function () {

        this.value =
            this.value.replace(/\D/g, "");

    });

document
    .getElementById("card")
    .addEventListener("input", function () {

        let value =
            this.value.replace(/\D/g, "");

        value =
            value.substring(0, 16);

        this.value =
            value.replace(
                /(.{4})/g,
                "$1 "
            ).trim();

    });

document
    .getElementById("expiry")
    .addEventListener("input", function () {

        let value =
            this.value.replace(/\D/g, "");

        value =
            value.substring(0, 4);

        if (value.length >= 3) {

            value =
                value.substring(0, 2)
                + "/"
                + value.substring(2);

        }

        this.value = value;

    });

document
    .getElementById("cvv")
    .addEventListener("input", function () {

        this.value =
            this.value.replace(/\D/g, "");

    });


document
    .getElementById("checkout-form")
    .addEventListener("submit", function (event) {

        event.preventDefault();


        if (!validatePayment()) {

            return;

        }


        if (cart.length === 0) {

            alert("Your cart is empty.");

            return;

        }


        

        const button =
            document.querySelector(".pay-btn");

        button.textContent =
            "Processing...";

        button.disabled = true;


        setTimeout(() => {

            document
                .getElementById("checkout-form")
                .style.display = "none";


            document
                .querySelector(".progress")
                .style.display = "none";


            document
                .getElementById("success-message")
                .classList.add("show");


            cart = [];

            discountApplied = false;

            updateCart();

        }, 1500);

    });




function continueShopping() {

    document
        .getElementById("success-message")
        .classList.remove("show");


    document
        .getElementById("checkout-form")
        .style.display = "block";


    document
        .querySelector(".progress")
        .style.display = "flex";


    document
        .getElementById("checkout-form")
        .reset();


    document
        .getElementById("checkout")
        .scrollIntoView({
            behavior: "smooth"
        });


    showStep(1);

}


displayProducts();

updateCart();

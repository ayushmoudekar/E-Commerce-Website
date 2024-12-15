// Simulated list of products
const products = [
    { id: 1, name: "Product 1", price: 30 },
    { id: 2, name: "Product 2", price: 50 },
    { id: 3, name: "Product 3", price: 20 }
];

let cart = [];
let orders = [];

// Load products on page load
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
});

// Display the product list
function displayProducts() {
    const productList = document.getElementById('product-list');
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productElement);
    });
}

// Add a product to the cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.product.id === productId);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ product, quantity: 1 });
    }

    updateCartDisplay();
}

// Update the cart display
function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const totalAmount = document.getElementById('total-amount');
    cartItems.innerHTML = '';

    let total = 0;

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <h4>${item.product.name}</h4>
            <p>Quantity: ${item.quantity}</p>
            <p>Price: $${item.product.price * item.quantity}</p>
        `;
        cartItems.appendChild(itemElement);

        total += item.product.price * item.quantity;
    });

    totalAmount.innerText = `Total: $${total}`;
}

// Handle checkout
document.getElementById('checkout-btn').addEventListener('click', () => {
    if (cart.length > 0) {
        const order = {
            id: orders.length + 1,
            items: [...cart],
            total: cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0)
        };

        orders.push(order);
        cart = [];
        updateCartDisplay();
        displayOrderSummary(order);
    } else {
        alert("Your cart is empty!");
    }
});

// Display the order summary after checkout
function displayOrderSummary(order) {
    const orderSummary = document.getElementById('order-summary');
    orderSummary.innerHTML = `
        <h3>Order #${order.id}</h3>
        <p>Total: $${order.total}</p>
        <h4>Items:</h4>
        <ul>
            ${order.items.map(item => `<li>${item.product.name} (x${item.quantity})</li>`).join('')}
        </ul>
    `;
}

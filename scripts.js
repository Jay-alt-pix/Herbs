// scripts.js
let cart = [];
let cartCount = 0;
let totalAmount = 0;

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productElement = button.closest('.product');
        const productName = productElement.getAttribute('data-name');
        const productPrice = parseFloat(productElement.getAttribute('data-price'));

        // Add item to cart
        cart.push({ name: productName, price: productPrice });
        cartCount++;
        totalAmount += productPrice;

        // Update cart count and total display
        document.getElementById('cart-count').textContent = cartCount;
        document.getElementById('total-amount').textContent = totalAmount.toFixed(2);

        // Show the cart sidebar
        showCart();
        updateCartItems();
    });
});

document.getElementById('cart-trigger').addEventListener('click', () => {
    showCart();
    updateCartItems();
});

document.getElementById('close-cart').addEventListener('click', () => {
    closeCart();
});

document.getElementById('place-order').addEventListener('click', () => {
    // Redirect to the mock payment page
    window.location.href = 'payment.html'; // Redirect to the payment page
});

function showCart() {
    document.getElementById('cart').classList.add('open');
}

function closeCart() {
    document.getElementById('cart').classList.remove('open');
}

function updateCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Clear previous items

    cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.textContent = `${item.name} - $${item.price.toFixed(2)}`;

        // Cancel button
        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Cancel';
        cancelButton.onclick = () => {
            cancelOrder(index);
        };

        itemElement.appendChild(cancelButton);
        cartItemsContainer.appendChild(itemElement);
    });
}

function cancelOrder(index) {
    const price = cart[index].price;
    cart.splice(index, 1); // Remove the item from the cart
    cartCount--; // Decrease the cart count
    totalAmount -= price; // Decrease total amount
    document.getElementById('cart-count').textContent = cartCount; // Update cart count display
    document.getElementById('total-amount').textContent = totalAmount.toFixed(2); // Update total display
    updateCartItems(); // Update the cart display
}
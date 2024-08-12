const cart = [];

function addToCart(id, name, price) {
    const item = { id, name, price, quantity: 1 };
    const existingItemIndex = cart.findIndex(cartItem => cartItem.id === id);

    if (existingItemIndex >= 0) {
        cart[existingItemIndex].quantity++;
    } else {
        cart.push(item);
    }

    updateCart();
}

function removeFromCart(id) {
    const itemIndex = cart.findIndex(cartItem => cartItem.id === id);

    if (itemIndex >= 0) {
        cart.splice(itemIndex, 1);
        updateCart();
    }
}

function updateCart() {
    const cartContainer = document.getElementById('cart');
    cartContainer.innerHTML = '';

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <span>${item.name} - RS.${item.price.toFixed(2)} x ${item.quantity}</span>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartContainer.appendChild(cartItem);
    });
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty.');
        return;
    }

    let total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`Your total is RS.${total.toFixed(2)}. Thank you for shopping!`);
    cart.length = 0; 
    updateCart();
}

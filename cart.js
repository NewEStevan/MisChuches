// cart.js

// Cargar carrito desde localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Función para guardar el carrito en localStorage
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Función para agregar un producto al carrito
function addToCart(product) {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
        existingProduct.quantity += product.quantity;
    } else {
        cart.push(product);
    }
    saveCart();
    updateCartDisplay();
}

// Función para eliminar un producto del carrito
function removeFromCart(productId) {
    // Filtrar el carrito para eliminar solo el producto con el id correspondiente
    cart = cart.filter(item => item.id !== productId);
    saveCart(); // Guardar el carrito actualizado en localStorage
    updateCartDisplay(); // Actualizar la visualización del carrito
}

// Función para actualizar la cantidad de un producto
function updateQuantity(productId, newQuantity) {
    const product = cart.find(item => item.id === productId);
    if (product) {
        product.quantity = Math.max(1, parseInt(newQuantity, 10)); // Asegurarse de que la cantidad sea al menos 1
    }
    saveCart();
    updateCartDisplay();
}

// Función para calcular el total del carrito
function calculateTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
}

// Función para actualizar la visualización del carrito
function updateCartDisplay() {
    const cartDisplay = document.getElementById('cartDisplay');
    cartDisplay.innerHTML = ''; // Limpiar visualización existente

    if (cart.length === 0) {
        cartDisplay.innerHTML = '<p>El carrito está vacío.</p>';
        return;
    }

    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
            <div class="cart-item-info">
                <p>${item.name}</p>
                <p>$${item.price.toFixed(2)}</p>
            </div>
            <div class="cart-item-controls">
                <button class="remove-btn" onclick="removeFromCart(${item.id})">🗑️</button>
                <div class="quantity-controls">
                    <button class="decrease-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)" />
                    <button class="increase-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
            </div>
        `;
        cartDisplay.appendChild(itemDiv);
    });

    const totalDiv = document.createElement('div');
    totalDiv.classList.add('cart-total');
    totalDiv.innerHTML = `<strong>Total: $${calculateTotal()}</strong>`;
    cartDisplay.appendChild(totalDiv);
}

// Inicializar la visualización del carrito
document.addEventListener("DOMContentLoaded", () => {
    updateCartDisplay();

    const proceedToPaymentButton = document.getElementById('proceedToPayment');
    if (proceedToPaymentButton) {
        proceedToPaymentButton.addEventListener('click', () => {
            alert('Proceder al Pago');
        });
    }
});
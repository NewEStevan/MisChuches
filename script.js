document.addEventListener("DOMContentLoaded", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const productCounts = document.querySelectorAll(".product-count");

    // Función para actualizar los contadores de productos
    function updateProductCounts() {
        productCounts.forEach(countElement => {
            const productId = parseInt(countElement.getAttribute("data-id"), 10);
            const product = cart.find(item => item.id === productId);

            if (product) {
                countElement.textContent = `🛒 (${product.quantity})`;
                countElement.style.display = "block"; // Mostrar si está en el carrito
            } else {
                countElement.style.display = "none"; // Ocultar si no está en el carrito
            }
        });
    }

    // Inicializar los contadores al cargar la página
    updateProductCounts();

    addToCartButtons.forEach(button => {
        button.addEventListener("click", () => {
            const productId = parseInt(button.getAttribute("data-id"), 10);
            const productName = button.getAttribute("data-name");
            const productPrice = parseFloat(button.getAttribute("data-price"));

            // Añadir producto al carrito
            const product = cart.find(item => item.id === productId);
            if (product) {
                product.quantity += 1;
            } else {
                cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
            }

            // Guardar carrito en localStorage
            localStorage.setItem("cart", JSON.stringify(cart));

            // Actualizar los contadores de productos
            updateProductCounts();
        });
    });
});
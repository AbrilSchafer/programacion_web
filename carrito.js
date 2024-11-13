function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    // Contar el número de items diferentes en el carrito
    document.querySelector('.cart-badge').textContent = carrito.length;
}

function mostrarCarrito() {
    const cartItemsContainer = document.getElementById('cart-items');
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const btnComprar = document.getElementById('realizar-compra');
    let total = 0;

    cartItemsContainer.innerHTML = '';

    // Verificar si el carrito está vacío
    if (carrito.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart-message">
                <i class="fas fa-shopping-cart"></i>
                <p>No hay productos en tu carrito</p>
            </div>
        `;
        btnComprar.disabled = true;
        btnComprar.classList.add('btn-disabled');
    } else {
        btnComprar.disabled = false;
        btnComprar.classList.remove('btn-disabled');
        
        carrito.forEach(item => {
            const subtotal = item.precio * item.cantidad;
            total += subtotal;

            cartItemsContainer.innerHTML += `
                <div class="cart-item">
                    <img src="${item.imagen}" alt="${item.nombre}">
                    <div class="item-details">
                        <h3>${item.nombre}</h3>
                        <p>Color: ${traducirColor(item.color)}</p>
                        <p>Cantidad: ${item.cantidad}</p>
                        <p>Precio unitario: $${item.precio}</p>
                        <p>Subtotal: $${subtotal.toFixed(2)}</p>
                    </div>
                    <div class="item-controls">
                        <div class="quantity-control">
                            <button onclick="decrementarCantidad(${item.id})" class="btn-cantidad">-</button>
                            <span>${item.cantidad}</span>
                            <button onclick="incrementarCantidad(${item.id})" class="btn-cantidad">+</button>
                        </div>
                        <button onclick="eliminarDelCarrito(${item.id})" class="btn-eliminar">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
        });
    }

    document.getElementById('total-amount').textContent = total.toFixed(2);
}

function eliminarDelCarrito(id) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito = carrito.filter(item => item.id !== id);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
}

function generarMensajeWhatsApp() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let mensaje = 'Hola! Me gustaría hacer el siguiente pedido:\n\n';
    let total = 0;

    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;
        mensaje += `• ${item.nombre}\n`;
        mensaje += `  Color: ${traducirColor(item.color)}\n`;
        mensaje += `  Cantidad: ${item.cantidad}\n`;
        mensaje += `  Precio unitario: $${item.precio}\n`;
        mensaje += `  Subtotal: $${subtotal.toFixed(2)}\n\n`;
    });

    mensaje += `Total: $${total.toFixed(2)}`;
    return encodeURIComponent(mensaje);
}

function realizarCompra() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    if (carrito.length === 0) {
        alert('El carrito está vacío');
        return;
    }
    
    const mensaje = generarMensajeWhatsApp();
    const numeroWhatsApp = '5491156412852';
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensaje}`;
    
    window.open(urlWhatsApp, '_blank');
}

// Funciones para manejar la cantidad
function incrementarCantidad(id) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const index = carrito.findIndex(item => item.id === id);
    if (index !== -1) {
        carrito[index].cantidad++;
        localStorage.setItem('carrito', JSON.stringify(carrito));
        mostrarCarrito();
    }
}

function decrementarCantidad(id) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const index = carrito.findIndex(item => item.id === id);
    if (index !== -1 && carrito[index].cantidad > 1) {
        carrito[index].cantidad--;
        localStorage.setItem('carrito', JSON.stringify(carrito));
        mostrarCarrito();
    }
}

function actualizarSubtotal() {
    let subtotal = 0;
    const items = JSON.parse(localStorage.getItem('carrito')) || [];
    
    items.forEach(item => {
        // Convertir el precio a número entero
        const precio = parseInt(item.precio);
        subtotal += precio * item.cantidad;
    });

    document.getElementById('subtotal').textContent = `$${subtotal.toLocaleString('es-CL')}`;
    document.getElementById('total').textContent = `$${subtotal.toLocaleString('es-CL')}`;
}

// También asegúrate que al guardar el producto, el precio se guarde como entero
function guardarProducto(nombre, precio, imagen, colores) {
    const producto = {
        nombre: nombre,
        precio: parseInt(precio), // Convertir a entero
        imagen: imagen,
        colores: colores
    };
}

// Inicializar la página
document.addEventListener('DOMContentLoaded', () => {
    mostrarCarrito();
    
    // Agregar evento al botón de realizar compra
    const btnComprar = document.getElementById('realizar-compra');
    if (btnComprar) {
        btnComprar.addEventListener('click', realizarCompra);
    }
});

function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".").replace(/\.(?=[^.]*$)/, ",");
}

function actualizarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const contenedorCarrito = document.getElementById('contenedor-carrito');
    let total = 0;
    
    // ... código existente del carrito ...

    // Cuando calcules el total, aplica el formato
    total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    document.getElementById('total').textContent = `$${formatPrice(total)}`;
} 
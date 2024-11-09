// abrir menu desplegable
function toggleMenu() {
    const sideMenu = document.getElementById("sideMenu");
    if (sideMenu.style.width === "350px") {
        sideMenu.style.width = "0";
    } else {
        sideMenu.style.width = "350px";
    }
}

// filtrar productos por menu
function filterProducts(category) {
    const products = document.querySelectorAll('.product-card');
    let productsFound = false;
    
    // Filtrar productos según la categoría seleccionada
    products.forEach(product => {
        if (category === "all" || product.getAttribute('data-category') === category) {
            product.style.display = "block";
            productsFound = true;
        } else {
            product.style.display = "none";
        }
    });

    // Obtener o crear el elemento para el mensaje
    let noProductsMessage = document.getElementById('noProductsMessage');
    if (!noProductsMessage) {
        noProductsMessage = document.createElement('div');
        noProductsMessage.id = 'noProductsMessage';
        noProductsMessage.className = 'no-products-message';
        document.querySelector('.products-container').appendChild(noProductsMessage);
    }

    // Mostrar u ocultar el mensaje según corresponda
    if (!productsFound && category !== "all") {
        noProductsMessage.innerHTML = `
            <i class="fas fa-box-open"></i>
            Lo sentimos, no hay productos disponibles en esta categoría por el momento
        `;
        noProductsMessage.style.display = "block";
    } else {
        noProductsMessage.style.display = "none";
    }

    // Cerrar el menú lateral después de seleccionar una categoría
    toggleMenu();

    // Desplazarse hacia la sección de productos
    const productsSection = document.getElementById("productsSection");
    if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
    }
} 


// guardar el producto

function guardarProducto(nombre, precio, imagen, colores) {
    const producto = {
        nombre: nombre,
        precio: precio,
        imagen: imagen,
        colores: colores // Guardar los colores
    };
    localStorage.setItem('productoSeleccionado', JSON.stringify(producto));
}

// Función para buscar productos
function searchProducts() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase().replace(/\s+/g, '');
    const products = document.querySelectorAll('.product-card');
    let productsFound = false;

    products.forEach(product => {
        const productName = product.getAttribute('data-name').toLowerCase().replace(/\s+/g, '');
        if (productName.includes(searchTerm)) {
            product.style.display = 'block';
            productsFound = true;
        } else {
            product.style.display = 'none';
        }
    });

    // Obtener o crear el elemento para el mensaje
    let noProductsMessage = document.getElementById('noProductsMessage');
    if (!noProductsMessage) {
        noProductsMessage = document.createElement('div');
        noProductsMessage.id = 'noProductsMessage';
        noProductsMessage.className = 'no-products-message';
        document.querySelector('.products-container').appendChild(noProductsMessage);
    }

    // Mostrar u ocultar el mensaje según corresponda
    if (!productsFound && searchTerm.length > 0) {
        noProductsMessage.innerHTML = `
            <i class="fas fa-search"></i>
            No encontramos productos que coincidan con tu búsqueda
        `;
        noProductsMessage.style.display = "block";
    } else {
        noProductsMessage.style.display = "none";
    }

    // Solo hacer scroll si hay texto en la búsqueda
    if (searchTerm.length > 0) {
        const productsSection = document.getElementById("productsSection");
        if (productsSection) {
            productsSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

// Agregar event listeners para la búsqueda
document.addEventListener('DOMContentLoaded', function() {
    // Verificar si es la primera vez que se abre la página
    const primeraVisita = !localStorage.getItem('visitaPrevia');
    
    if (primeraVisita) {
        // Limpiar el carrito solo en la primera visita
        localStorage.removeItem('carrito');
        // Marcar que ya se visitó la página
        localStorage.setItem('visitaPrevia', 'true');
    }
    
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');

    // Buscar cuando se hace clic en el botón
    searchButton.addEventListener('click', searchProducts);

    // Buscar mientras el usuario escribe
    searchInput.addEventListener('input', searchProducts);

    // Actualizar contador del carrito
    actualizarContadorCarrito();

    // Agregar evento al ícono del carrito
    document.querySelector('.cart-container').addEventListener('click', function() {
        window.location.href = 'carrito.html';
    });
});

// Agregar al inicio del archivo
function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    // Contar el número de items diferentes en el carrito
    document.querySelector('.cart-badge').textContent = carrito.length;
}




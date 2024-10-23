
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
    
    // Filtrar productos según la categoría seleccionada
    products.forEach(product => {
        if (category === "all" || product.getAttribute('data-category') === category) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });

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


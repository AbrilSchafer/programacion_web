// Recuperar el producto desde LocalStorage
const producto = JSON.parse(localStorage.getItem('productoSeleccionado'));

// Mostrar los datos del producto en la página
if (producto) {
    document.getElementById('productName').textContent = producto.nombre;
    document.getElementById('productPrice').textContent = `$${producto.precio}`;
    document.getElementById('productImage').src = producto.imagen;

    // Limpiar las opciones actuales del select
    const colorSelect = document.getElementById('color');
    colorSelect.innerHTML = '';

    // Añadir los colores al select
    producto.colores.forEach(color => {
        const option = document.createElement('option');
        option.value = color;
        option.textContent = color.charAt(0).toUpperCase() + color.slice(1); // Capitalizar la primera letra
        colorSelect.appendChild(option);
    });
}


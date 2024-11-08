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
    producto.colores.forEach((color, index) => {
        const option = document.createElement('option');
        option.value = color;
        option.textContent = traducirColor(color);
        // Seleccionar el primer color por defecto
        if (index === 0) {
            option.selected = true;
        }
        colorSelect.appendChild(option);
    });
}

// Función para traducir nombres de colores
function traducirColor(color) {
    const traducciones = {
        'red': 'Rojo',
        'blue': 'Azul',
        'green': 'Verde',
        'yellow': 'Amarillo',
        'black': 'Negro',
        // Añade más traducciones según necesites
    };
    return traducciones[color] || color.charAt(0).toUpperCase() + color.slice(1);
}


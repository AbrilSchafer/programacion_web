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

// Agregar evento al botón "Agregar al carrito"
document.querySelector('.btn').addEventListener('click', function() {
    const producto = JSON.parse(localStorage.getItem('productoSeleccionado'));
    const colorSeleccionado = document.getElementById('color').value;
    const cantidad = parseInt(document.getElementById('quantity').value);
    
    // Obtener el carrito actual o crear uno nuevo
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    // Verificar si ya existe un producto igual
    const productoExistente = carrito.findIndex(item => 
        item.nombre === producto.nombre && 
        item.color === colorSeleccionado
    );

    if (productoExistente !== -1) {
        // Sumar la nueva cantidad a la cantidad existente
        carrito[productoExistente].cantidad += cantidad;
    } else {
        carrito.push({
            id: Date.now(),
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagen,
            color: colorSeleccionado,
            cantidad: cantidad
        });
    }
    
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContadorCarrito();
    
    // Mostrar SweetAlert con redirección
    Swal.fire({
        title: "¡Producto agregado!",
        text: "El producto se agregó correctamente al carrito",
        icon: "success",
        confirmButtonColor: '#2E7D32'
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = 'index.html';
        }
    });
});

// Función para actualizar el contador del carrito
function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    // Contar el número de items diferentes en el carrito
    document.querySelector('.cart-badge').textContent = carrito.length;
}

// Actualizar contador al cargar la página
actualizarContadorCarrito();

// Agregar evento al ícono del carrito
document.querySelector('.cart-container').addEventListener('click', function() {
    window.location.href = 'carrito.html';
});


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
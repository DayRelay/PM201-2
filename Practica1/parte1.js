const productos = [];

function menuPrincipal() {
    console.log(`\n
    Menú
    =========================================
    1. Ver menú de productos
    2. Hacer un pedido
    3. Ver mi cuenta
    4. Agregar un nuevo producto
    5. Editar un producto
    6. Eliminar un producto
    7. Limpiar mi pedido
    8. Salir
    =========================================`);
    const opcion = prompt("Selecciona una opción (1-8): ");
    switch (opcion) {
        case "1":
            listarProductos();
            break;
        case "2":
            hacerPedido();
            break;
        case "3":
            verMiCuenta();
            break;
        case "4":
            agregarProducto();
            break;
        case "5":
            editarProducto();
            break;
        case "6":
            eliminarProducto();
            break;
        case "7":
            limpiarPedido();
            break;
        case "8":
            console.log("¡Gracias por visitarnos! ¡Hasta luego!");
            break;
        default:
            console.log("Opción no válida. Por favor, selecciona una opción del 1 al 8.");
    }

}

menuPrincipal();
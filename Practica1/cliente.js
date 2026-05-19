// Parte 1: Caja

const pedidos = [];
let total = 0;

const arrayProductos = [];

function verMenu() {
    console.log("=== Menú de productos ===");
    arrayProductos.forEach((producto, index) => {
        console.log(`${index + 1}. ${producto.nombre} - $${producto.precio}`);
    });
}

function agregarPedido(nombreProducto, precioProducto) {
    const pedido = {
        nombre: nombreProducto,
        precio: precioProducto
    };
    pedidos.push(pedido);
    total += precioProducto;
    console.log(`Pedido agregado: ${nombreProducto} - $${precioProducto}`);
    console.log(`Total acumulado: $${total}`);
}

function verPedidos() {
    console.log("Pedidos realizados:");
    pedidos.forEach((pedido, index) => {
        console.log(`${index + 1}. ${pedido.nombre} - $${pedido.precio}`);
    });
    console.log(`Total a pagar: $${total}`);
}

function menuBarra() {
    console.log("=== Menú de acciones ===");
    console.log("1. Ver menú de productos");
    console.log("2. Agregar pedido");
    console.log("3. Ver pedidos");

    const opcion = prompt("Seleccionar una opción:");
    switch (opcion) {
        case '1':
            verMenu();
            break;
        case '2':
            const nombreProducto = prompt("Ingrese el nombre del producto:");
            const precioProducto = parseFloat(prompt("Ingrese el precio del producto:"));
            agregarPedido(nombreProducto, precioProducto);
            break;
        case '3':
            verPedidos();
            break;
        default:
            console.log("Opción no válida. Por favor, seleccione una opción del menú.");
    }

}

menuBarra();
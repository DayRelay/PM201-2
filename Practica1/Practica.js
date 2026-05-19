// ==========================================
// 📦 MÓDULO DE ENTRADA (Usar readline nativo)
// ==========================================
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Función para hacer preguntas de forma interactiva
function pregunta(texto) {
    return new Promise((resolve) => {
        rl.question(texto, (respuesta) => {
            resolve(respuesta);
        });
    });
}

// ==========================================
// 🧑‍🍳 02. COCINA (Gestión de Productos)
// Objetivos: Gestionar productos (Agregar, Editar, Eliminar, Listar)
// Investigar: Objetos, Propiedades, Arrays
// ==========================================

let productos = [
    { id: 1, nombre: "Hamburguesa Clásica", precio: 85 },
    { id: 2, nombre: "Papas a la Francesa", precio: 40 },
    { id: 3, nombre: "Refresco de Cola", precio: 25 }
];

// Agregar producto
function agregarProducto(id, nombre, precio) {
    productos.push({ id: id, nombre: nombre, precio: precio });
}

// Editar producto
function editarProducto(id, nuevoNombre, nuevoPrecio) {
    const producto = productos.find(p => p.id === id);
    if (producto) {
        producto.nombre = nuevoNombre;
        producto.precio = nuevoPrecio;
    }
}

// Eliminar producto
function eliminarProducto(id) {
    productos = productos.filter(p => p.id !== id);
}

// Listar productos disponibles (Para uso interno o del cliente)
function listarProductos() {
    console.log(`\n--- 📋 MENÚ DE PRODUCTOS ---`);
    productos.forEach(p => {
        console.log(`[${p.id}] ${p.nombre} - $${p.precio}`);
    });
}


// ==========================================
// 💳 01. CAJA (Gestión de Pedidos)
// Objetivos: Crear lista de pedidos, total acumulado, función agregarPedido()
// Investigar: let, const, funciones, arrays
// ==========================================

const listaDePedidos = [];
let totalAcumulado = 0;

function agregarPedido(idProducto, cantidad) {
    const producto = productos.find(p => p.id === idProducto);
    
    if (producto) {
        const subtotal = producto.precio * cantidad;
        
        listaDePedidos.push({
            producto: producto.nombre,
            cantidad: cantidad,
            precioUnitario: producto.precio,
            subtotal: subtotal
        });
        
        totalAcumulado += subtotal;
        console.log(`✅ ¡Éxito! Se agregaron ${cantidad}x ${producto.nombre} al pedido.`);
    } else {
        console.log(`❌ Error: El producto con ID ${idProducto} no existe en el menú.`);
    }
}


// ==========================================
// 🧍 03. CLIENTE (Interfaz de Consola)
// Objetivos: Mostrar menú bonito en consola, consultar, crear pedido, listar.
// Investigar: console.log, funciones, template strings
// ==========================================

function mostrarMenuPrincipal() {
    console.log(`
    =========================================
    🍔 BIENVENIDO AL SISTEMA DE RESTAURANTE 🍔
    =========================================
    Instrucciones de uso en consola:
    1. Para ver el menú usa:      listarProductos()
    2. Para ordenar usa:          agregarPedido(ID, Cantidad)
    3. Para ver tu cuenta usa:    verMiCuenta()
    =========================================
    `);
}

function verMiCuenta() {
    console.log(`\n--- 🧾 TU TICKET DE COMPRA ---`);
    if (listaDePedidos.length === 0) {
        console.log(`No has agregado ningún producto a tu pedido aún.`);
    } else {
        listaDePedidos.forEach((pedido, index) => {
            console.log(`${index + 1}. ${pedido.cantidad}x ${pedido.producto} ($${pedido.precioUnitario} c/u) = $${pedido.subtotal}`);
        });
        console.log(`---------------------------------`);
        console.log(`💰 TOTAL ACUMULADO A PAGAR: $${totalAcumulado}`);
        console.log(`---------------------------------`);
    }
}

// ==========================================
// 🎮 SISTEMA INTERACTIVO (Menú Principal)
// ==========================================

async function menuInteractivo() {
    let salir = false;
    
    while (!salir) {
        console.log(`\n
    =========================================
    🍔 SISTEMA DE RESTAURANTE - MENÚ PRINCIPAL 🍔
    =========================================
    1️⃣  Ver menú de productos
    2️⃣  Hacer un pedido
    3️⃣  Ver mi cuenta
    4️⃣  Agregar un nuevo producto
    5️⃣  Editar un producto
    6️⃣  Eliminar un producto
    7️⃣  Limpiar mi pedido
    8️⃣  Salir
    =========================================`);
        
        const opcion = await pregunta('Selecciona una opción (1-8): ');
        
        switch(opcion) {
            case '1':
                listarProductos();
                break;
                
            case '2':
                await hacerPedidoInteractivo();
                break;
                
            case '3':
                verMiCuenta();
                break;
                
            case '4':
                await agregarProductoInteractivo();
                break;
                
            case '5':
                await editarProductoInteractivo();
                break;
                
            case '6':
                await eliminarProductoInteractivo();
                break;
                
            case '7':
                await limpiarPedido();
                break;
                
            case '8':
                console.log(`\n👋 ¡Gracias por usar el sistema! ¡Hasta pronto!`);
                salir = true;
                break;
                
            default:
                console.log(`❌ Opción no válida. Por favor, selecciona una opción entre 1 y 8.`);
        }
    }
    
    rl.close();
}

// ==========================================
// 📝 FUNCIONES INTERACTIVAS
// ==========================================

async function hacerPedidoInteractivo() {
    console.log(`\n--- HACER UN PEDIDO ---`);
    listarProductos();
    
    const idProducto = await pregunta('Ingresa el ID del producto a pedir: ');
    const cantidad = await pregunta('¿Cuántos deseas? ');
    
    if (!isNaN(idProducto) && !isNaN(cantidad) && cantidad > 0) {
        agregarPedido(parseInt(idProducto), parseInt(cantidad));
    } else {
        console.log(`❌ Error: Ingresa valores numéricos válidos.`);
    }
}

async function agregarProductoInteractivo() {
    console.log(`\n--- AGREGAR NUEVO PRODUCTO ---`);
    
    const nuevoId = Math.max(...productos.map(p => p.id)) + 1;
    const nombre = await pregunta('Nombre del producto: ');
    const precio = await pregunta('Precio del producto: $');
    
    if (nombre && !isNaN(precio) && precio > 0) {
        agregarProducto(nuevoId, nombre, parseFloat(precio));
        console.log(`✅ Producto agregado correctamente.`);
    } else {
        console.log(`❌ Error: Completa todos los campos correctamente.`);
    }
}

async function editarProductoInteractivo() {
    console.log(`\n--- EDITAR PRODUCTO ---`);
    listarProductos();
    
    const id = await pregunta('ID del producto a editar: ');
    const nuevoNombre = await pregunta('Nuevo nombre (o presiona Enter para no cambiar): ');
    const nuevoPrecio = await pregunta('Nuevo precio (o presiona Enter para no cambiar): $');
    
    const producto = productos.find(p => p.id === parseInt(id));
    
    if (producto) {
        const nombre = nuevoNombre || producto.nombre;
        const precio = nuevoPrecio ? parseFloat(nuevoPrecio) : producto.precio;
        editarProducto(parseInt(id), nombre, precio);
        console.log(`✅ Producto actualizado correctamente.`);
    } else {
        console.log(`❌ Error: El producto no existe.`);
    }
}

async function eliminarProductoInteractivo() {
    console.log(`\n--- ELIMINAR PRODUCTO ---`);
    listarProductos();
    
    const id = await pregunta('ID del producto a eliminar: ');
    const confirmacion = await pregunta('¿Estás seguro? (si/no): ');
    
    if (confirmacion.toLowerCase() === 'si') {
        eliminarProducto(parseInt(id));
        console.log(`✅ Producto eliminado correctamente.`);
    } else {
        console.log(`❌ Operación cancelada.`);
    }
}

async function limpiarPedido() {
    const confirmacion = await pregunta('¿Deseas eliminar todos los productos de tu pedido? (si/no): ');
    
    if (confirmacion.toLowerCase() === 'si') {
        listaDePedidos.length = 0;
        totalAcumulado = 0;
        console.log(`✅ Tu pedido ha sido limpiado.`);
    } else {
        console.log(`❌ Operación cancelada.`);
    }
}

// ==========================================
// 🚀 INICIAR SISTEMA (Menú Interactivo)
// ==========================================

mostrarMenuPrincipal();
menuInteractivo();
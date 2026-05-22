const readline = require('readline');
const fs = require('fs'); // Herramienta para leer el archivo compartido

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Necesitamos los precios para que la caja pueda hacer los cálculos
let listaDePrecios = [
    { nombre: "Hamburguesa Clásica", precio: 120 },
    { nombre: "Papas Fritas", precio: 50 },
    { nombre: "Refresco", precio: 30 },
    { nombre: "Helado", precio: 45 }
];

let pedidosGlobales = [];
let pedidoActual = null; // Aquí guardaremos el pedido que estamos cobrando

// ==========================================
// FUNCIONES DE BASE DE DATOS
// ==========================================

function cargarPedidos() {
    if (fs.existsSync('base_datos.json')) {
        let contenido = fs.readFileSync('base_datos.json', 'utf8');
        pedidosGlobales = JSON.parse(contenido);
    } else {
        pedidosGlobales = [];
    }
}

function guardarPedidos() {
    let textoPlano = JSON.stringify(pedidosGlobales);
    fs.writeFileSync('base_datos.json', textoPlano);
}

// ==========================================
// FUNCIONES MATEMÁTICAS Y DE CAJA
// ==========================================

// Busca el precio de un producto por su nombre usando un for clásico
function obtenerPrecio(nombreBuscado) {
    for (let i = 0; i < listaDePrecios.length; i++) {
        if (listaDePrecios[i].nombre.toLowerCase() === nombreBuscado.toLowerCase()) {
            return listaDePrecios[i].precio;
        }
    }
    return 0; // Si no lo encuentra
}

function mostrarResumenCaja() {
    console.log("\n--- TICKET ACTUAL ---");
    console.log("Cliente: " + pedidoActual.cliente);
    
    let subtotalCalculado = 0;

    for (let i = 0; i < pedidoActual.articulos.length; i++) {
        let articulo = pedidoActual.articulos[i];
        let precioU = obtenerPrecio(articulo.nombre);
        let subtotalArticulo = precioU * articulo.cantidad;
        
        console.log("  - " + articulo.nombre + " | Cant: " + articulo.cantidad + " | Precio U: $" + precioU + " | Sub: $" + subtotalArticulo);
        
        subtotalCalculado = subtotalCalculado + subtotalArticulo;
    }

    let iva = subtotalCalculado * 0.16;
    let totalFinal = subtotalCalculado + iva;

    console.log("\nSubtotal: $" + subtotalCalculado.toFixed(2));
    console.log("IVA (16%): $" + iva.toFixed(2));
    console.log("TOTAL FINAL: $" + totalFinal.toFixed(2));
    console.log("---------------------\n");
}

function agregarAlPedidoActual(nombreProducto, precio, cantidad) {
    // Agregamos el producto temporalmente a la lista de precios para que la caja lo reconozca
    listaDePrecios.push({ nombre: nombreProducto, precio: precio });
    
    // Lo agregamos a los artículos del client
    pedidoActual.articulos.push({ nombre: nombreProducto, cantidad: cantidad });
    console.log("Agregado correctamente.");
}

function eliminarDelPedidoActual(nombreProducto) {
    let indiceEncontrado = -1;

    for (let i = 0; i < pedidoActual.articulos.length; i++) {
        if (pedidoActual.articulos[i].nombre.toLowerCase() === nombreProducto.toLowerCase()) {
            indiceEncontrado = i;
            break;
        }
    }

    if (indiceEncontrado !== -1) {
        console.log("Eliminado: " + pedidoActual.articulos[indiceEncontrado].nombre);
        pedidoActual.articulos.splice(indiceEncontrado, 1);
    } else {
        console.log("Producto no encontrado en el ticket del cliente.");
    }
}

// ==========================================
// FLUJO PRINCIPAL DE CAJA
// ==========================================

function iniciarCaja() {
    cargarPedidos(); // Leemos el archivo actualizado
    
    console.log("\n=== PEDIDOS PENDIENTES DE COBRO ===");
    if (pedidosGlobales.length === 0) {
        console.log("No hay pedidos pendientes.");
        console.log("Esperando nuevos pedidos desde el cliente...");
        rl.close();
        return;
    }

    // Mostramos los pedidos de forma muy simple
    for (let i = 0; i < pedidosGlobales.length; i++) {
        console.log("  ID: " + pedidosGlobales[i].idPedido + " | Cliente: " + pedidosGlobales[i].cliente);
    }

    rl.question("\nIngresa el ID del pedido a cobrar (o escribe 0 para salir): ", function(idElegido) {
        let idBuscado = parseInt(idElegido);

        if (idBuscado === 0) {
            console.log("Cerrando caja...");
            rl.close();
            return;
        }

        // Buscamos el pedido en el arreglo global
        pedidoActual = null;
        for (let i = 0; i < pedidosGlobales.length; i++) {
            if (pedidosGlobales[i].idPedido === idBuscado) {
                pedidoActual = pedidosGlobales[i];
                break;
            }
        }

        if (pedidoActual === null) {
            console.log("Ese ID no existe.");
            iniciarCaja(); // Reiniciamos si se equivoca
        } else {
            // Entramos al ciclo de cobro y modificaciones
            preguntarConfirmacion();
        }
    });
}

function preguntarConfirmacion() {
    mostrarResumenCaja();

    rl.question("¿Estás de acuerdo con la compra? (si/no): ", function(confirmacion) {
        let resp = confirmacion.toLowerCase().trim();

        if (resp === "si") {
            console.log("\nEl cobro se ha realizado con éxito");
            
            // Eliminamos el pedido de la lista global porque ya se pagó
            let indiceAEliminar = -1;
            for (let i = 0; i < pedidosGlobales.length; i++) {
                if (pedidosGlobales[i].idPedido === pedidoActual.idPedido) {
                    indiceAEliminar = i;
                    break;
                }
            }
            
            if (indiceAEliminar !== -1) {
                pedidosGlobales.splice(indiceAEliminar, 1);
            }
            
            guardarPedidos(); // Actualizamos el archivo
            iniciarCaja(); // Regresamos a la pantalla principal para cobrar el siguiente
        } 
        else if (resp === "no") {
            rl.question("¿Quieres agregar o eliminar producto? (agregar/eliminar): ", function(opcion) {
                let opc = opcion.toLowerCase().trim();

                if (opc === "agregar") {
                    rl.question("Producto: ", function(productoNuevo) {
                        rl.question("Precio unitario: ", function(precioTexto) {
                            rl.question("Cantidad: ", function(cantidadTexto) {
                                let precio = parseFloat(precioTexto);
                                let cantidad = parseInt(cantidadTexto);
                                
                                agregarAlPedidoActual(productoNuevo, precio, cantidad);
                                guardarPedidos(); // Guardamos el cambio
                                preguntarConfirmacion(); // Volvemos a mostrar el ticket actualizado
                            });
                        });
                    });
                } 
                else if (opc === "eliminar") {
                    rl.question("Nombre del producto a eliminar: ", function(productoAEliminar) {
                        eliminarDelPedidoActual(productoAEliminar);
                        guardarPedidos(); // Guardamos el cambio
                        preguntarConfirmacion(); 
                    });
                } 
                else {
                    console.log("Opción no válida.");
                    preguntarConfirmacion();
                }
            });
        } 
        else {
            console.log("Respuesta inválida, escriba 'si' o 'no'.");
            preguntarConfirmacion(); 
        }
    });
}

console.clear();
console.log("Sistema de Caja");
iniciarCaja();
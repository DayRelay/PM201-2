const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let productos = [];
let pedidos = [];

function cargarDatos() {
    if (fs.existsSync('base_productos.json')) {
        let contenido = fs.readFileSync('base_productos.json', 'utf8');
        productos = JSON.parse(contenido);
    }
    if (fs.existsSync('base_datos.json')) {
        let contenido = fs.readFileSync('base_datos.json', 'utf8');
        pedidos = JSON.parse(contenido);
    }
}

function guardarPedidos() {
    fs.writeFileSync('base_datos.json', JSON.stringify(pedidos, null, 2));
}


function simularTiemposDeCocina(pedido) {
    return new Promise((resolve, reject) => {
        console.log(`\n[Cocina]: Pedido de ${pedido.cliente} recibido. Empezando a preparar...`);
        
        setTimeout(() => {
            console.log(`\n[Cocina]: Preparando los artículos de ${pedido.cliente}...`);
            
            setTimeout(() => {
                let exito = Math.random() > 0.2; 
                if (exito) {
                    console.log(`\n[Cocina]: Empacando pedido de ${pedido.cliente}...`);
                    resolve("Listo para entregar"); 
                } else {
                    reject("Cancelado por falta de ingredientes en cocina"); 
                }
            }, 3000);
            
        }, 3000);
    });
}

function notificarCaja(error, mensajeExito) {
    if (error) {
        console.log("\n[Notificación Caja]: " + error);
    } else {
        console.log("\n[Notificación Caja]: " + mensajeExito + ". Ya puede pasar a cobrar.");
    }
}

// -------------------------------------------
// LÓGICA DE CLIENTE 
function mostrarPromocionesCliente() {
    console.log("\n--- PROMOCIONES ACTIVAS ---");
    let hayPromo = false;
    for (let i = 0; i < productos.length; i++) {
        if (productos[i].promocion !== "ninguna") {
            hayPromo = true;
            console.log("  - " + productos[i].nombre + " | Promo: " + productos[i].promocion);
        }
    }
    if (hayPromo === false) console.log("  No hay promociones por el momento.");
    console.log("***************************************");
}

function consultarProductosCliente() {
    console.log("\n--- MENÚ DE PRODUCTOS ---");
    for (let i = 0; i < productos.length; i++) {
        console.log("  [ID: " + productos[i].id + "] " + productos[i].nombre);
    }
    console.log("***************************************");
}

function listarPedidosCliente() {
    console.log("\n=== LISTADO GENERAL DE PEDIDOS ===");
    if (pedidos.length === 0) {
        console.log("  Aún no hay pedidos registrados.");
    } else {
        for (let i = 0; i < pedidos.length; i++) {
            let ped = pedidos[i];
            let detalleTexto = "";
            for (let j = 0; j < ped.articulos.length; j++) {
                detalleTexto = detalleTexto + ped.articulos[j].cantidad + "x " + ped.articulos[j].nombre;
                if (j < ped.articulos.length - 1) detalleTexto = detalleTexto + ", ";
            }
            console.log("  Pedido #" + ped.idPedido + " | Cliente: " + ped.cliente + " | Detalles: [" + detalleTexto + "]");
        }
    }
    console.log("----------------------------------");
}

function menuCliente() {
    cargarDatos(); // Sincronizamos siempre que mostramos el menú principal
    console.log("\n--- ÁREA DE CLIENTES ---");
    console.log("  1. Ver Promociones\n  2. Consultar Productos\n  3. Crear un Nuevo Pedido\n  4. Ver Listado de Pedidos\n  5. Salir");

    rl.question("Elige una opción (1-5): ", function(opcion) {
        let opc = opcion.trim();
        if (opc === '1') {
            mostrarPromocionesCliente();
            menuCliente();
        } else if (opc === '2') {
            consultarProductosCliente();
            menuCliente();
        } else if (opc === '3') {
            rl.question("\nEscribe el nombre del cliente: ", function(nombreCliente) {
                let articulosComprados = [];

                function preguntarProducto() {
                    consultarProductosCliente();
                    rl.question("Escribe el ID del producto que desea: ", function(idProducto) {
                        rl.question("¿Cuántas unidades desea?: ", function(cantidad) {
                            let idNum = parseInt(idProducto);
                            let cantNum = parseInt(cantidad);
                            let productoEncontrado = null;
                            
                            for (let i = 0; i < productos.length; i++) {
                                if (productos[i].id === idNum) {
                                    productoEncontrado = productos[i];
                                    break; 
                                }
                            }

                            if (productoEncontrado !== null) {
                                articulosComprados.push({ nombre: productoEncontrado.nombre, cantidad: cantNum });
                                console.log("Agregado: " + cantNum + "x " + productoEncontrado.nombre);
                            } else {
                                console.log("Error: Ese ID no existe.");
                            }

                            rl.question("¿Deseas agregar algo más al pedido? (si / no): ", function(respuesta) {
                                if (respuesta.toLowerCase() === "si") {
                                    preguntarProducto(); 
                                } else {
                                    if (articulosComprados.length > 0) {
                                        let nuevoId = 1;
                                        if (pedidos.length > 0) nuevoId = pedidos[pedidos.length - 1].idPedido + 1;
                                        
                                        let nuevoPedido = { idPedido: nuevoId, cliente: nombreCliente, articulos: articulosComprados };
                                        
                                        console.log("\nEnviando pedido a la cocina... (Puedes seguir usando el menú mientras se prepara)");

                                        simularTiemposDeCocina(nuevoPedido)
                                            .then((resultado) => {
                                                cargarDatos(); // Cargamos antes de pushear por si hubo cambios externos
                                                pedidos.push(nuevoPedido);
                                                guardarPedidos(); 
                                                notificarCaja(null, "El pedido de " + nombreCliente + " está " + resultado);
                                            })
                                            .catch((error) => {
                                                notificarCaja(error, null);
                                            });
                                            
                                    } else {
                                        console.log("\nPedido cancelado.");
                                    }
                                    
                                    menuCliente(); 
                                }
                            });
                        });
                    });
                }
                preguntarProducto();
            });
        } else if (opc === '4') {
            listarPedidosCliente();
            menuCliente();
        } else if (opc === '5') {
            console.log("\nGracias por su preferencia\n");
            rl.close();
        } else {
            console.log("\nOpción inválida.");
            menuCliente();
        }
    });
}

console.clear();
menuCliente();
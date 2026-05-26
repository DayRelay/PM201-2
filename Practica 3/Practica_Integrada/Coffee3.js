const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let productos = [];
let pedidos = [];
let pedidoActualCaja = null; 

function cargarDatos() {
    if (fs.existsSync('base_productos.json')) {
        let contenido = fs.readFileSync('base_productos.json', 'utf8');
        productos = JSON.parse(contenido);
    } else {
        productos = [
            { id: 1, nombre: "Cafe", precio: 85, categoria: "bebidas", promocion: "ninguna" }, 
            { id: 2, nombre: "Pan", precio: 40, categoria: "postres", promocion: "2x1" },       
            { id: 3, nombre: "Leche", precio: 25, categoria: "bebidas", promocion: "10%" },
            { id: 4, nombre: "Pastel", precio: 120, categoria: "postres", promocion: "ninguna" }
        ];
        guardarProductos();
    }

    if (fs.existsSync('base_datos.json')) {
        let contenido = fs.readFileSync('base_datos.json', 'utf8');
        pedidos = JSON.parse(contenido);
    }
}

function guardarProductos() {
    fs.writeFileSync('base_productos.json', JSON.stringify(productos, null, 2));
}

function guardarPedidos() {
    fs.writeFileSync('base_datos.json', JSON.stringify(pedidos, null, 2));
}

cargarDatos();


// --------------------------------------------------
// COCINA 
function listarProductosCocina() {
    console.log("\n--- INVENTARIO DE COCINA ---");
    console.table(productos); 
}

function menuBuscarCocina() {
    console.log("\n MENÚ DE BÚSQUEDA Y FILTRADO");
    console.log("1. Buscar Productos Baratos (< $50)");
    console.log("2. Buscar Producto Más Caro");
    console.log("3. Buscar Bebidas");
    console.log("4. Buscar Postres");
    console.log("5. Mostrar Promociones Activas");
    console.log("6. Regresar al menú de Cocina");

    rl.question("\nSelecciona una opción: ", (opcion) => {
        switch (opcion.trim()) {
            case "1":
                console.table(productos.filter(p => p.precio < 50));
                break;
            case "2":
                let max = Math.max(...productos.map(p => p.precio));
                let caro = productos.find(p => p.precio === max);
                console.table(caro ? [caro] : []);
                break;
            case "3":
                console.table(productos.filter(p => p.categoria.toLowerCase() === "bebidas"));
                break;
            case "4":
                console.table(productos.filter(p => p.categoria.toLowerCase() === "postres"));
                break;
            case "5":
                let promos = productos.filter(p => p.promocion !== "ninguna");
                if (promos.length === 0) console.log("No hay promociones activas.");
                else {
                    promos.forEach(p => {
                        if (p.promocion === "2x1") console.log(`• ${p.nombre}: ¡Lleva 2 por $${p.precio}!`);
                        if (p.promocion === "10%") console.log(`• ${p.nombre}: De $${p.precio} a $${(p.precio * 0.9).toFixed(2)}`);
                    });
                }
                break;
            case "6":
                return menuCocina();
            default:
                console.log("\nOpción no válida.");
        }
        menuBuscarCocina();
    });
}

function menuCocina() {
    listarProductosCocina();
    console.log("1. Agregar producto");
    console.log("\n2. Editar producto");
    console.log("\n3. Eliminar producto");
    console.log("\n4. Buscar o Filtrar");
    console.log("\n5. Crear Promoción");
    console.log("\n6. Volver al Menú Principal");

    rl.question("\nOpción: ", (opcion) => {
        if (opcion === "1") {
            rl.question("Nombre: ", (nombre) => {
                rl.question("Precio: ", (precio) => {
                    rl.question("Categoría (bebidas/postres): ", (cat) => {
                        rl.question("Promoción (ninguna/10%/2x1): ", (promo) => {
                            let pr = promo.toLowerCase().trim();
                            if(pr !== "10%" && pr !== "2x1") pr = "ninguna";
                            
                            productos.push({
                                id: productos.length ? productos[productos.length - 1].id + 1 : 1,
                                nombre: nombre, precio: Number(precio), categoria: cat || "general", promocion: pr
                            });
                            guardarProductos(); 
                            menuCocina(); 
                        });
                    });
                });
            });
        } else if (opcion === "2") {
            rl.question("ID del producto a editar: ", (id) => {
                let index = productos.findIndex(p => p.id === Number(id)); 
                if (index !== -1) {
                    rl.question(`Nuevo nombre (${productos[index].nombre}): `, (nom) => {
                        rl.question(`Nuevo precio (${productos[index].precio}): `, (pre) => {
                            rl.question(`Nueva promoción (${productos[index].promocion}): `, (pro) => {
                                if (nom) productos[index].nombre = nom;
                                if (pre) productos[index].precio = Number(pre);
                                if (pro) productos[index].promocion = pro;
                                guardarProductos(); 
                                menuCocina(); 
                            });
                        });
                    });
                } else {
                    console.log("ID no encontrado.");
                    menuCocina();
                }
            });
        } else if (opcion === "3") {
            rl.question("ID a eliminar: ", (id) => {
                let index = productos.findIndex(p => p.id === Number(id)); 
                if (index !== -1) {
                    productos.splice(index, 1);
                    guardarProductos(); 
                    console.log("Eliminado con éxito.");
                } else console.log("ID no encontrado.");
                menuCocina(); 
            });
        } else if (opcion === "4") {
            menuBuscarCocina();
        } else if (opcion === "5") {
            rl.question("ID para promoción: ", (id) => {
                let index = productos.findIndex(p => p.id === Number(id));
                if (index !== -1) {
                    rl.question("Opción (1: 10%, 2: 2x1, 3: ninguna): ", (opc) => {
                        if (opc === "1") productos[index].promocion = "10%";
                        else if (opc === "2") productos[index].promocion = "2x1";
                        else if (opc === "3") productos[index].promocion = "ninguna";
                        guardarProductos(); 
                        menuCocina(); 
                    });
                } else {
                    console.log("ID no encontrado.");
                    menuCocina();
                }
            });
        } else if (opcion === "6") {
            menuPrincipal(); 
        } else {
            menuCocina(); 
        }
    });
}

// ==========================================
// ASINCRONÍA Y CALLBACKS (Promesas y setTimeout)
// ==========================================
function simularTiemposDeCocina(pedido) {
    return new Promise((resolve, reject) => {
        console.log(`\n[Cocina]: Pedido de ${pedido.cliente} recibido. Empezando a preparar...`);
        
        // Esperamos 3 segundos para empezar a preparar
        setTimeout(() => {
            console.log(`\n[Cocina]: Preparando los artículos de ${pedido.cliente}...`);
            
            // Esperamos otros 3 segundos para empacar y definir si hubo éxito
            setTimeout(() => {
                // Simulamos que el 80% de las veces sale bien, 20% falta ingrediente
                let exito = Math.random() > 0.2; 
                
                if (exito) {
                    console.log(`\n[Cocina]: Empacando pedido de ${pedido.cliente}...`);
                    resolve("Listo para entregar"); // ¡La promesa se cumple!
                } else {
                    reject("Cancelado por falta de ingredientes en cocina"); // ¡Falla la promesa!
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
// CLIENTE 
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
    console.log("\n--- ÁREA DE CLIENTES ---");
    console.log("  1. Ver Promociones\n  2. Consultar Productos\n  3. Crear un Nuevo Pedido\n  4. Ver Listado de Pedidos\n  5. Volver al Menú Principal");

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
                                    // AQUÍ INTEGRAMOS LA ASINCRONÍA
                                    if (articulosComprados.length > 0) {
                                        let nuevoId = 1;
                                        if (pedidos.length > 0) nuevoId = pedidos[pedidos.length - 1].idPedido + 1;
                                        
                                        let nuevoPedido = { idPedido: nuevoId, cliente: nombreCliente, articulos: articulosComprados };
                                        
                                        console.log("\nEnviando pedido a la cocina... (Puedes seguir usando el menú mientras se prepara)");

                                        // Llamamos a la Promesa de la cocina
                                        simularTiemposDeCocina(nuevoPedido)
                                            .then((resultado) => {
                                                // Si sale bien: guardamos el pedido y notificamos
                                                pedidos.push(nuevoPedido);
                                                guardarPedidos(); 
                                                notificarCaja(null, "El pedido de " + nombreCliente + " está " + resultado);
                                            })
                                            .catch((error) => {
                                                // Si falla: no guardamos nada y enviamos el error al callback
                                                notificarCaja(error, null);
                                            });
                                            
                                    } else {
                                        console.log("\nPedido cancelado.");
                                    }
                                    
                                    // Volvemos al menú inmediatamente sin importar si la comida está lista o no
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
            menuPrincipal();
        } else {
            console.log("\nOpción inválida.");
            menuCliente();
        }
    });
}


// -------------------------------------------
// CAJA
function obtenerPrecioCaja(nombreBuscado) {
    for (let i = 0; i < productos.length; i++) {
        if (productos[i].nombre.toLowerCase() === nombreBuscado.toLowerCase()) {
            if (productos[i].promocion === "10%") {
                return productos[i].precio * 0.9;
            }
            return productos[i].precio;
        }
    }
    return 0; 
}

function mostrarResumenCaja() {
    console.log("\n << TICKET >> ");
    console.log("Cliente: " + pedidoActualCaja.cliente);
    let subtotalCalculado = 0;

    for (let i = 0; i < pedidoActualCaja.articulos.length; i++) {
        let articulo = pedidoActualCaja.articulos[i];
        let precioU = obtenerPrecioCaja(articulo.nombre);
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

function confirmarCobro() {
    mostrarResumenCaja();
    rl.question("¿Estás de acuerdo con la compra? (si/no): ", function(confirmacion) {
        let resp = confirmacion.toLowerCase().trim();

        if (resp === "si") {
            console.log("\n¡Cobro realizado con éxito! Gracias por tu compra.");
            
            let indiceAEliminar = -1;
            for (let i = 0; i < pedidos.length; i++) {
                if (pedidos[i].idPedido === pedidoActualCaja.idPedido) {
                    indiceAEliminar = i;
                    break;
                }
            }
            if (indiceAEliminar !== -1) pedidos.splice(indiceAEliminar, 1);
            
            guardarPedidos(); 
            menuCaja(); 
        } 
        else if (resp === "no") {
            rl.question("¿Quieres agregar o eliminar producto? (agregar/eliminar): ", function(opcion) {
                let opc = opcion.toLowerCase().trim();

                if (opc === "agregar") {
                    rl.question("Nombre exacto del producto: ", function(productoNuevo) {
                        rl.question("Cantidad: ", function(cantidadTexto) {
                            let cantidad = parseInt(cantidadTexto);
                            let existe = false;
                            for (let i = 0; i < productos.length; i++) {
                                if(productos[i].nombre.toLowerCase() === productoNuevo.toLowerCase()) existe = true;
                            }
                            if (existe === true) {
                                pedidoActualCaja.articulos.push({ nombre: productoNuevo, cantidad: cantidad });
                                console.log("Agregado correctamente.");
                            } else console.log("Producto no existe en cocina.");
                            
                            guardarPedidos(); 
                            confirmarCobro(); 
                        });
                    });
                } 
                else if (opc === "eliminar") {
                    rl.question("Nombre del producto a eliminar: ", function(productoAEliminar) {
                        let indice = -1;
                        for (let i = 0; i < pedidoActualCaja.articulos.length; i++) {
                            if (pedidoActualCaja.articulos[i].nombre.toLowerCase() === productoAEliminar.toLowerCase()) {
                                indice = i; break;
                            }
                        }
                        if (indice !== -1) {
                            pedidoActualCaja.articulos.splice(indice, 1);
                            console.log("Eliminado.");
                        } else console.log("No encontrado en el ticket.");
                        
                        guardarPedidos(); 
                        confirmarCobro(); 
                    });
                } 
                else {
                    console.log("Opción no válida.");
                    confirmarCobro();
                }
            });
        } 
        else {
            console.log("Respuesta inválida.");
            confirmarCobro(); 
        }
    });
}

function menuCaja() {
    console.log("\n<< PEDIDOS PENDIENTES DE COBRO >>");
    if (pedidos.length === 0) {
        console.log("No hay pedidos pendientes.");
        console.log("Presiona Enter para volver al Menú Principal...");
        rl.question("", function() {
            menuPrincipal();
        });
        return;
    }

    for (let i = 0; i < pedidos.length; i++) {
        console.log("  ID: " + pedidos[i].idPedido + " | Cliente: " + pedidos[i].cliente);
    }

    rl.question("\nIngresa el ID del pedido a cobrar (o escribe 0 para salir): ", function(idElegido) {
        let idBuscado = parseInt(idElegido);

        if (idBuscado === 0) {
            menuPrincipal();
            return;
        }

        pedidoActualCaja = null;
        for (let i = 0; i < pedidos.length; i++) {
            if (pedidos[i].idPedido === idBuscado) {
                pedidoActualCaja = pedidos[i];
                break;
            }
        }

        if (pedidoActualCaja === null) {
            console.log("Ese ID no existe.");
            menuCaja(); 
        } else {
            confirmarCobro();
        }
    });
}

// ---------------------------------------
// MENÚ PRINCIPAL DEL SISTEMA
function menuPrincipal() {
    console.log("\nMenú Principal");
    console.log("  1. Cocina");
    console.log("  2. Cliente ");
    console.log("  3. Caja ");
    console.log("  4. Apagar Sistema");

    rl.question("\n¿A qué área deseas ingresar? (1-4): ", function(opcion) {
        let opc = opcion.trim();
        if (opc === "1") {
            menuCocina();
        } else if (opc === "2") {
            menuCliente();
        } else if (opc === "3") {
            menuCaja();
        } else if (opc === "4") {
            console.log("\nGracias por su preferencia\n");
            rl.close();
        } else {
            console.log("\nOpción no válida.");
            menuPrincipal();
        }
    });
}

// Inicializar programa
console.clear();
menuPrincipal();
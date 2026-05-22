const readline = require('readline');
const fs = require('fs'); // IMPORTANTE: Herramienta para guardar archivos

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let productos = [
    { id: 1, nombre: "Hamburguesa Clásica", precio: 120 },
    { id: 2, nombre: "Papas Fritas", precio: 50 },
    { id: 3, nombre: "Refresco", precio: 30 },
    { id: 4, nombre: "Helado", precio: 45 }
];

let promociones = [
    "¡10% de descuento en tu primera compra!",
    "Combo: Hamburguesa + Papas + Refresco por $180"
];

let pedidos = []; 

// Función nueva para guardar en el disco duro
function guardarBaseDeDatos() {
    let textoPlano = JSON.stringify(pedidos); 
    fs.writeFileSync('base_datos.json', textoPlano); // Crea el archivo compartido
}

// Cargar datos previos si el archivo ya existe
if (fs.existsSync('base_datos.json')) {
    let contenido = fs.readFileSync('base_datos.json', 'utf8');
    pedidos = JSON.parse(contenido);
}

function mostrarPromociones() {
    console.log("\n--- PROMOCIONES ---");
    for (let i = 0; i < promociones.length; i++) {
        console.log("  " + (i + 1) + ". " + promociones[i]);
    }
    console.log("=================================");
}

function consultarProductos() {
    console.log("\n--- MENÚ DE PRODUCTOS ---");
    for (let i = 0; i < productos.length; i++) {
        console.log("  [ID: " + productos[i].id + "] " + productos[i].nombre);
    }
    console.log("===================================");
}

function listarPedidos() {
    console.log("\n=== LISTADO GENERAL DE PEDIDOS ===");
    if (pedidos.length === 0) {
        console.log("  Aún no hay pedidos registrados.");
    } else {
        for (let i = 0; i < pedidos.length; i++) {
            let ped = pedidos[i];
            let detalleTexto = "";

            for (let j = 0; j < ped.articulos.length; j++) {
                let art = ped.articulos[j];
                detalleTexto = detalleTexto + art.cantidad + "x " + art.nombre;
                
                if (j < ped.articulos.length - 1) {
                    detalleTexto = detalleTexto + ", ";
                }
            }
            console.log("  Pedido #" + ped.idPedido + " | Cliente: " + ped.cliente + " | Detalles: [" + detalleTexto + "]");
        }
    }
    console.log("==================================");
}

function iniciarMenu() {
    console.log("\nSelecciona una opción:");
    console.log("  1. Ver Promociones");
    console.log("  2. Consultar Productos");
    console.log("  3. Crear un Nuevo Pedido");
    console.log("  4. Ver Listado de Pedidos");
    console.log("  5. Salir");

    rl.question("Elige una opción (1-5): ", function(opcion) {
        switch (opcion.trim()) {
            case '1':
                mostrarPromociones();
                iniciarMenu();
                break;
            case '2':
                consultarProductos();
                iniciarMenu();
                break;
            case '3':
                rl.question("\nEscribe el nombre del cliente: ", function(nombreCliente) {
                    let articulosComprados = [];

                    function preguntarProducto() {
                        consultarProductos();
                        
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
                                    articulosComprados.push({
                                        nombre: productoEncontrado.nombre,
                                        cantidad: cantNum
                                    });
                                    console.log("Agregado: " + cantNum + "x " + productoEncontrado.nombre);
                                } else {
                                    console.log("Error: Ese ID no existe.");
                                }

                                rl.question("¿Deseas agregar algo más al pedido? (si / no): ", function(respuesta) {
                                    if (respuesta.toLowerCase() === "si") {
                                        preguntarProducto(); 
                                    } else {
                                        if (articulosComprados.length > 0) {
                                            pedidos.push({
                                                idPedido: pedidos.length + 1,
                                                cliente: nombreCliente,
                                                articulos: articulosComprados
                                            });
                                            guardarBaseDeDatos(); // <--- GUARDAMOS AL TERMINAR EL PEDIDO
                                            console.log("\nPedido realizado, por favor pase a caja.");
                                        } else {
                                            console.log("\nPedido cancelado.");
                                        }
                                        iniciarMenu(); 
                                    }
                                });
                            });
                        });
                    }
                    preguntarProducto();
                });
                break;
            case '4':
                listarPedidos();
                iniciarMenu();
                break;
            case '5':
                console.log("\nGracias por su preferencia\n");
                rl.close(); 
                break;
            default:
                console.log("\nPor favor, selecciona una opción válida (1-5).");
                iniciarMenu();
                break;
        }
    });
}

console.clear();
console.log("Menú Cliente");
iniciarMenu();
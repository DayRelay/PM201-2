const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

let productos = [
    { id: 1, nombre: "Cafe", precio: 85, categoria: "bebidas", promocion: "ninguna" }, 
    { id: 2, nombre: "Pan", precio: 40, categoria: "postres", promocion: "2x1" },       
    { id: 3, nombre: "Leche", precio: 25, categoria: "bebidas", promocion: "10%" },
    { id: 4, nombre: "Pastel", precio: 120, categoria: "postres", promocion: "ninguna" }
];

// Función para mostrar los productos
function listarProductos() {
    console.log("\n INVENTARIO DE COCINA");
    console.table(productos); 
}

// Menú secundario para realizar las búsquedas solicitadas
function menuBuscar() {
    console.log("\n MENÚ DE BÚSQUEDA Y FILTRADO");
    console.log("1. Buscar Productos Baratos (< $50) [filter]");
    console.log("2. Buscar Producto Más Caro [find]");
    console.log("3. Buscar Bebidas [filter]");
    console.log("4. Buscar Postres [filter]");
    console.log("5. Mostrar Lista de Promociones Activas [filter]");
    console.log("6. Volver al menú principal");

    readline.question("\nSelecciona una opción de búsqueda: ", function(subOpcion) {
        switch (subOpcion) {
            case "1":
                let baratos = productos.filter(p => p.precio < 50);
                console.log("\n Productos Baratos");
                console.table(baratos);
                break;
            case "2":
                let precioMaximo = Math.max(...productos.map(p => p.precio));
                let masCaro = productos.find(p => p.precio === precioMaximo);
                console.log("\n Producto Más Caro ");
                console.table(masCaro ? [masCaro] : []);
                break;
            case "3":
                let bebidas = productos.filter(p => p.categoria.toLowerCase() === "bebidas");
                console.log("\n Bebidas");
                console.table(bebidas);
                break;
            case "4":
                let postres = productos.filter(p => p.categoria.toLowerCase() === "postres");
                console.log("\n Postres");
                console.table(postres);
                break;
            case "5":
                let enPromocion = productos.filter(p => p.promocion !== "ninguna");
                
                console.log("\n--- LISTA DE PROMOCIONES DEL DÍA ---");
                if (enPromocion.length === 0) {
                    console.log("No hay promociones activas por el momento.");
                } else {
                    enPromocion.forEach(p => {
                        if (p.promocion === "2x1") {
                            console.log(`• [${p.categoria.toUpperCase()}] ${p.nombre}: ¡Lleva 2 por solo $${p.precio}! (Promoción 2x1)`);
                        } else if (p.promocion === "10%") {
                            let precioDescuento = p.precio * 0.9;
                            console.log(`• [${p.categoria.toUpperCase()}] ${p.nombre}: De $${p.precio} a solo $${precioDescuento.toFixed(2)} (10% de descuento)`);
                        }
                    });
                }
                console.log("------------------------------------\n");
                break;
            case "6":
                menu();
                return; 
            default:
                console.log("\nOpción no válida.");
        }
        menuBuscar();
    });
}

// Función principal del menú interactivo
function menu() {
    listarProductos();
    
    console.log("Selecciona una opción:");
    console.log("1. Agregar producto");
    console.log("2. Editar producto");
    console.log("3. Eliminar producto");
    console.log("4. Buscar o Filtrar productos");
    console.log("5. Crear Promoción (Cocina) ");
    console.log("6. Salir");
    
    readline.question("\nOpción: ", function(opcion) {

        // AGREGAR PRODUCTO
        if (opcion === "1") {
            readline.question("Nombre del producto: ", function(nombre) {
                readline.question("Precio del producto: ", function(precio) {
                    readline.question("Categoría (bebidas/postres): ", function(categoria) {
                        readline.question("Promoción (ninguna/10%/2x1): ", function(promoAns) {
                            
                            let promoFormateada = promoAns.toLowerCase().trim();
                            if(promoFormateada !== "10%" && promoFormateada !== "2x1") {
                                promoFormateada = "ninguna";
                            }

                            productos.push({
                                id: productos.length > 0 ? productos[productos.length - 1].id + 1 : 1,
                                nombre: nombre,
                                precio: Number(precio),
                                categoria: categoria.toLowerCase() || "general",
                                promocion: promoFormateada
                            });
                            
                            console.log(`\n¡"${nombre}" agregado con éxito!`);
                            menu(); 
                        });
                    });
                });
            });

        // EDITAR PRODUCTO
        } else if (opcion === "2") {
            readline.question("ID del producto a editar: ", function(id) {
                let index = productos.findIndex(p => p.id === Number(id)); 
                
                if (index !== -1) {
                    readline.question(`Nuevo nombre (actual: ${productos[index].nombre}): `, function(nuevoNombre) {
                        readline.question(`Nuevo precio (actual: ${productos[index].precio}): `, function(nuevoPrecio) {
                            readline.question(`Nueva categoría (actual: ${productos[index].categoria}): `, function(nuevaCategoria) {
                                readline.question(`Nueva promoción (ninguna/10%/2x1) (actual: ${productos[index].promocion}): `, function(nuevaPromo) {
                                    
                                    if (nuevoNombre) productos[index].nombre = nuevoNombre;
                                    if (nuevoPrecio) productos[index].precio = Number(nuevoPrecio);
                                    if (nuevaCategoria) productos[index].categoria = nuevaCategoria.toLowerCase();
                                    
                                    if (nuevaPromo) {
                                        let promoCheck = nuevaPromo.toLowerCase().trim();
                                        productos[index].promocion = (promoCheck === "10%" || promoCheck === "2x1") ? promoCheck : "ninguna";
                                    }
                                    
                                    console.log("\n¡Producto editado con éxito!");
                                    menu(); 
                                });
                            });
                        });
                    });
                } else {
                    console.log("\nID no encontrado.");
                    menu();
                }
            });

        // ELIMINAR PRODUCTO
        } else if (opcion === "3") {
            readline.question("ID del producto a eliminar: ", function(id) {
                let index = productos.findIndex(p => p.id === Number(id)); 
                
                if (index !== -1) {
                    let eliminado = productos.splice(index, 1);
                    console.log(`\n¡"${eliminado[0].nombre}" eliminado con éxito!`);
                } else {
                    console.log("\nID no encontrado.");
                }
                menu(); 
            });

        // MENÚ DE BÚSQUEDAS
        } else if (opcion === "4") {
            menuBuscar();
        // ASIGNAR PROMOCIONES DESDE LA COCINA
        } else if (opcion === "5") {
            readline.question("ID del producto al que deseas aplicarle una promoción: ", function(id) {
                let index = productos.findIndex(p => p.id === Number(id));
                if (index !== -1) {
                    console.log(`\nProducto seleccionado: ${productos[index].nombre} (Precio: $${productos[index].precio})`);
                    console.log("Selecciona el tipo de promoción:");
                    console.log("1. Descuento del 10%");
                    console.log("2. Oferta 2x1");
                    console.log("3. Quitar promoción (ninguna)");

                    readline.question("\nOpción de promoción: ", function(opcPromo) {
                        if (opcPromo === "1") {
                            productos[index].promocion = "10%";
                            console.log(`\n¡Promoción '10%' aplicada con éxito a ${productos[index].nombre}!`);
                        } else if (opcPromo === "2") {
                            productos[index].promocion = "2x1";
                            console.log(`\n¡Promoción '2x1' aplicada con éxito a ${productos[index].nombre}!`);
                        } else if (opcPromo === "3") {
                            productos[index].promocion = "ninguna";
                            console.log(`\nSe han removido las promociones de ${productos[index].nombre}.`);
                        } else {
                            console.log("\nOpción inválida. No se realizaron cambios.");
                        }
                        menu(); // Regresar al menú principal
                    });
                } else {
                    console.log("\nID no encontrado.");
                    menu();
                }
            });

        // SALIR DEL PROGRAMA
        } else if (opcion === "6") {
            console.log("\n Hasta luego");
            readline.close(); 
        } else {
            console.log("\nOpción no válida, intenta de nuevo.");
            menu(); 
        }
    });
}
menu();
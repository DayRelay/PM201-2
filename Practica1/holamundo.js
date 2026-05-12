/* Js del lado del servidor */

console.log("Hola Mundo JS con Node")

/* calculo */
let edad1= 12
let edad2= 34

console.log("Edad promedio: ")
console.log((edad1+edad2)/2)

/* medir el timepo del proceso*/
console.time("miProceso")

for(let i =0; i< 1000000; i++){  }

console.timeEnd("miProceso")

/* Objetivo tipo tabla */

let usuarios=[
    {nombre: "Cristian", edad: 20},
    {nombre: "Erasto", edad: 20},
];

console.table(usuarios)

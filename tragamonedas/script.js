const imagenes = [
    { nombre: "limon", url: "./imagenes/limon.jpg" },
    { nombre: "campana", url: "./imagenes/campana.jpg" },
    { nombre: "diamante", url: "./imagenes/diamante.jpg" },
    { nombre: "cereza", url: "./imagenes/cereza.jpg" },
    { nombre: "herradura", url: "./imagenes/herradura.jpg" },
    { nombre: "uva", url: "./imagenes/uva.jpg" },
    { nombre: "bar", url: "./imagenes/bar.png" }
];

const costoJugada = 25;
let saldoDevcoins = 0;
let numImagen = [];


//creo un bucle con la variable i con un valor inicial de 0 y que se repita hasta llegar a 3

function tirar() {
    if (saldoDevcoins < costoJugada) {
        alert("Saldo insufuciente. Necesitas al menos 100 devcoins para tirar.")
        return;
    }

    saldoDevcoins -= costoJugada;
    actualizarSaldoDevcoins();

    numImagen = [];
    for (let i = 0; i < 3; i++) {
        numImagen.push(num_aleatorio());
        cambiar_imagen(i, numImagen[i].url);
    }

    const jugadaActual = "Jugada: " + numImagen[0].nombre + " - " + numImagen[1].nombre + " - " + numImagen[2].nombre;
    actualizarHistorial(jugadaActual);

    verificarPremio();
}

//escoge un numero aleatorio 
function num_aleatorio() {
    const numAzar = Math.floor(Math.random() * imagenes.length);
    return imagenes[numAzar];
}

//cambia las imagenes en la

function cambiar_imagen(num, img) {
    const imagenCambiar = document.getElementsByClassName("imagen")[num].getElementsByTagName("img")[0];
    imagenCambiar.src = img;
}

function actualizarSaldoDevcoins() {
    document.getElementById("dinero-devcoins").textContent = saldoDevcoins.toFixed(2);
}

//convierte los pesos a devcoins
function convertir() {
    var valorP = parseFloat(document.getElementById("pesos-convertir").value);
    if (isNaN(valorP) || valorP === 0) {
        alert("Ingresa un valor válido en pesos antes de convertir.");
        return;
    }

    var saldoPesos = parseFloat(document.getElementById("dinero-pesos").textContent);

    if (valorP > saldoPesos) {
        alert("No dispones de esa cantidad de pesos para realizar la conversión");
        return;
    }

    var devcoins = valorP / 3;

    // actualiza el div con el saldo en devcoins
    saldoDevcoins += devcoins;

    // actualiza los devcoins y los limita a 2 decimales
    document.getElementById("dinero-devcoins").textContent = saldoDevcoins.toFixed(2);

    saldoPesos -= valorP;

    document.getElementById("dinero-pesos").textContent = saldoPesos.toFixed(0);

    var jugadaActual = "Conversion: " + valorP + " pesos a " + devcoins.toFixed(2) + " devcoins";
    (jugadaActual, [])
}

function ingresarPesos() {
    var valorIngresadoPesos = parseFloat(document.getElementById("pesos-ingresados").value);
    if (isNaN(valorIngresadoPesos) || valorIngresadoPesos === 0) {
        alert("Ingresa un valor entre 1 y 9999 en pesos.");
    } else {
        var saldoPesos = parseFloat(document.getElementById("dinero-pesos").textContent)
        saldoPesos += valorIngresadoPesos;
        document.getElementById("dinero-pesos").textContent = saldoPesos.toFixed(0);
    }
}

/**
 * guarda el historial en el elemento creado li y en el for agrega las imagenes que salieron 
 * en la jugada reciente y con appendChild los agregamos en le contenedor
 */
function actualizarHistorial(jugada) {
    var listaJugadas = document.getElementById("lista-jugadas");
    var nuevaJugada = document.createElement("li");

    var jugadaTexto = document.createElement("span");
    jugadaTexto.textContent = "Jugada: ";
    nuevaJugada.appendChild(jugadaTexto);

    for (var i = 0; i < numImagen.length; i++) {
        var imagen = document.createElement("img");
        var imagenInfo = imagenes.find(img => img.nombre === numImagen[i].nombre);
        imagen.src = imagenInfo.url;
        imagen.classList.add("imagen-historial");
        nuevaJugada.appendChild(imagen);
    }

    listaJugadas.appendChild(nuevaJugada);
}

// verifica las casillas y en caso de ser 3 iguales se entreaga un premio, si son 2 iguales es la mitad 
function verificarPremio() {
    const premios = {
        limon: 600,
        campana: 500,
        diamante: 1200,
        cereza: 300,
        herradura: 700,
        uva: 800,
        bar: 2500,
    };

    const posImg1 = numImagen[0].nombre;
    const posImg2 = numImagen[1].nombre;
    const posImg3 = numImagen[2].nombre;

    // verifica las combinaciones y en caso de ser 3 img iguales dara el premio economico que se definio arriba
    if (posImg1 === posImg2 && posImg2 === posImg3) {
        if (premios[posImg1]) {
            saldoDevcoins += premios[posImg1];
            actualizarSaldoDevcoins();
            setTimeout(function () {
                alert("¡Ganaste " + premios[posImg1] + " devcoins!");
            }, 200);
            return;
        }
    }

    // verifica y compara la casilla 1 con las 2/3 y da la mitad del premio completo en caso de ser 2 img iguales
    if (posImg1 === posImg2 || posImg1 === posImg3) {
        if (premios[posImg1]) {
            saldoDevcoins += premios[posImg1] / 2;
            actualizarSaldoDevcoins();
            setTimeout(function () {
                alert("¡Ganaste " + premios[posImg1] / 2 + " devcoins!");
            }, 200);
            return;
        }
    }

    // verifica y compara la casilla 2 con la 3 y da la mitad del premio completo en caso de ser 2 img iguales

    if (posImg2 === posImg3) {
        if (premios[posImg2]) {
            saldoDevcoins += premios[posImg2] / 2;
            actualizarSaldoDevcoins();
            setTimeout(function () {
                alert("¡Ganaste " + premios[posImg2] / 2 + " devcoins!");
            }, 200);
            return;
        }
    }
}

function inicializarJuego() {
    document.getElementById("iniciar").onclick = tirar;
}
function iniciarJuego() {
    inicializarJuego();
    actualizarSaldoDevcoins();
}

iniciarJuego();

let tiempo = 0;
let cronometro;
let tablero;

function iniciarCronometro() {
    if (!cronometro) { // Inicia el cronómetro solo si no está activo
        tiempo = 0;
        actualizarCronometro();
        cronometro = setInterval(function () {
            tiempo++;
            actualizarCronometro();
        }, 1000);
    }
}

function detenerCronometro() {
    clearInterval(cronometro);
    cronometro = null; // Restablece el cronómetro
}

function actualizarCronometro() {
    const cronometroElemento = document.getElementById('cronometro');
    cronometroElemento.textContent = tiempo + `s`;
}

function hacerClic(fila, columna) {
    const casilla = document.getElementById(`casilla-${fila * tablero[0].length + columna}`);

    if (tablero[fila][columna].revelar) {
        return; // no hagas nada si la casilla ya se ha revelado
    }

    if (tablero[fila][columna].value === '💥') {
        finalizarJuego();
        revelarBombas();
        detenerCronometro();
    } else {
        // revela las casillas y verifica si ganaste
        tablero[fila][columna].revelar = true;
        casilla.innerText = tablero[fila][columna].value;

        if (victoria()) {
            mostrarMensaje("¡Ganaste!")
        }
    }
}

function victoria() {
    for (let i = 0; i < tablero.length; i++) {
        for (let j = 0; j < tablero[0].length; j++) {
            if (tablero[i][j].value !== '💥' && !tablero[i][j].revelar) {
                return false;
            }
        }
    }
    return true;
}

function mostrarMensaje(mensaje) {
    window.confirm(mensaje)
}

function revelarBombas() {
    for (let i = 0; i < tablero.length; i++) {
        for (let j = 0; j < tablero[i].length; j++) {
            if (tablero[i][j].value === '💥') {
                const casilla = document.getElementById(`casilla-${i * tablero[0].length + j}`);
                casilla.innerText = tablero[i][j].value;
            }
        }
    }
}
function crearJuego() {
    detenerCronometro();

    //obtiene la dificultad
    let selectDificultad = document.getElementById("dificultad");
    let dificultad = selectDificultad.value;

    let filas, columnas, cantidadBombas;
    switch (dificultad) {
        case "facil":
            filas = 8;
            columnas = 8;
            cantidadBombas = 10;
            break;
        case "intermedio":
            filas = 12;
            columnas = 12;
            cantidadBombas = 40;
            break;
        case "experto":
            filas = 16;
            columnas = 16;
            cantidadBombas = 99;
            break;
        default:
            filas = 8;
            columnas = 8;
            cantidadBombas = 10;
            break;
    }

    //crea la matriz vacía
    tablero = [];
    for (let i = 0; i < filas; i++) {
        tablero.push([]);
        for (let j = 0; j < columnas; j++) {
            tablero[i].push({
                value: 0,
                revelar: false,
            });
        }
    }

    //coloca las bombas de forma aleatoria dentro de la matriz
    const totalCasillas = filas * columnas;
    const bombas = new Set();

    do {
        const casillaAleatoria = Math.floor(Math.random() * totalCasillas)
        bombas.add(casillaAleatoria)
    } while (bombas.size < cantidadBombas)

    bombas.forEach((casillaAleatoria) => {
        const fila = Math.floor(casillaAleatoria / columnas)
        const columna = casillaAleatoria % columnas;
        tablero[fila][columna].value = '💥';
    });

    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            if (tablero[i][j].value !== '💥') {
                let bombasCercanas = 0;

                for (let x = -1; x <= 1; x++) {
                    for (let y = -1; y <= 1; y++) {
                        const filaAdyacente = i + x;
                        const columnaAdyacente = j + y;

                        if (
                            filaAdyacente >= 0 &&
                            filaAdyacente < filas &&
                            columnaAdyacente >= 0 &&
                            columnaAdyacente < columnas &&
                            tablero[filaAdyacente][columnaAdyacente].value === '💥'
                        ) {
                            bombasCercanas++;
                        }
                    }
                }

                tablero[i][j].value = bombasCercanas; // asigna la cantidad de bombas cercanas con 'value'
            }
        }
    }

    //crea el html para la interfaz del juego
    let contenidoHTML = '';
    let contador = 0;
    for (let i = 0; i < filas; i++) {
        contenidoHTML += '<div class="row">';

        for (let j = 0; j < columnas; j++) {
            const casillaID = contador++;
            contenidoHTML += `<div id="casilla-${casillaID}" class="col casilla" onclick="hacerClic(${i}, ${j})"></div>`;
        }
        contenidoHTML += '</div>';
    }
    iniciarCronometro();

    document.getElementById('cont-juego').innerHTML = contenidoHTML;
}

function finalizarJuego() {
    const botonRevelar = document.getElementById('botonRevelar');
    botonRevelar.disabled = false;

    // deshabilita el clic en el tablero
    const casillas = document.querySelectorAll('.casilla');
    casillas.forEach((casilla) => {
        casilla.onclick = null;
    });
}

function revelarTablero() {
    // recorre el tablero y revela las casillas
    for (let i = 0; i < tablero.length; i++) {
        for (let j = 0; j < tablero[0].length; j++) {
            const casilla = document.getElementById(`casilla-${i * tablero[0].length + j}`);
            casilla.innerText = tablero[i][j].value;
        }
    }
    detenerCronometro()
    document.getElementById('cont-juego').classList.remove('no-click');
}
let tiempo = 0;
let cronometro;
let filas, columnas, cantidadBombas;

function iniciarCronometro() {
   tiempo = 0;
   actualizarCronometro();
   clearInterval(cronometro);
   cronometro = setInterval(function () {
      tiempo++;
      actualizarCronometro();
   }, 1000);
}

function detenerCronometro() {
   clearInterval(cronometro);
}

function actualizarCronometro() {
   const cronometroElemento = document.getElementById('cronometro');
   cronometroElemento.textContent = tiempo + `s`;
}

function crearJuego() {
   // Obtiene la dificultad
   let selectDificultad = document.getElementById("dificultad");
   let dificultad = selectDificultad.value;

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

   let contenedorJuego = document.getElementById("cont-juego");
   contenedorJuego.innerHTML = "";

   // Crear la matriz vacía
   let matrizJuego = [];
   for (let i = 0; i < filas; i++) {
      matrizJuego.push([]);
      for (let j = 0; j < columnas; j++) {
         matrizJuego[i].push(0);
      }
   }

   // Colocar las bombas de forma aleatoria dentro de la matriz
   const totalCasillas = filas * columnas;
   const bombas = new Set();

   do {
      const casillaAleatoria = Math.floor(Math.random() * totalCasillas);
      bombas.add(casillaAleatoria);
   } while (bombas.size < cantidadBombas);

   bombas.forEach((casillaAleatoria) => {
      const fila = Math.floor(casillaAleatoria / columnas);
      const columna = casillaAleatoria % columnas;
      matrizJuego[fila][columna] = '💣';
   });

   // Crear el contenido HTML después de generar la matriz
   let contenidoHTML = '';
   let contador = 0;
   for (let i = 0; i < filas; i++) {
      contenidoHTML += '<div class="row">';

      for (let j = 0; j < columnas; j++) {
         const casillaID = contador++;
         contenidoHTML += `<div id="casilla-${casillaID}" class="col casilla oculto" data-fila="${i}" data-columna="${j}"></div>`;
      }

      contenidoHTML += '</div>';
   }
   const casillas = document.querySelectorAll('.casilla');
   casillas.forEach((casilla) => {
       casilla.addEventListener('click', (event) => {
           const fila = parseInt(event.target.getAttribute('data-fila'));
           const columna = parseInt(event.target.getAttribute('data-columna'));
           mostrarCasilla(fila, columna);
       });
   });
   

   contenedorJuego.innerHTML = contenidoHTML;

   iniciarCronometro();

}

function mostrarCasilla(event, fila, columna) {
   const casilla = document.getElementById(`casilla-${fila * columnas + columna}`);

   if (casilla) {
      casilla.classList.remove("oculto");
   }
   event.preventDefault();
}

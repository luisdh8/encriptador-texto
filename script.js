// Espera a que el contenido del DOM esté completamente cargado y listo para ser manipulado
document.addEventListener("DOMContentLoaded", () => {
    // Llama a la función para inicializar valores por defecto en la interfaz
    valoresIniciales();

    // Selecciona el campo de texto por su id y añade un evento que se dispara cada vez que el contenido cambia
    let campoTexto = document.getElementById("texto");
    campoTexto.addEventListener("input", verificarTexto);

    // Selecciona todos los botones que tienen la clase 'raise' y añade un evento click a cada uno
    document.querySelectorAll('.raise').forEach(button => {
        button.addEventListener('click', () => {
            // Elimina la clase 'raise' del botón al hacer clic
            button.classList.remove('raise');

            // Re-aplica la clase 'raise' después de un pequeño retraso (1 ms) para permitir la reactivación de la animación
            setTimeout(() => {
                button.classList.add('raise');
            }, 1);
        });
    });
});

// Función que inicializa los valores por defecto para ciertos elementos de la interfaz
function valoresIniciales() {
    let botonCopiar = document.getElementById("botonCopiar");
    let botonDesencriptar = document.querySelector('#desencriptar');

    // Si existe el botón de copiar, se oculta inicialmente
    if (botonCopiar) {
        botonCopiar.style.display = "none";
    }

    // Si existe el botón de desencriptar, se deshabilita inicialmente
    if (botonDesencriptar) {
        botonDesencriptar.setAttribute('disabled', true);
    }
}

// Función que verifica si hay texto en el campo de entrada y habilita o deshabilita el botón de desencriptar en consecuencia
function verificarTexto() {
    let texto = document.getElementById("texto").value;
    let botonDesencriptar = document.querySelector('#desencriptar');

    // Si hay texto en el campo, habilita el botón de desencriptar; si no, lo deshabilita
    if (texto.length !== 0) {
        botonDesencriptar.removeAttribute('disabled');
    } else {
        botonDesencriptar.setAttribute('disabled', true);
    }
}

// Función que encripta el texto introducido en el campo de texto
function encriptarTexto() {
    let texto = document.getElementById("texto").value;
    let botonCopiar = document.getElementById("botonCopiar");
    let mensajeSugerencia = document.getElementsByClassName("mensajeSugerencia")[0];

    // Reemplaza cada vocal por su forma encriptada correspondiente
    let textoEncriptado = texto
        .replace(/e/gi, "enter")
        .replace(/i/gi, "imes")
        .replace(/a/gi, "ai")
        .replace(/o/gi, "ober")
        .replace(/u/gi, "ufat");

    // Si hay texto en el campo, muestra el texto encriptado y el botón de copiar
    if (texto.length !== 0) {
        mensajeSugerencia.innerHTML = `<textarea class="textoSalida" rows="10" cols="50">${textoEncriptado}</textarea>`;
        botonCopiar.style.display = "block";
    } else {
        // Si no hay texto, muestra la imagen por defecto y oculta el botón de copiar
        mensajeSugerencia.innerHTML = `
            <img src="./img/Muñeco.png" id="muñeco" alt="Buscando mensaje">
            <p class="mensajeSugerenciaNoEncontrado"><strong>Ningún mensaje fue encontrado</strong></p>
            <p class="mensajeSugerenciaInformacion">Ingresa el texto que desees encriptar o desencriptar.</p>
        `;
        botonCopiar.style.display = "none";
    }
}

// Función que desencripta el texto introducido en el campo de texto
function desencriptarTexto() {
    let texto = document.getElementById("texto").value;
    let botonCopiar = document.getElementById("botonCopiar");
    let mensajeSugerencia = document.getElementsByClassName("mensajeSugerencia")[0];

    // Reemplaza las formas encriptadas por las vocales correspondientes
    let textoDesencriptado = texto
        .replace(/enter/gi, "e")
        .replace(/imes/gi, "i")
        .replace(/ai/gi, "a")
        .replace(/ober/gi, "o")
        .replace(/ufat/gi, "u");

    // Si hay texto en el campo, muestra el texto desencriptado y el botón de copiar
    if (texto.length !== 0) {
        mensajeSugerencia.innerHTML = `<textarea class="textoSalida" rows="10" cols="50">${textoDesencriptado}</textarea>`;
        botonCopiar.style.display = "block";
    } else {
        // Si no hay texto, muestra la imagen por defecto y oculta el botón de copiar
        mensajeSugerencia.innerHTML = `
            <img src="./img/Muñeco.png" id="muñeco" alt="Buscando mensaje">
            <p class="mensajeSugerenciaNoEncontrado"><strong>Ningún mensaje fue encontrado</strong></p>
            <p class="mensajeSugerenciaInformacion">Ingresa el texto que desees encriptar o desencriptar.</p>
        `;
        botonCopiar.style.display = "none";
    }
}

// Función que copia el texto encriptado o desencriptado al portapapeles
function copiarTexto() {
    let mensajeSugerencia = document.getElementsByClassName("mensajeSugerencia")[0];
    let textoParaCopiar = mensajeSugerencia.querySelector('.textoSalida').value;

    // Usa la API de Clipboard para copiar el texto al portapapeles
    navigator.clipboard.writeText(textoParaCopiar).then(() => {
        alert('Texto copiado al portapapeles');
    }).catch(err => {
        console.log('Algo salió mal', err);
    });
}

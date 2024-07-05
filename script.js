document.addEventListener("DOMContentLoaded", () => {
    valoresIniciales();

    let campoTexto = document.getElementById("texto");
    campoTexto.addEventListener("input", verificarTexto);

    document.querySelectorAll('.raise').forEach(button => {
        button.addEventListener('click', () => {
            button.classList.remove('raise');

            setTimeout(() => {
                button.classList.add('raise');
            }, 1);
        });
    });
});

function valoresIniciales() {
    let botonCopiar = document.getElementById("botonCopiar");
    let botonDesencriptar = document.querySelector('#desencriptar');

    if (botonCopiar) {
        botonCopiar.style.display = "none";
    }

    if (botonDesencriptar) {
        botonDesencriptar.setAttribute('disabled', true);
    }
}

function verificarTexto() {
    let texto = document.getElementById("texto").value;
    let botonDesencriptar = document.querySelector('#desencriptar');

    if (texto.length !== 0) {
        botonDesencriptar.removeAttribute('disabled');
    } else {
        botonDesencriptar.setAttribute('disabled', true);
    }
}

function encriptarTexto() {
    let texto = document.getElementById("texto").value;
    let botonCopiar = document.getElementById("botonCopiar");
    let mensajeSugerencia = document.getElementsByClassName("mensajeSugerencia")[0];

    let textoEncriptado = texto
        .replace(/e/gi, "enter")
        .replace(/i/gi, "imes")
        .replace(/a/gi, "ai")
        .replace(/o/gi, "ober")
        .replace(/u/gi, "ufat");

    if (texto.length !== 0) {
        mensajeSugerencia.innerHTML = `<textarea class="textoSalida" rows="10" cols="50">${textoEncriptado}</textarea>`;
        botonCopiar.style.display = "block";
    } else {
        mensajeSugerencia.innerHTML = `
            <img src="./img/Muñeco.png" id="muñeco" alt="Buscando mensaje">
            <p class="mensajeSugerenciaNoEncontrado"><strong>Ningún mensaje fue encontrado</strong></p>
            <p class="mensajeSugerenciaInformacion">Ingresa el texto que desees encriptar o desencriptar.</p>
        `;
        botonCopiar.style.visibility = "hidden";
    }
}

function desencriptarTexto() {
    let texto = document.getElementById("texto").value;
    let botonCopiar = document.getElementById("botonCopiar");
    let mensajeSugerencia = document.getElementsByClassName("mensajeSugerencia")[0];

    let textoDesencriptado = texto
        .replace(/enter/gi, "e")
        .replace(/imes/gi, "i")
        .replace(/ai/gi, "a")
        .replace(/ober/gi, "o")
        .replace(/ufat/gi, "u");

    if (texto.length !== 0) {
        mensajeSugerencia.innerHTML = `<textarea class="textoSalida" rows="10" cols="50">${textoDesencriptado}</textarea>`;
        botonCopiar.style.display = "block";
    } else {
        mensajeSugerencia.innerHTML = `
            <img src="./img/Muñeco.png" id="muñeco" alt="Buscando mensaje">
            <p class="mensajeSugerenciaNoEncontrado"><strong>Ningún mensaje fue encontrado</strong></p>
            <p class="mensajeSugerenciaInformacion">Ingresa el texto que desees encriptar o desencriptar.</p>
        `;
        botonCopiar.style.visibility = "hidden";
    }
}

function copiarTexto() {
    let mensajeSugerencia = document.getElementsByClassName("mensajeSugerencia")[0];
    let textoParaCopiar = mensajeSugerencia.querySelector('.textoSalida').value;

    navigator.clipboard.writeText(textoParaCopiar).then(() => {
        alert('Texto copiado al portapapeles');
    }).catch(err => {
        console.log('Algo salió mal', err);
    });
}
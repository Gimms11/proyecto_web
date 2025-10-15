// ==== Audio ====
const audio = document.getElementById("miAudio");
const sliderVolumen = document.getElementById("volumen");

function playAudio() {
    audio.play();
}

function pauseAudio() {
    audio.pause();
}

sliderVolumen.addEventListener("input", () => {
    audio.volume = sliderVolumen.value / 100;
});

// ==== Validación de registro ====
const formRegistro = document.getElementById("formRegistro");

if (formRegistro) {
    formRegistro.addEventListener("submit", (e) => {
        e.preventDefault();
        const pass = document.getElementById("contraseña").value;
        const confirmar = document.getElementById("confirmar").value;

        if (pass !== confirmar) {
            alert("❌ Las contraseñas no coinciden");
            return;
        }

        alert("✅ Registro exitoso. ¡Bienvenido!");
        formRegistro.reset();
    });
}


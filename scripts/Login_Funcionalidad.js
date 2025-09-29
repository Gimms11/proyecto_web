const btnIngresar = document.getElementById("btnIngresar");
const btnRegistrarse = document.getElementById("btnRegistrarse");

const formIngresar = document.getElementById("Ingresar");
const formRegistrarse = document.getElementById("Registrarse");

btnIngresar.addEventListener("click", () => {
formIngresar.classList.add("active");
formRegistrarse.classList.remove("active");
});

btnRegistrarse.addEventListener("click", () =>{
formRegistrarse.classList.add("active");
formIngresar.classList.remove("active");
});

const audio = document.getElementById("miAudio");

        function playAudio() {
            audio.play();
        }

        function pauseAudio() {
            audio.pause();
        }
const sliderVolumen = document.getElementById("volumen");

sliderVolumen.addEventListener("input", () => {
    audio.volume = sliderVolumen.value / 100; 
});


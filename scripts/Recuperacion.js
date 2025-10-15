document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formRecuperacion");
  const emailInput = document.getElementById("email_recuperacion");
  const panelRecuperacion = document.getElementById("Panel_De_Recuperacion");
  const mensajeAceptado = document.getElementById("Mensaje_Aceptado");
  const mensajeRechazado = document.getElementById("Mensaje_Rechazado");
  const btnRegresar = document.getElementById("btnRegresar");
  const btnAceptar = document.getElementById("boton-aceptar");
  const botonesAceptar = document.querySelectorAll(".boton-aceptar");


  // Validación del correo
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();

    // Validar formato simple de correo
    const esValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    panelRecuperacion.classList.remove("active");
    mensajeAceptado.classList.remove("active");
    mensajeRechazado.classList.remove("active");

    if (esValido) {
      mensajeAceptado.classList.add("active");
    } else {
      mensajeRechazado.classList.add("active");
    }
  });

botonesAceptar.forEach((boton) => {
  boton.addEventListener("click", () => {
    mensajeAceptado.classList.remove("active");
    mensajeRechazado.classList.remove("active");
    panelRecuperacion.classList.add("active");
  });
});

  // Botón de regresar
  btnRegresar.addEventListener("click", () => {
    window.location.href = "login.html"; // Redirige al login
  });
});

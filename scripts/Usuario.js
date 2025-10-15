document.addEventListener("DOMContentLoaded", () => {
  const btnVolver = document.querySelector(".btn-volver");
  if (btnVolver) {
    btnVolver.addEventListener("click", () => {
      window.history.back(); 
    })
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const avatar = document.querySelector(".wobble-on-hover");
  avatar.addEventListener("click", () => {
    window.location.href = "Usuario.html";
  });
});
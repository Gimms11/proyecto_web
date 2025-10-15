document.addEventListener("DOMContentLoaded", () => {
  const btnVolver = document.querySelector(".btn-volver");
  if (btnVolver) {
    btnVolver.addEventListener("click", () => {
      window.history.back(); 
    })
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const btnVolver = document.querySelector(".btn-volver");
  if (btnVolver) {
    btnVolver.addEventListener("click", () => {
      window.history.back(); 
    });
  }

  const fotoPerfil = document.querySelector(".Foto-perfil");
  if (fotoPerfil) {
    fotoPerfil.addEventListener("click", () => {
      window.location.href = "Usuario.html";
    });
  }
});

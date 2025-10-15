// ==== Registro con soporte para varios usuarios ====
document.addEventListener("DOMContentLoaded", () => {
  const formRegistro = document.getElementById("formRegistro");

  if (formRegistro) {
    formRegistro.addEventListener("submit", (e) => {
      e.preventDefault();

      const usuario = document.getElementById("usuario").value.trim();
      const pass = document.getElementById("contraseña").value.trim();
      const confirmar = document.getElementById("confirmar").value.trim();

      if (pass !== confirmar) {
        alert("❌ Las contraseñas no coinciden");
        return;
      }

      // Obtener lista actual de usuarios (si existe)
      let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

      // Verificar si el usuario ya existe
      const usuarioExistente = usuarios.find(u => u.usuario === usuario);
      if (usuarioExistente) {
        alert("⚠️ Este usuario ya está registrado.");
        return;
      }

      // Agregar nuevo usuario
      usuarios.push({ usuario: usuario, contraseña: pass });

      // Guardar lista actualizada en localStorage
      localStorage.setItem("usuarios", JSON.stringify(usuarios));

      alert("✅ Registro exitoso. ¡Ya puedes iniciar sesión!");

      console.log("Usuarios registrados:", usuarios);

      window.location.href = "login.html";
    });
  }
});

// ==== Login con soporte para varios usuarios ====
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formLogin");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const usuario = document.getElementById("usuario").value.trim();
      const contraseña = document.getElementById("contraseña").value.trim();

      // === 1️⃣ Usuario fijo (admin) ===
      const usuarioFijo = "Mijael";
      const contraseñaFija = "Gimms";

      // === 2️⃣ Lista de usuarios registrados ===
      const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

      // Buscar si existe el usuario en la lista
      const usuarioEncontrado = usuarios.find(
        (u) => u.usuario === usuario && u.contraseña === contraseña
      );

      if (
        (usuario === usuarioFijo && contraseña === contraseñaFija) ||
        usuarioEncontrado
      ) {
        alert("✅ Inicio de sesión exitoso");
        window.location.href = "index.html"; // o Usuario.html
      } else {
        alert("❌ Usuario o contraseña incorrectos");
      }

      console.log("Usuarios registrados actualmente:", usuarios);
    });
  }
});

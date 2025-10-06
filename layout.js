// Función para manejar el tema
function handleTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
}

// Cargar el contenido del menú desde menu.html
fetch("menu.html")
  .then((res) => res.text()) // Convertimos la respuesta a texto
  .then((data) => {
    // Insertamos el HTML del menú dentro del contenedor con id="menu"
    document.getElementById("menu").innerHTML = data;

    // Aplicar el tema guardado
    handleTheme();

    // Creamos un MutationObserver para detectar cuando el DOM del menú se haya cargado
    const observer = new MutationObserver(() => {
      const sidebar = document.querySelector(".sidebar"); // Sidebar del menú
      const overlay = document.querySelector(".overlay"); // Capa oscura
      const themeToggle = document.getElementById('theme-toggle'); // Switch de tema

      // Configurar el switch de tema
      if (themeToggle) {
        const currentTheme = localStorage.getItem('theme') || 'light';
        themeToggle.checked = currentTheme === 'dark';
        
        themeToggle.addEventListener('change', () => {
          const newTheme = themeToggle.checked ? 'dark' : 'light';
          document.documentElement.setAttribute('data-theme', newTheme);
          localStorage.setItem('theme', newTheme);
        });
      }

      // Solo si ambos elementos existen
      if (sidebar && overlay) {
        // --- Eventos normales para overlay ---
        // Cuando el mouse entra al sidebar
        sidebar.addEventListener("mouseenter", () => {
          overlay.classList.add("active");
        });

        // Cuando el mouse sale del sidebar
        sidebar.addEventListener("mouseleave", () => {
          overlay.classList.remove("active");
        });

        // --- Detectar si el mouse ya estaba sobre el sidebar al cargar ---
        const rect = sidebar.getBoundingClientRect(); // Posición y tamaño del sidebar

        // Escuchar el primer movimiento del mouse
        document.addEventListener("mousemove", function initialMove(e) {
          const mouseX = e.clientX;
          const mouseY = e.clientY;

          // Si el puntero está dentro del rectángulo del sidebar
          if (
            mouseX >= rect.left &&
            mouseX <= rect.right &&
            mouseY >= rect.top &&
            mouseY <= rect.bottom
          ) {
            overlay.classList.add("active");
          }

          // Removemos este listener después de la primera detección
          document.removeEventListener("mousemove", initialMove);
        });

        // Una vez que se configuran los eventos, dejamos de observar cambios
        observer.disconnect();
      }
    });

    // Observamos cambios en los hijos del contenedor #menu
    observer.observe(document.getElementById("menu"), {
      childList: true, // Detecta si se agregan o eliminan nodos hijos
      subtree: true,   // Detecta cambios en todos los descendientes
    });
  });

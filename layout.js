// Aplica el tema guardado
function handleTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
}

// Configura eventos después de cargar el menú
function setupMenuEvents() {
  const sidebar = document.querySelector(".sidebar");
  const overlay = document.querySelector(".overlay");
  const themeToggle = document.getElementById('theme-toggle');

  if (!sidebar || !overlay) {
    console.warn("Faltan elementos del menú o del overlay");
    return;
  }

  // Tema
  const currentTheme = localStorage.getItem('theme') || 'light';
  if (themeToggle) {
    themeToggle.checked = currentTheme === 'dark';
    themeToggle.addEventListener('change', () => {
      const newTheme = themeToggle.checked ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }

  // Overlay
  sidebar.addEventListener("mouseenter", () => overlay.classList.add("active"));
  sidebar.addEventListener("mouseleave", () => overlay.classList.remove("active"));

  // Detectar si el mouse ya está dentro al cargar
  const rect = sidebar.getBoundingClientRect();
  document.addEventListener("mousemove", function initialMove(e) {
    if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
      overlay.classList.add("active");
    }
    document.removeEventListener("mousemove", initialMove);
  });
}

// Carga el menú
// Carga el menú
fetch("menu.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("menu").innerHTML = data;
    handleTheme();
    setupMenuEvents();
    setupRanitaEvents(); // 👈 aquí llamamos la función que maneja la ranita
  });

function setupRanitaEvents() {
  const ranitaImg = document.querySelector(".sidebar__icon_logo_ranita");
  const elementosSidebar = Array.from(document.querySelectorAll(".sidebar_element"))
    .filter(el => !el.querySelector(".sidebar__icon--logo"));

  if (!ranitaImg || elementosSidebar.length === 0) {
    console.warn("❌ No se encontró la ranita o los elementos del sidebar");
    return;
  }

  const originalSrc = ranitaImg.src;
  const hoverSrc = "assets/sorprendido.png";
  const dormidoSrc = "assets/Dormido.png";

  // Crear overlay para crossfade
  const parent = ranitaImg.parentElement;
  parent.style.position = "relative";
  const overlayImg = ranitaImg.cloneNode(true);
  overlayImg.classList.add("ranita-overlay");
  overlayImg.style.opacity = "0";
  parent.appendChild(overlayImg);

  // Función de crossfade
  const crossfade = (nuevoSrc) => {
    overlayImg.src = nuevoSrc;
    overlayImg.style.transition = "opacity 0.3s ease";
    overlayImg.style.opacity = "1";
    setTimeout(() => {
      ranitaImg.src = nuevoSrc;
      overlayImg.style.opacity = "0";
    }, 300);
  };

  // Detectar tema actual
  let currentTheme = localStorage.getItem('theme') || 'light';

  const updateRanitaState = () => {
    currentTheme = localStorage.getItem('theme') || 'light';

    // Si es oscuro → imagen dormida y desactiva eventos
    if (currentTheme === 'dark') {
      crossfade(dormidoSrc);
      elementosSidebar.forEach(el => {
        el.removeEventListener("mouseenter", onHoverIn);
        el.removeEventListener("mouseleave", onHoverOut);
      });
    } else {
      // Si es claro → activa eventos
      crossfade(originalSrc);
      elementosSidebar.forEach(el => {
        el.addEventListener("mouseenter", onHoverIn);
        el.addEventListener("mouseleave", onHoverOut);
      });
    }
  };

  // Handlers separados para fácil reactivación
  const onHoverIn = () => crossfade(hoverSrc);
  const onHoverOut = () => crossfade(originalSrc);

  // Tema inicial
  updateRanitaState();

  // Escucha cuando el tema cambia
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('change', () => {
      setTimeout(updateRanitaState, 100); // Espera a que cambie el tema
    });
  }

  console.log("✅ Ranita lista con comportamiento por tema");
}

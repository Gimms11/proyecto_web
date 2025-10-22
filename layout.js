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
fetch("menu.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("menu").innerHTML = data;
    handleTheme();
    setupMenuEvents();
  });

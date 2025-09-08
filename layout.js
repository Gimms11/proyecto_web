  fetch("menu.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("menu").innerHTML = data;

      const observer = new MutationObserver(() => {
        const sidebar = document.querySelector('.sidebar');
        const overlay = document.querySelector('.overlay');

        if (sidebar && overlay) {
          // Eventos normales
          sidebar.addEventListener('mouseenter', () => {
            overlay.classList.add('active');
          });

          sidebar.addEventListener('mouseleave', () => {
            overlay.classList.remove('active');
          });

          // Detectar si el mouse ya está sobre el sidebar
          // Creamos un rectángulo del sidebar
          const rect = sidebar.getBoundingClientRect();

          // Usamos las coordenadas actuales del puntero (si están disponibles)
          document.addEventListener('mousemove', function initialMove(e) {
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            if (
              mouseX >= rect.left &&
              mouseX <= rect.right &&
              mouseY >= rect.top &&
              mouseY <= rect.bottom
            ) {
              overlay.classList.add('active');
            }

            // Removemos este listener después de la primera detección
            document.removeEventListener('mousemove', initialMove);
          });

          observer.disconnect();
        }
      });

      observer.observe(document.getElementById("menu"), {
        childList: true,
        subtree: true
      });
    });

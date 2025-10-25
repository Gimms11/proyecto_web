// script encapsulado
      (function () {
        const form = document.getElementById('form-info');
        const btnGuardar = document.getElementById('btn-guardar');
        const btnCancel = document.getElementById('btn-cancel');
        const editButtons = Array.from(document.querySelectorAll('.editar'));

        // Campos que manejamos: mapeo id base
        const campos = [
          'nombre','dni','fecha','genero','civil','direccion','telefono','correo','contacto','nacion'
        ];

        // estado para saber si hay cambios activos
        let edicionActiva = false;

        // inicializar selects con el valor mostrado (por si)
        function syncInitialSelects() {
          const generoTexto = document.getElementById('genero-texto').textContent.trim();
          const generoInput = document.getElementById('genero-input');
          if (generoInput) generoInput.value = generoTexto;

          const civilTexto = document.getElementById('civil-texto').textContent.trim();
          const civilInput = document.getElementById('civil-input');
          if (civilInput) civilInput.value = civilTexto;

          const nacionTexto = document.getElementById('nacion-texto').textContent.trim();
          const nacionInput = document.getElementById('nacion-input');
          if (nacionInput) nacionInput.value = nacionTexto;

          // contacto radios: marcar según texto
          const contactoTexto = document.getElementById('contacto-texto').textContent.trim();
          const radios = document.querySelectorAll('#contacto-input input[name="contacto"]');
          radios.forEach(r => r.checked = (r.value === contactoTexto));
        }

        // mostrar input para editar un campo concreto
        function editarCampo(campo) {
          const texto = document.getElementById(campo + '-texto');
          const input = document.getElementById(campo + '-input') || document.getElementById(campo + '-input') ;
          // caso especial: contacto usa contenedor de radios
          const contactoContainer = document.getElementById('contacto-input');

          if (!texto) return;

          texto.classList.add('oculto');
          if (campo === 'contacto') {
            contactoContainer.classList.remove('oculto');
          } else {
            const el = document.getElementById(campo + '-input');
            if (el) el.classList.remove('oculto');
            if (el && typeof el.focus === 'function') el.focus();
          }

          edicionActiva = true;
          btnGuardar.classList.remove('oculto');
          btnCancel.classList.remove('oculto');
        }

        // agregar listeners a botones editar
        editButtons.forEach(b => {
          const campo = b.getAttribute('data-campo');
          b.addEventListener('click', () => editarCampo(campo));
        });

        // cancelar edición: revertir a vista de texto y ocultar inputs (no guarda)
        btnCancel.addEventListener('click', () => {
          campos.forEach(c => {
            const texto = document.getElementById(c + '-texto');
            const input = document.getElementById(c + '-input');
            const contactoContainer = document.getElementById('contacto-input');

            if (texto) texto.classList.remove('oculto');
            if (input) input.classList.add('oculto');

            if (contactoContainer) {
              contactoContainer.classList.add('oculto');
              // restaurar radios segun texto
              const radios = contactoContainer.querySelectorAll('input[name="contacto"]');
              const contactoTexto = document.getElementById('contacto-texto').textContent.trim();
              radios.forEach(r => r.checked = (r.value === contactoTexto));
            }
          });
          edicionActiva = false;
          btnGuardar.classList.add('oculto');
          btnCancel.classList.add('oculto');
        });

        // guardar cambios: tomar valores de inputs y actualizar spans
        form.addEventListener('submit', function (e) {
          e.preventDefault();

          // por cada campo, si su input está visible, tomar su valor
          campos.forEach(c => {
            const texto = document.getElementById(c + '-texto');
            const input = document.getElementById(c + '-input');
            const contactoContainer = document.getElementById('contacto-input');

            if (c === 'contacto' && contactoContainer && !contactoContainer.classList.contains('oculto')) {
              const checked = contactoContainer.querySelector('input[name="contacto"]:checked');
              if (checked) {
                texto.textContent = checked.value;
              }
              contactoContainer.classList.add('oculto');
              texto.classList.remove('oculto');
            } else if (input && !input.classList.contains('oculto')) {
              // normal: inputs text/date/select/email/tel
              if (input.tagName.toLowerCase() === 'select') {
                texto.textContent = input.options[input.selectedIndex]?.text || input.value;
              } else {
                // para date convertir a dd/mm/yyyy legible
                if (input.type === 'date' && input.value) {
                  const d = new Date(input.value);
                  const day = String(d.getDate()).padStart(2,'0');
                  const month = String(d.getMonth()+1).padStart(2,'0');
                  const year = d.getFullYear();
                  texto.textContent = (isNaN(d)) ? input.value : `${day}/${month}/${year}`;
                } else {
                  texto.textContent = input.value;
                }
              }
              input.classList.add('oculto');
              texto.classList.remove('oculto');
            }
          });

          edicionActiva = false;
          btnGuardar.classList.add('oculto');
          btnCancel.classList.add('oculto');

          // aquí podrías enviar los datos al backend con fetch(); por ahora solo confirmación UI
          const originalBtnText = btnGuardar.textContent;
          btnGuardar.textContent = 'Guardando...';
          setTimeout(() => {
            btnGuardar.textContent = originalBtnText;
            alert('Cambios guardados correctamente.');
          }, 500);
        });

        // preparar iniciales
        syncInitialSelects();
      })();
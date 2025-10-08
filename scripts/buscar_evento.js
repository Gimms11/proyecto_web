function buscarEventos() {
  const texto = document.getElementById('buscador').value.toLowerCase();
  
  document.querySelectorAll('.eventoAcademico, .eventoDeportivo, .eventoCultural ').forEach(evento => {
    const titulo = evento.querySelector('.nombre-evento').textContent.toLowerCase();
    if (titulo.includes(texto)) {
      evento.style.display = "flex"; 
      evento.classList.toggle("filtro_evento", !titulo.includes(texto));
    } else {
      evento.style.display = "none";
    }
  });
}
document.getElementById('buscador').addEventListener('keyup', buscarEventos);
document.querySelector('.btn-buscar').addEventListener('click', buscarEventos);
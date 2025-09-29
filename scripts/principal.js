const mesesNombres = [
  "Enero","Febrero","Marzo","Abril","Mayo","Junio",
  "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
];
const eventos = [
  { fecha: '2025-09-29', titulo: 'Conferencia de Fracasados', hora: '10:00' },
  { fecha: '2025-09-30', titulo: 'Entrega de droga', hora: '15:00' },
  { fecha: '2025-10-01', titulo: 'Clases de Extorsion', hora: '18:00' },
  { fecha: '2025-10-01', titulo: 'Clases de Extorsion', hora: '18:00' },
];

let FechaActual = new Date();
let mes = FechaActual.getMonth();
let Año = FechaActual.getFullYear();

const tituloMes = document.getElementById("meses");
const contenedorDias = document.getElementById("dias-grid");
const boton_hoy = document.getElementById("boton_hoy");
const btnMesAnterior = document.getElementById("mes_anterior");
const btnMesPosterior = document.getElementById("mes_posterior");
const seleccionDia = document.getElementById("seleccion_dia");

const vistaMensual = document.getElementById("vista-mensual");
const vistaSemanal = document.getElementById("vista-semanal");
const semanaGrid = document.getElementById("semana-grid");
const toggleVista = document.getElementById("toggleVista");
const btnVolver = document.getElementById("btnVolver");

let diaSeleccionado = null;

// ------------------ RENDER CALENDARIO -------------------
function renderizarCalendario(mes, Año) {
  tituloMes.textContent = `${mesesNombres[mes]} ${Año}`;
  contenedorDias.innerHTML = "";

  const PrimerDia = new Date(Año, mes, 1).getDay();
  const UltimoDia = new Date(Año, mes + 1, 0).getDate();

  let inicio = PrimerDia === 0 ? 6 : PrimerDia - 1;

  for (let i = 0; i < inicio; i++) {
    const celda = document.createElement("div");    
    celda.classList.add("vacio");
    contenedorDias.appendChild(celda);
  }

  for (let dia = 1; dia <= UltimoDia; dia++) {
    const celda = document.createElement("div");
    celda.textContent = dia;   
    celda.classList.add("dia");

    if (
      dia === FechaActual.getDate() &&
      mes === FechaActual.getMonth() &&
      Año === FechaActual.getFullYear()
    ) {
      celda.classList.add("hoy");
    }

    // Evento al hacer clic en un día
    celda.addEventListener("click", () => {
      seleccionDia.textContent = `Día seleccionado: ${dia} de ${mesesNombres[mes]} ${Año}`;
      diaSeleccionado = dia;
      renderizarSemana(dia, mes, Año);
    });

    contenedorDias.appendChild(celda);
  }
}

// ------------------ RENDER SEMANA -------------------
function renderizarSemana(dia, mes, Año) {
  semanaGrid.innerHTML = "";
  const fecha = new Date(Año, mes, dia);
  const diaSemana = fecha.getDay() === 0 ? 7 : fecha.getDay();
  const inicioSemana = new Date(Año, mes, dia - diaSemana + 1);

  for (let i = 0; i < 7; i++) {
    let fechaDia = new Date(inicioSemana);
    fechaDia.setDate(inicioSemana.getDate() + i);

    let contenedorDia = document.createElement("div");
    contenedorDia.classList.add("dia-semana");

    let titulo = document.createElement("h3");
    titulo.textContent = `${fechaDia.getDate()} ${mesesNombres[fechaDia.getMonth()]}`;
    contenedorDia.appendChild(titulo);

    const fechaStr = fechaDia.toISOString().split('T')[0];
    const eventosDelDia = eventos.filter(ev => ev.fecha === fechaStr);

    eventosDelDia.forEach(ev => {
      const eventoEl = document.createElement('div');
      eventoEl.classList.add('evento');
      eventoEl.textContent = `${ev.hora} - ${ev.titulo}`;
      contenedorDia.appendChild(eventoEl);
    });

    semanaGrid.appendChild(contenedorDia);
  }

  // Mostrar la vista semanal
  vistaMensual.classList.remove("activo");
  vistaSemanal.classList.add("activo");
}

// ------------------ BOTONES -------------------
btnMesAnterior.addEventListener("click", () => {
  mes--;
  if (mes < 0) {
    mes = 11;
    Año--;
  }
  renderizarCalendario(mes, Año);
});

btnMesPosterior.addEventListener("click", () => {
  mes++;
  if (mes > 11) {
    mes = 0;
    Año++;
  }  
  renderizarCalendario(mes, Año);  
});

boton_hoy.addEventListener("click", () => {
  FechaActual = new Date();
  mes = FechaActual.getMonth();
  Año = FechaActual.getFullYear();
  renderizarCalendario(mes, Año);    
});

// Botón vista semanal (desde mensual)
toggleVista.addEventListener("click", () => {
  if (diaSeleccionado) {
    renderizarSemana(diaSeleccionado, mes, Año);
  } else {
    alert("Selecciona un día primero para ver la semana");
  }
});

// Botón volver (en vista semanal)
btnVolver.addEventListener("click", () => {
  vistaSemanal.classList.remove("activo");
  vistaMensual.classList.add("activo");
});

// ------------------ INICIALIZAR -------------------
renderizarCalendario(mes, Año);
vistaMensual.classList.add("activo");
vistaSemanal.classList.remove("activo");

const mesesNombres = [
  "Enero","Febrero","Marzo","Abril","Mayo","Junio",
  "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
];

const eventos = [
  { fecha: '2025-09-29', titulo: 'Conferencia de Exitosos', hora: '10:00' },
  { fecha: '2025-09-30', titulo: 'Entrega de víveres', hora: '15:00' },
  { fecha: '2025-10-01', titulo: 'Clases de negocios', hora: '18:00' },
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

// 📅 Renderizar calendario mensual
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

    celda.addEventListener("click", () => {
      seleccionDia.textContent = `Día seleccionado: ${dia} de ${mesesNombres[mes]} ${Año}`;
      diaSeleccionado = dia;
      renderizarSemana(dia, mes, Año);
    });

    contenedorDias.appendChild(celda);
  }
}

// 📆 Renderizar vista semanal
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

  // Mostrar vista semanal
  vistaMensual.classList.remove("activo");
  vistaSemanal.classList.add("activo");
  document.body.classList.add("no-scroll");
}

// 🔘 Botones de navegación
btnMesAnterior.addEventListener("click", () => {
  mes--;
  if (mes < 0) { mes = 11; Año--; }
  renderizarCalendario(mes, Año);
});

btnMesPosterior.addEventListener("click", () => {
  mes++;
  if (mes > 11) { mes = 0; Año++; }
  renderizarCalendario(mes, Año);
});

boton_hoy.addEventListener("click", () => {
  FechaActual = new Date();
  mes = FechaActual.getMonth();
  Año = FechaActual.getFullYear();
  renderizarCalendario(mes, Año);
});

toggleVista.addEventListener("click", () => {
  if (diaSeleccionado) {
    renderizarSemana(diaSeleccionado, mes, Año);
  } else {
    alert("Selecciona un día primero para ver la semana");
  }
});

btnVolver.addEventListener("click", () => {
  vistaSemanal.classList.remove("activo");
  vistaMensual.classList.add("activo");
  document.body.classList.remove("no-scroll");
});

// 🔰 Inicialización
renderizarCalendario(mes, Año);

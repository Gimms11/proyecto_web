// --- Nombres de los meses ---
const mesesNombres = [
  "Enero","Febrero","Marzo","Abril","Mayo","Junio",
  "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
];

// --- Fecha actual ---
let FechaActual = new Date();
let mes = FechaActual.getMonth();  // 0-11
let Año = FechaActual.getFullYear();

// --- Referencias a elementos del DOM ---
const tituloMes = document.getElementById("meses");       // <h1> que muestra el mes y año
const contenedorDias = document.getElementById("dias-grid"); // Contenedor de los días
const boton_hoy = document.getElementById("boton_hoy");  // Botón "Hoy"
const btnMesAnterior = document.getElementById("mes_anterior"); // Botón mes anterior
const btnMesPosterior = document.getElementById("mes_posterior"); // Botón mes siguiente

// --- Función principal para dibujar el calendario ---
function renderizarCalendario(mes, Año) {
  // Actualiza el título con el mes y año
  tituloMes.textContent = `${mesesNombres[mes]} ${Año}`;
  
  // Limpiar días anteriores
  contenedorDias.innerHTML = "";

  // Obtener el primer día de la semana del mes y el último día
  const PrimerDia = new Date(Año, mes, 1).getDay(); // 0-domingo, 1-lunes...
  const UltimoDia = new Date(Año, mes + 1, 0).getDate();

  // Ajustar inicio: queremos que lunes=0, domingo=6
  let inicio = PrimerDia === 0 ? 6 : PrimerDia - 1;

  // Crear celdas vacías para alinear el primer día
  for(let i = 0; i < inicio; i++){
    const celda = document.createElement("div");    
    celda.classList.add("vacio");
    contenedorDias.appendChild(celda);
  }

  // Crear celdas para cada día del mes
  for(let dia = 1; dia <= UltimoDia; dia++){
    const celda = document.createElement("div");
    celda.textContent = dia;   
    celda.classList.add("dia");

    // Marcar el día actual
    if(
      dia === FechaActual.getDate() &&
      mes === FechaActual.getMonth() &&
      Año === FechaActual.getFullYear()
    ){
      celda.classList.add("hoy");
    }

    // Evento al hacer clic en un día
    celda.addEventListener("click", () => {
      document.getElementById("seleccion_dia").textContent =
        `Día seleccionado: ${dia} de ${mesesNombres[mes]} ${Año}`;
    });

    contenedorDias.appendChild(celda);
  }
}

// --- Botones para cambiar de mes ---
btnMesAnterior.addEventListener("click", () => {
  mes--;
  if(mes < 0){
    mes = 11;
    Año--;
  }
  renderizarCalendario(mes, Año);
});

btnMesPosterior.addEventListener("click", () => {
  mes++;
  if(mes > 11){
    mes = 0;
    Año++;
  }  
  renderizarCalendario(mes, Año);  
});

// --- Botón "Hoy" ---
boton_hoy.addEventListener("click", () => {
  FechaActual = new Date();
  mes = FechaActual.getMonth();
  Año = FechaActual.getFullYear();
  renderizarCalendario(mes, Año);    
});

// --- Renderizar calendario al cargar ---
renderizarCalendario(mes, Año);

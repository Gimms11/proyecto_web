
const mesesNombres = [
"Enero","Febrero","Marzo","Abril","Mayo","Junio",
"Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
];

let FechaActual = new Date();
let mes = FechaActual.getMonth();
let Año = FechaActual.getFullYear();

const tituloMes = document.getElementById("meses");
const contenedorDias = document.getElementById("dias-grid");
const boton_hoy = document.getElementById("boton_hoy");
const btnMesAnterior = document.getElementById("mes_anterior");
const btnMesPosterior = document.getElementById("mes_posterior");

function renderizarCalendario(mes, Año) {
tituloMes.textContent = `${mesesNombres[mes]} ${Año}`;
contenedorDias.innerHTML="";

const PrimerDia = new Date(Año, mes, 1).getDay();
const UltimoDia = new Date(Año, mes + 1, 0).getDate();

let inicio = PrimerDia === 0 ? 6 : PrimerDia - 1;

for(let i = 0; i < inicio; i++){
const celda = document.createElement("div");    
celda.classList.add("vacio");
contenedorDias.appendChild(celda);
}

for(let dia = 1; dia <= UltimoDia; dia++){
const celda = document.createElement("div");
celda.textContent = dia;   
celda.classList.add("dia");

if(
dia === FechaActual.getDate() &&
mes === FechaActual.getMonth() &&
Año === FechaActual.getFullYear()
){
celda.classList.add("hoy");
}

celda.addEventListener("click",() => {
document.getElementById("seleccion_dia").textContent =
`Día seleccionado: ${dia} de ${mesesNombres[mes]} ${Año}`;
});

contenedorDias.appendChild(celda);
}
}


btnMesAnterior.addEventListener("click",()=> {
mes--;
if(mes<0){
mes = 11;
Año--;
}
renderizarCalendario(mes,Año);
});

btnMesPosterior.addEventListener("click",()=>{
mes++;
if(mes>11){
mes = 0;
Año++;
}  
renderizarCalendario(mes,Año);  
});

boton_hoy.addEventListener("click",() =>{
FechaActual = new Date();
mes = FechaActual.getMonth();
Año = FechaActual.getFullYear();
renderizarCalendario(mes,Año);    
});

renderizarCalendario(mes,Año);



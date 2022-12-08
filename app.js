if(navigator.serviceWorker){
    navigator.serviceWorker.register('sw.js')
};

const agregarCaja = document.querySelector(".agregar-caja");
const modalCaja = document.querySelector(".caja-modal");
const cerrarIcono = modalCaja.querySelector("header .equis");
const btnAgregar = modalCaja.querySelector("button");
const etiquetaTitulo = modalCaja.querySelector("input");
const etiquetaDescripcion = modalCaja.querySelector("textarea");

//Array de meses para tener el nombre del mes
const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

//obtengo la lista del localstorage si existe y parseo, si no
// le paso un array vacio para crearlo
const lista = JSON.parse(localStorage.getItem("lista") || "[]");

// Modal
agregarCaja.addEventListener("click", () => {
    modalCaja.classList.add("show"); 
})

cerrarIcono.addEventListener("click", () => {
    etiquetaTitulo.value = "";
    etiquetaDescripcion.value = "";
    modalCaja.classList.remove("show");
})

function renderizarNotas() {
    document.querySelectorAll(".nota").forEach(nota => nota.remove());
    lista.forEach((nota, index) => {
        let etiquetaLi = `<li class="nota">
                                <div class="detalles">
                                    <p>${nota.titulo}</p>
                                    <span>${nota.descripcion}</span>  
                                </div>
                                <div class="contenido-bottom">
                                    <span>${nota.fecha}</span>
                                    <div class="borrar">
                                        <i onclick="borrarNota(${index})" class="elim">Borrar</i>
                                    </div>
                                </div>
                            </li>`;
        agregarCaja.insertAdjacentHTML("afterend", etiquetaLi);                    
    });
}
renderizarNotas();

function borrarNota(notaId) {
    lista.splice(notaId, 1);
    localStorage.setItem("lista", JSON.stringify(lista));
    renderizarNotas();
}

//obtengo los valores del form

btnAgregar.addEventListener("click", e => {
    e.preventDefault();
    let notaTitulo = etiquetaTitulo.value;
    let notaDescripcion = etiquetaDescripcion.value;

    if(notaTitulo || notaDescripcion){
        let fechaObj = new Date();
        let mes = meses[fechaObj.getMonth()];
        let dia = fechaObj.getDate();
        let ano = fechaObj.getFullYear();

        let infoNota = {
            titulo: notaTitulo, descripcion: notaDescripcion, fecha: `${dia} de ${mes}, ${ano}`
        }

        lista.push(infoNota);
// Guardo los valores en localstorage
        localStorage.setItem("lista", JSON.stringify(lista));
        cerrarIcono.click();
        renderizarNotas();
    }

});
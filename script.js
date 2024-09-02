var indiceActual = null;
var mycheckbox= document.getElementById("mycheckbox");

document.addEventListener("DOMContentLoaded", function () {
    var actualizar = document.getElementById("actualizar");
    var agregar = document.getElementById("agregar");

    agregar.addEventListener("click", function () {
        agregardatos()
    });
    actualizar.addEventListener("click", function () {
        if (validarformulario() === true && indiceActual !== null) {
            actualizarDatos(indiceActual);
        }
    });
    
    leerdatos();

})

function validarformulario() {
    var nombre = document.getElementById("nombre").value;
    var texto = document.getElementById("texto").value;

    if (nombre === "" || texto === "") {
        alert("Por favor llenar todos los campos")
        return false
    } else {
        return true
    }
}
function leerdatos() {
    let datos = JSON.parse(localStorage.getItem("DATOS")) || [];

    var resenas = "";

    datos.forEach(function (dato, index) {
        var checked = dato.checkbox ? "checked" : "";
        resenas += `<div class="col-sm-3 cont-expe">
                                <label class="container">
                                <input type="checkbox" id="mycheckbox-${index}" onchange="tarearealizada(${index})" ${checked}>
                                <div class="checkmark"></div>
                                </label>
                                <div class="tareas">
                                <h2 class = "nombre">${dato.nombre}</h2>
                                <p class = "texto">${dato.texto}</p>
                                <button onclick="editar(${index})" class="boton-editar"><i class="fa-solid fa-pencil"></i></button>
                                <button onclick="eliminar(${index})" class="boton-eliminar"><i class="fa-solid fa-trash-can"></i></i></button>
                                </div>
                                </div>`
    });
    document.getElementById("contenedor-resenas").innerHTML = resenas
}




function agregardatos() {
    if (validarformulario() === true) {
        var nombre = document.getElementById("nombre").value;
        var texto = document.getElementById("texto").value;       

        let datos = JSON.parse(localStorage.getItem("DATOS")) || [];

        datos.push({
            nombre: nombre,
            texto: texto,
            checkbox: false,
        })
        localStorage.setItem("DATOS", JSON.stringify(datos));

        leerdatos()
        var nombre = document.getElementById("nombre").value = "";
        var texto = document.getElementById("texto").value = "";
    }

}

function eliminar(index) {
    let datos = JSON.parse(localStorage.getItem("DATOS"));
    datos.splice(index, 1);
    localStorage.setItem("DATOS", JSON.stringify(datos));

    leerdatos()
}

function editar(index) {

    indiceActual = index;
    document.getElementById("agregar").style.display = "none";
    document.getElementById("actualizar").style.display = "block";

    let datos = JSON.parse(localStorage.getItem("DATOS"));

    document.getElementById("nombre").value = datos[index].nombre;
    document.getElementById("texto").value = datos[index].texto;

}
function actualizarDatos(index) {

    let datos = JSON.parse(localStorage.getItem("DATOS"));

    datos[index].nombre = document.getElementById("nombre").value;
    datos[index].texto = document.getElementById("texto").value;

    localStorage.setItem("DATOS", JSON.stringify(datos));
    leerdatos()

    document.getElementById("nombre").value = "";
    document.getElementById("texto").value = "";

    document.getElementById("agregar").style.display = "block";
    document.getElementById("actualizar").style.display = "none";
    indiceActual = null;
}

function tarearealizada(index){
    
    let datos = JSON.parse(localStorage.getItem("DATOS"));
    datos[index].checkbox = !datos[index].checkbox;
    localStorage.setItem("DATOS", JSON.stringify(datos));
}
class Comentario {
  constructor(nombre, email, mensaje) {
    this.nombre = nombre;
    this.email = email;
    this.mensaje = mensaje;
    this.fecha = new Date().toLocaleString();
  }
}

let cajaComentarios = [];

function mostrarComentario(comentario) {
  const contenedor = document.getElementById("div-comentarios");
  const div = document.createElement("div");
  div.classList.add("comentario");

  div.innerHTML = `
    <h3>${comentario.nombre} (${comentario.email})</h3>
    <p>${comentario.mensaje}</p>
    <small>${comentario.fecha}</small>
    <hr>
  `;

  contenedor.appendChild(div);
}

function generarComentario() {
  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();
  const mensaje = document.getElementById("mensaje").value.trim();
  const aviso = document.getElementById("aviso");

  aviso.textContent = "";

  if (!nombre || !email || !mensaje) {
    aviso.textContent = "Por favor complete todos los campos antes de enviar.";
    return;
  }

  const comentario = new Comentario(nombre, email, mensaje);
  cajaComentarios.push(comentario);

  localStorage.setItem("cajaComentarios", JSON.stringify(cajaComentarios));

  mostrarComentario(comentario);

  document.getElementById("formulario").reset();
}

function cargarComentarios() {
  const comentariosGuardados = localStorage.getItem("cajaComentarios");
  const contenedor = document.getElementById("div-comentarios");

  if (comentariosGuardados) {
    const comentarios = JSON.parse(comentariosGuardados);
    comentarios.forEach((comentario) => mostrarComentario(comentario));
  }
}

const btnAgregar = document.getElementById("btnComentario");
const btnVer = document.getElementById("btnVerComentarios");

btnAgregar.addEventListener("click", generarComentario);
btnVer.addEventListener("click", cargarComentarios);

const comentariosGuardados = localStorage.getItem("cajaComentarios");
if (comentariosGuardados) {
  cajaComentarios = JSON.parse(comentariosGuardados);
}
//estuve trabajando en un boton para borrar los comentarios, pero no lo logre a tiempo//

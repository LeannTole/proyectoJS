const contenedorCarrito = document.getElementById("carrito-items"); // contenedor del carrito//
const totalTexto = document.getElementById("total"); // contenedor del total//

// Función para cargar y mostrar el carrito//
function cargarCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  contenedorCarrito.innerHTML = "";

  if (carrito.length === 0) {
    contenedorCarrito.innerHTML = "<p>Tu carrito está vacío </p>";
    totalTexto.textContent = "$0";
    return;
  }

  let total = 0;
  carrito.forEach((prod) => {
    total += prod.precio * prod.cantidad; // Calcular total//

    const item = document.createElement("div"); // Crear elemento del producto//
    item.classList.add("item-carrito");
    item.innerHTML = `
      <img src="${prod.imagen}" width="100" alt="${prod.nombre}">
      <h3>${prod.nombre}</h3>
      <p>Precio: $${prod.precio.toLocaleString()}</p>
      <p>Cantidad: ${prod.cantidad}</p>
      <button class="eliminar" data-id="${prod.id}">Eliminar</button>
    `;
    contenedorCarrito.appendChild(item);
  }); //muestra los productos agregados en l carrito//

  totalTexto.textContent = `$${total.toLocaleString()}`; // Mostrar total//
}

contenedorCarrito.addEventListener("click", (e) => {
  if (e.target.classList.contains("eliminar")) {
    const id = parseInt(e.target.dataset.id);
    let carrito = JSON.parse(localStorage.getItem("carrito")) || []; // Obtener carrito almacenado en localStorage//
    const producto = carrito.find((p) => p.id === id); //con esto se busca el producto a eliminar//

    // Alerta de confirmación//
    Swal.fire({
      title: "¿Eliminar producto?",
      text: `¿Deseas quitar ${producto.nombre} del carrito?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        carrito = carrito.filter((p) => p.id !== id);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        cargarCarrito();

        Swal.fire({
          title: "Eliminado",
          text: `${producto.nombre} fue eliminado del carrito.`,
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  }
});

//alerta para vaciar el carrito//
document.getElementById("vaciar").addEventListener("click", () => {
  Swal.fire({
    title: "¿Vaciar carrito?",
    text: "Se eliminarán todos los productos.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, vaciar",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#d33",
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem("carrito");
      cargarCarrito();
      Swal.fire({
        title: "Carrito vacío",
        text: "Todos los productos fueron eliminados.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  });
});

document.getElementById("comprar").addEventListener("click", () => {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  if (carrito.length === 0) {
    Swal.fire({
      icon: "info",
      title: "Carrito vacío",
      text: "Debes agregar productos!!.",
      confirmButtonColor: "#3085d6",
    });
    return;
  } // Verifica si el carrito está vacío//

  Swal.fire({
    title: "¿Confirmar compra?",
    text: "¿Deseas finalizar tu compra?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Sí, comprar",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#27ae60",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "¡Compra realizada!",
        text: "Gracias por tu compra ",
        icon: "success",
        confirmButtonColor: "#27ae60",
        timer: 2000,
        showConfirmButton: false,
      });

      localStorage.removeItem("carrito");
      cargarCarrito();
    }
  });
});

cargarCarrito(); //se llama a la funcion para cargar el carrito al iniciar//

const contenedorProductos = document.querySelector("#caja2");

// Cargar productos desde JSON utilizando fetch//
fetch("../data/productos.json")
  .then((res) => res.json())
  .then((productos) => {
    renderProductos(productos);
    activarBotones(productos);
  })
  .catch((err) => console.error("Error al cargar productos:", err));

// funcion para agregar los producot a la pagina//
function renderProductos(productos) {
  productos.forEach((p) => {
    const card = document.createElement("div");
    card.classList.add("boxproductos");

    card.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}" />
      <h2>${p.nombre}</h2>
      <p>${p.descripcion}</p>
      <span>$${p.precio.toLocaleString()}</span>
      <button data-id="${p.id}" class="btn-agregar">Agregar al carrito</button>
    `;

    contenedorProductos.appendChild(card);
  });
}

// Escuchar clicks en los botones "Agregar al carrito"
function activarBotones(productos) {
  contenedorProductos.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-agregar")) {
      const id = parseInt(e.target.dataset.id);
      agregarAlCarrito(id, productos);
    }
  });
}

// Agregar producto al carrito
function agregarAlCarrito(id, productos) {
  const producto = productos.find((p) => p.id === id);
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const existente = carrito.find((item) => item.id === id);
  if (existente) {
    existente.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));

  Swal.fire({
    title: "¡Agregado al carrito!",
    text: `${producto.nombre} se añadió correctamente.`,
    imageUrl: producto.imagen,
    imageWidth: 100,
    imageHeight: 100,
    icon: "success",
    confirmButtonText: "OK",
    confirmButtonColor: "#27ae60",
    timer: 2000,
  });
}

// Función para eliminar producto del carrito con confirmación//
function eliminarDelCarrito(id) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const producto = carrito.find((item) => item.id === id);

  if (!producto) return;

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
      carrito = carrito.filter((item) => item.id !== id);
      localStorage.setItem("carrito", JSON.stringify(carrito));

      Swal.fire({
        title: "Eliminado",
        text: `${producto.nombre} fue eliminado del carrito.`,
        icon: "success",
        confirmButtonColor: "#27ae60",
        timer: 2000,
      });
    }
  });
}

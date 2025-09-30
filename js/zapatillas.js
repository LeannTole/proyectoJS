let productos = [
  {
    id: 1,
    nombre: "Nike Infinity",
    descripcion: "Zapatillas de Golf para Hombre (Anchos)",
    precio: 149.999,

    Imagen: "../images/1576561-1200-1200.webp",
  },
  {
    id: 2,
    nombre: "Nike Pegasus 41",
    descripcion: "Zapatillas de Running para Mujer",
    precio: 229.999,
    Imagen: "../images/zapa2.webp",
  },
  {
    id: 3,
    nombre: "Nike Air Max 95 OG",
    descripcion: "Zapatillas de Moda para Hombre",
    precio: 229.999,
    Imagen: "../images/nikeAirMax95.jpg",
  },
  {
    id: 4,
    nombre: "Puma PWR Hybrid",
    descripcion: "Zapatillas de entrenamiento unisex",
    precio: 129.999,
    Imagen: "../images/pumapwr.avif",
  },
  {
    id: 5,
    nombre: "Puma Speedcat Cuero unisex",
    descripcion: "Zapatillas de entrenamiento unisex",
    precio: 119.999,
    Imagen: "../images/pumaspeedcat.avif",
  },
];

const contenedor = document.querySelector(".boxproductos");

productos.forEach((p) => {
  const card = document.createElement("div");
  card.classList.add("boxproductos");

  card.innerHTML = `
        <img src="${p.Imagen}" alt="${p.nombre}" />
        <h2>${p.nombre}</h2>
        <p>${p.descripcion}</p>
        <span>$${p.precio}</span>
        <button data-id="${p.id}">Agregar al carrito</button>
      `;

  contenedor.appendChild(card);
});

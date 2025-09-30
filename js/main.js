let BtnMenu = document.getElementById("BtnMenu");
let navbar = document.querySelector(".navbar");
let cajaPrincipal = document.querySelector(".caja-principal");

BtnMenu.addEventListener("click", () => {
  navbar.classList.toggle("hidden");
  cajaPrincipal.classList.toggle("expanded");
});
//la idea es seguir agregando funciones a la pagina, animaciones, eventos//

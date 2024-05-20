
const botonBusqueda = document.getElementById("button-search");
const sugerencias =["velas", "home-spray", "difusores"];



function mostrarBusqueda(event) {
  event.preventDefault();
  let inputSearch = document.getElementById("buscar").value.toLowerCase(); // Convertir el valor de entrada a minúsculas

  if (inputSearch === "") {
    alert("Debe ingresar un valor");
  } else if (inputSearch == "velas") { // Utilizar "else if" para evitar evaluaciones innecesarias
    window.location.href = "/productos/velas/velas.html";
  } else if (inputSearch == "homespray") {
    window.location.href = "/productos/home-spray/home-spray.html";
  } else if (inputSearch == "difusores") {
    window.location.href = "/productos/difusores/difusores.html";
  } else {
    alert("No se encontraron resultados para la búsqueda: " + inputSearch); // Agregar una alerta para manejar entradas no válidas
  }
}

botonBusqueda.addEventListener("click", mostrarBusqueda);

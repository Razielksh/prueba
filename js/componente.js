function inicializarCarrusel(contenedorId, opciones) {
  var contenedor = document.getElementById(contenedorId);
  if (!contenedor) {
    console.error("No se encontró el contenedor con el ID: " + contenedorId);
    return;
  }

  opciones = opciones || {};
  var imagenes = opciones.imagenes || [];

  if (imagenes.length === 0) {
    contenedor.innerHTML = "<p style='color: red; padding: 20px;'>Error: No hay imágenes.</p>";
    return;
  }

  contenedor.innerHTML = "";
  contenedor.className = "carrusel-contenedor";

  // Creamos el track que contendrá las imágenes
  var track = document.createElement("div");
  var indiceActual = 0;
  track.className = "carrusel-track";

  // Creamos cada diapositiva
  for (var i = 0; i < imagenes.length; i++) {
    var datoImg = imagenes[i];

    var slide = document.createElement("div");
    slide.className = "carrusel-slide";

    var img = document.createElement("img");
    img.src = datoImg.url;
    img.alt = datoImg.titulo || "Imagen";
    slide.appendChild(img);

    // Cuadro de texto
    if (datoImg.titulo) {
      var texto = document.createElement("div");
      texto.className = "carrusel-texto";
      var h3 = document.createElement("h3");
      h3.innerText = datoImg.titulo;
      texto.appendChild(h3);
      slide.appendChild(texto);
    }

    track.appendChild(slide);
  }

  contenedor.appendChild(track);

  // Botón Anterior
  var btnAnterior = document.createElement("button");
  btnAnterior.className = "carrusel-boton prev";
  btnAnterior.innerHTML = "&#10094;";
  btnAnterior.onclick = function () {
    indiceActual = indiceActual - 1;
    if (indiceActual < 0) {
      indiceActual = imagenes.length - 1;
    }
    actualizarCarrusel();
  };
  contenedor.appendChild(btnAnterior);

  // Botón Siguiente
  var btnSiguiente = document.createElement("button");
  btnSiguiente.className = "carrusel-boton next";
  btnSiguiente.innerHTML = "&#10095;";
  btnSiguiente.onclick = function () {
    indiceActual = indiceActual + 1;
    if (indiceActual >= imagenes.length) {
      indiceActual = 0;
    }
    actualizarCarrusel();
  };
  contenedor.appendChild(btnSiguiente);

  // Función simple para mover el riel horizontalmente
  function actualizarCarrusel() {
    var porcentaje = indiceActual * 100;
    track.style.transform = "translateX(-" + porcentaje + "%)";
  }
}

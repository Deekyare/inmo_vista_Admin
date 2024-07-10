const url = new URL(window.location.href);
const id = url.searchParams.get('id');
const baseUrl = "http://localhost:3000";
const apiUrl = `${baseUrl}/propiedades/${id}`;

fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => mostrarPropiedades(data))
  .catch((error) => console.log(error));

function mostrarPropiedades(propiedad) {
  let contenedorPropiedades = document.getElementById("contenedor_propiedad");
  contenedorPropiedades.innerHTML = "";
console.log(propiedad)
  let propiedadElement = document.createElement("div");
  propiedadElement.classList.add("propiedades-info");

  propiedadElement.innerHTML = `
        <div class="container">
        <div class="row gy-4">
          <div class="col-lg-8">
            <div class="propiedades-details-slider swiper">
              <div class="align-items-center">
                <div class="">
                  <img src="${propiedad.fotos}" alt="" />
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-4">
            <div class="propiedades-info">
              <h3>Detalle</h3>
              <ul>
                <li><strong></strong> ${propiedad.titulo}</li>
                <li><strong>Localidad</strong> ${propiedad.localidad}</li>
                <li><strong>Tipo de operación </strong>: ${propiedad.operacion}</li>
                <li><strong>Estado</strong>: ${propiedad.estado}</li>
                <li><strong>Valor</strong>: ${propiedad.valor}</li>
              
              </ul>
            </div>
            <div class="propiedades-description p-4">
              <h2>Características de la propiedad</h2>
              <ul>
              <li> ${propiedad.descripcion}</li>
              <li><strong>Superficie</strong>: ${propiedad.superficie}</li>
                <li><strong>Habitaciones</strong>: ${propiedad.habitaciones}</li>
              
              </ul>
             
            </div>
            
          </div>
        </div>
      </div>
    `;

  contenedorPropiedades.appendChild(propiedadElement);
}

//ELIMINAR PROPIEDAD
async function eliminarPropiedad(e) {
  try {
    const response = await fetch(apiUrl, { method: 'DELETE' });

    if (response.ok) {
      alert ("La propiedad se elimino correctamente")
      window.location.href = '/index.html';
    } else {
      // Hubo un error al eliminar la propiedad
      alert("Error al eliminar la propiedad")
      console.error('Error al eliminar la propiedad:', response.status);
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
  }
  // redirigir a la home
}

function editarPropiedad() {
  location.href = `/edit_prop.html?id=${id}`
}
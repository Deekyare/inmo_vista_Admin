const baseApiUrl = "https://api-rest-inmobiliaria-production.up.railway.app";

fetch(`${baseApiUrl}/propiedades`)
  .then((response) => response.json())
  .then((data) => mostrarPropiedades(data))
  .catch((error) => console.log(error));

function buscar() {
  // const filters = []
  // if (form.tipo_operacion.value) {
  //   filters.push(form.tipo_operacion.value)
  // }

  // if (filters.length) {
  //   baseUrl = `${baseUrl}?${filters.join("&")}`
  // }

  fetch(baseUrl)
    .then((response) => response.json())
    .then((data) => mostrarPropiedades(data))
    .catch((error) => console.log(error));
}

function mostrarPropiedades(propiedades) {
  let contenedorPropiedades = document.getElementById("contenedor_propiedades");
  contenedorPropiedades.innerHTML = "";

  propiedades.forEach((propiedad) => {
    let propiedadElement = document.createElement("div");
    propiedadElement.classList.add("propiedades-info");
    propiedadElement.innerHTML = `
  
    <a href="/propiedades-details.html?id=${propiedad.id}">
        ${
          propiedad.fotos.length
            ? `<img class="card-img-top" src="${propiedad.fotos[0]}" alt="Card image cap" />
    </a
  >`
            : `<img src="https://www.came-educativa.com.ar/upsoazej/2022/03/placeholder-4.png" width="100%" class="img-fluid" alt="" />`
        }
                  
                  <div class="card-body">
                    <h5 class="card-title">${propiedad.titulo}</h5>

                    <div class="d-flex gap-2 mt-3">
                      <i class="d-flex bi-geo-alt"> </i>
                      <p>${propiedad.localidad}</p>
                    </div>
                  </div>
                  <div class="card-footer">
                    <small class="text-muted">$ ${propiedad.valor}</small>
                  </div>
    `;

    contenedorPropiedades.appendChild(propiedadElement);
  });
}



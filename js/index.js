const url = new URL(window.location.href);
const operacion = url.searchParams.get("operacion") || "";
const tipoPropiedad = url.searchParams.get("tipo_propiedad") || "";
const idLocalidad = url.searchParams.get("id_localidad") || "";
const baseApiUrl = "https://api-rest-inmobiliaria-production.up.railway.app";
const searchUrl = `${baseApiUrl}/propiedades?operacion=${operacion}&tipo_propiedad=${tipoPropiedad}&id_localidad=${idLocalidad}`;
let localidades = [];

fetch(searchUrl)
  .then((response) => response.json())
  .then((data) => mostrarPropiedades(data))
  .catch((error) => console.log(error));

function mostrarPropiedades(propiedades) {
  const sinResultadosElement = document.getElementById("sin_resultados");

  if (propiedades.length) {
    sinResultadosElement.classList.add("d-none");
  } else {
    sinResultadosElement.classList.remove("d-none");
  }

  let contenedorPropiedades = document.getElementById("contenedor_propiedades");
  contenedorPropiedades.innerHTML = "";

  propiedades.forEach((propiedad) => {
    let propiedadElement = document.createElement("div");
    propiedadElement.classList.add("propiedades-info", "col-lg-4", "col-md-6");

    propiedadElement.innerHTML = `
        <div>
          <a href="/propiedades-details.html?id=${propiedad.id}">
            <img src="${
              propiedad.fotos.length
                ? propiedad.fotos[0]
                : "https://www.came-educativa.com.ar/upsoazej/2022/03/placeholder-4.png"
            }" style="width: 100%; height: 350px;" class="img-fluid" alt="" />
          </a>
        </div>
        <div class="card-body justify-content-around bg-secondary text-white mb-4">
          
          <div class="d-flex gap-2 align-items-baseline pt-3 mx-3 bd-highlight flex-grow-1 bd-highlight ">
             <div class="d-flex flex-grow-1 bd-highlight gap-3"> <i class="d-flex bi-geo-alt"></i>
            <p class="detalle_index">${propiedad.localidad}</p>
            <i class="d-flex bi-house-door"></i>
            <p class="detalle_index">${propiedad.tipo_propiedad}</p></div>
           
            <div class="d-flex bd-highlight">$${propiedad.valor}</div>
          </div>
          <div>
          
          </div>  
    
        </div>


      `;

    contenedorPropiedades.appendChild(propiedadElement);
  });
}

fetch(`${baseApiUrl}/localidades`)
  .then((response) => response.json())
  .then((data) => {
    localidades = data.map((localidad) => localidad);
    setDefaultFilters();
    selectTipoLoc();
  })
  .catch((error) => console.log(error));

function setDefaultFilters() {
  const operacionOptions = document.getElementById("selectOperacion").options;
  for (const operacionItem of operacionOptions) {
    if (operacionItem.value === operacion) {
      operacionItem.selected = true;
    }
  }

  const tipoPropOptions = document.getElementById("selectTipoProp").options;
  for (const optionItem of tipoPropOptions) {
    if (optionItem.value === tipoPropiedad) {
      optionItem.selected = true;
    }
  }
}

function selectTipoLoc() {
  let selectElement = document.getElementById("selectLocalidad");

  for (const localidadItem of localidades) {
    let option = document.createElement("option");
    option.value = localidadItem.id;
    option.innerHTML = localidadItem.nombre;

    if (idLocalidad == localidadItem.id) {
      option.selected = true;
    }
    selectElement.appendChild(option);
  }
}

function buscar() {
  const filtros = [];
  const operacion = document.getElementById("selectOperacion").value;
  if (operacion) filtros.push(`operacion=${operacion}`);


  const tipoProp = document.getElementById("selectTipoProp").value;
  if (tipoProp) filtros.push(`tipo_propiedad=${tipoProp}`);

  const localidad = document.getElementById("selectLocalidad").value;
  if (localidad) filtros.push(`id_localidad=${localidad}`);

  const redirectUrl = `${url.protocol}//${url.host}/index.html?${filtros.join('&')}#titulo-propiedades`;

  location.href = redirectUrl;
}

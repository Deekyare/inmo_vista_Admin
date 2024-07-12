let formulario = document.getElementById("formulario");
let titulo = document.getElementById("titulo");
let tipoProp = document.getElementById("select_tipo_prop");
let localidad = document.getElementById("select_localidad");
let superficie = document.getElementById("superficie");
let valor = document.getElementById("valor");
let habitaciones = document.getElementById("habitaciones");
let estado = document.getElementById("estado");
let descripcion = document.getElementById("descripcion");
let operacion = document.getElementById("select_operacion");
let foto = document.getElementById("foto");
let localidades = [];
const url = new URL(window.location.href);
const id = url.searchParams.get("id");
const baseUrl = "http://localhost:3000";
const apiUrl = `${baseUrl}/propiedades/${id}`;




fetch(`${baseUrl}/localidades`)
  .then((response) => response.json())
  .then((data) => {
    localidades = data.map((localidad) => localidad);
  })
  .catch((error) => console.log(error));

fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => initForm(data))
  .catch((error) => console.log(error));

async function initForm(data) {
  console.log(data);
  titulo.value = data.titulo;
  superficie.value = data.superficie;
  tipoProp.value = data.tipo_propiedad;
  localidad.value = data.localidad;
  valor.value = data.valor;
  habitaciones.value = data.habitaciones;
  estado.value = data.estado;
  descripcion.value = data.descripcion;
  operacion.value = data.operacion;
  if (data.fotos.length) {
    foto.value = data.fotos[0];
    document.getElementById("imagePreview").src = data.fotos[0];
    document.getElementById("imagePreview").style.display = "block";
  }

  

  selectTipoProp(data.tipo_propiedad);
  selectOperacion(data.operacion);
  selectTipoLoc(data.id_localidad);
}

function selectTipoProp(tipoPropValue) {
  console.log({ tipoPropValue });
  for (const tipoOption of tipoProp.options) {
    if (tipoOption.value === tipoPropValue) tipoOption.selected = true;
  }
}

function selectOperacion(operacionValue) {
  console.log({ operacionValue });
  for (const operacionOption of operacion.options) {
    if (operacionOption.value === operacionValue) {
      operacionOption.selected = true;
    }
  }
}

function selectTipoLoc(localidadValue) {
  console.log("selecting loc");
  let selectElement = document.getElementById("select_localidad");

  for (const localidad of localidades) {
    let option = document.createElement("option");
    option.value = localidad.id;
    option.innerHTML = localidad.nombre;

    if (localidad.id == localidadValue) {
      option.selected = true;
    }

    selectElement.appendChild(option);
  }
}

function submitForm() {
  fetch(apiUrl, {
    method: "PUT",
    body: JSON.stringify({
      titulo: titulo.value,
      tipoProp: tipoProp.value,
      localidad: localidad.value,
      superficie: superficie.value,
      valor: valor.value,
      estado: estado.value,
      habitaciones: habitaciones.value,
      descripcion: descripcion.value,
      operacion: operacion.value,
      foto: foto.value,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((error) => console.error("Error:", error))
    .then((response) => {
      console.log("Success:", response);
      document.getElementById("imagePreview").src = response.foto;
      showToast("Propiedad modificada exitosamente");
      setTimeout(() => {
        // location.href = "/index.html"  
      }, 2000)      
    });
    
}
document.getElementById("cancelar").addEventListener("click", () => {
  location.href = "/index.html";
});

function previewImage() {
  const preview = document.getElementById("imagePreview");
  if (foto.value) {
    preview.src = foto.value;
    preview.style.display = "block"; // Mostrar la imagen después de cargarla
  } else {
    preview.src = "";
    preview.style.display = "none";
  }
}

function showToast(message) {
  const toastElement = document.getElementById('successToast');
  const toastBody = toastElement.querySelector('.toast-body');
  toastBody.textContent = message;
  const toast = new bootstrap.Toast(toastElement);
  toast.show();
}


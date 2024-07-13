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
const mensajeError = document.getElementById("mensajeError");
let localidades = [];
const url = new URL(window.location.href);
const id = url.searchParams.get("id");
const baseApiUrl = "api-rest-inmobiliaria-production.up.railway.app";
const propiedadesUrl = `${baseApiUrl}/propiedades/${id}`;

fetch(`${baseApiUrl}/localidades`)
  .then((response) => response.json())
  .then((data) => {
    localidades = data.map((localidad) => localidad);
  })
  .catch((error) => console.log(error));

fetch(propiedadesUrl)
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

function validarForm() {
  let esValido = true;

  // Validación de los campos
  if (titulo.value.trim() === "") {
    titulo.classList.add("border-danger");
    esValido = false;
  } else {
    titulo.classList.remove("border-danger");
  }
  if (tipoProp.value.trim() === "") {
    tipoProp.classList.add("border-danger");
    esValido = false;
  } else {
    tipoProp.classList.remove("border-danger");
  }
  if (localidad.value.trim() === "") {
    localidad.classList.add("border-danger");
    esValido = false;
  } else {
    localidad.classList.remove("border-danger");
  }
  if (superficie.value.trim() === "") {
    superficie.classList.add("border-danger");
    esValido = false;
  } else {
    superficie.classList.remove("border-danger");
  }
  if (valor.value.trim() === "") {
    valor.classList.add("border-danger");
    esValido = false;
  } else {
    valor.classList.remove("border-danger");
  }
  if (estado.value.trim() === "") {
    estado.classList.add("border-danger");
    esValido = false;
  } else {
    estado.classList.remove("border-danger");
  }
  if (habitaciones.value.trim() === "") {
    habitaciones.classList.add("border-danger");
    esValido = false;
  } else {
    habitaciones.classList.remove("border-danger");
  }
  if (descripcion.value.trim() === "") {
    descripcion.classList.add("border-danger");
    esValido = false;
  } else {
    descripcion.classList.remove("border-danger");
  }
  if (operacion.value.trim() === "") {
    operacion.classList.add("border-danger");
    esValido = false;
  } else {
    operacion.classList.remove("border-danger");
  }
  if (foto.value.trim() === "") {
    foto.classList.add("border-danger");
    esValido = false;
  } else {
    foto.classList.remove("border-danger");
  }

  if (!esValido) {
    mensajeError.classList.remove("d-none");
  } else {
    mensajeError.classList.add("d-none");
  }

  return esValido;
}

function submitForm() {
  const esValido = validarForm();

  if (!esValido) return;

  fetch(propiedadesUrl, {
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
        location.href = `/propiedades-details.html?id=${id}`  
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


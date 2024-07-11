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
    localidades = data.map((localidad) => localidad)
    initForm()
  })
  .catch((error) => console.log(error));

  async function initForm() {
    selectTipoLoc()
  }

function selectTipoLoc() {
  let selectElement = document.getElementById("select_localidad");

  for (const localidad of localidades) {
    let option = document.createElement("option");
    option.value = localidad.id;
    option.innerHTML = localidad.nombre;
    selectElement.appendChild(option);
  }
}

function submitForm(e) {
  const url = "http://localhost:3000/propiedades";

  fetch(url, {
    method: "POST",
    // body: carga valor habitaciones y select
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
      document.getElementById("imagePreview").src = "";

      showToast("Propiedad creada exitosamente");
      setTimeout(() => {
        location.href = "/index.html"  
      }, 2000)      
    });
}

document.getElementById("btnCancelar").addEventListener("click", () => {
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

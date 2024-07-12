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
    initForm();
  })
  .catch((error) => console.log(error));

async function initForm() {
  selectTipoLoc();
}

function selectTipoLoc() {
  let selectElement = document.getElementById("select_localidad");

  for (const localidad of localidades) {
    let option = document.createElement("option");
    option.value = localidad.id;
    option.innerHTML = localidad.nombre;
    selectElement.appendChild(option);


    selectElement.appendChild(option);
  }
}

function submitForm(e) {
  const mensajeError = document.getElementById("mensajeError");

  // Validación de los campos
  if (titulo.value.trim() === "") {
    titulo.classList.add("border-danger");
    mensajeError.classList.remove("d-none");
    
  } else {
    titulo.classList.remove("border-danger");
    mensajeError.classList.add("d-none");
  }
  if (tipoProp.value.trim() === "") {
    tipoProp.classList.add("border-danger");
    mensajeError.classList.remove("d-none");
 
  } else {
    tipoProp.classList.remove("border-danger");
    mensajeError.classList.add("d-none");
  }
  if (localidad.value.trim() === "") {
    localidad.classList.add("border-danger");
    mensajeError.classList.remove("d-none");
    
  } else {
    localidad.classList.remove("border-danger");
    mensajeError.classList.add("d-none");
  }
  if (superficie.value.trim() === "") {
    superficie.classList.add("border-danger");
    mensajeError.classList.remove("d-none");
 
  } else {
    superficie.classList.remove("border-danger");
    mensajeError.classList.add("d-none");
  }
  if (valor.value.trim() === "") {
    valor.classList.add("border-danger");
    mensajeError.classList.remove("d-none");
  
  } else {
    valor.classList.remove("border-danger");
    mensajeError.classList.add("d-none");
  }
  if (estado.value.trim() === "") {
    estado.classList.add("border-danger");
    mensajeError.classList.remove("d-none");
  
  } else {
    estado.classList.remove("border-danger");
    mensajeError.classList.add("d-none");
  }
  if (habitaciones.value.trim() === "") {
    habitaciones.classList.add("border-danger");
    mensajeError.classList.remove("d-none");
    
  } else {
    habitaciones.classList.remove("border-danger");
    mensajeError.classList.add("d-none");
  }
  if (descripcion.value.trim() === "") {
    descripcion.classList.add("border-danger");
    mensajeError.classList.remove("d-none");
   
  } else {
    descripcion.classList.remove("border-danger");
    mensajeError.classList.add("d-none");
  }
  if (operacion.value.trim() === "") {
    operacion.classList.add("border-danger");
    mensajeError.classList.remove("d-none");
    
  } else {
    operacion.classList.remove("border-danger");
    mensajeError.classList.add("d-none");
  }
  if (foto.value.trim() === "") {
    foto.classList.add("border-danger");
    mensajeError.classList.remove("d-none");
    return;
  } else {
    foto.classList.remove("border-danger");
    mensajeError.classList.add("d-none");
  }

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
        location.href = "/index.html";
      }, 2000);
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
  const toastElement = document.getElementById("successToast");
  const toastBody = toastElement.querySelector(".toast-body");
  toastBody.textContent = message;
  const toast = new bootstrap.Toast(toastElement);
  toast.show();
}

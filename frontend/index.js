document.addEventListener("DOMContentLoaded", () => {
  const contenedorCards = document.getElementById("contenedor-cards");

  const formData = document.getElementById("form");
  formData.addEventListener("submit", async (e) => {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const precio = parseFloat(document.getElementById("precio").value);
    const stock = parseInt(document.getElementById("stock").value);

    const data = { nombre, precio, stock };
    // const newFormData = new FormData(formData);
    // console.log(newFormData);
    // TODO: change data for FormData

    const response = await fetch(HOST + "/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response || !response.ok) {
      const respuesta = await response.json();
      alert(respuesta.message);
      return;
    }
    if ((response.status = 201)) {
      alert("Producto agregado correctamente");
      obtenerProductosAPI();
      return;
    }
    alert("Ocurrio un error desconocido");
  });

  const obtenerProductosAPI = async () => {
    const response = await fetch(HOST + "/products");
    if (!response.ok) {
      return "Ocurio en error";
    }
    const products = await response.json();
    contenedorCards.innerHTML = "";
    products.map((product) => {
      contenedorCards.innerHTML += `
    <li id="${product.id}" class="flex flex-col bg-teal-200 shadow-md w-7/12 rounded-md p-3 snap-center md:w-4/12 lg:w-full hover:bg-teal-300 hover:shadow-xl hover:scale-102 transition ease-in-out duration-300">
      <div class="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-2">
          <h3 class="font-bold text-xl">${product.nombre}</h3>
          <div class="flex gap-3 text-slate-500 text-sm font-bold">
              <span class="">Stock: </span>
              <p class=""> ${product.stock}</p>
          </div>
      </div>
      
      <div class="flex flex-col gap-3 lg:flex-row lg:justify-between lg:items-center">
          <div class="flex flex-wrap gap-3 font-bold text-green-600">
              <p> $${product.precio}</p>
          </div>

          <div class="flex flex-col gap-3 lg:flex-row">
              <button class="bg-amber-500 lg:w-[96px] rounded-md shadow-md p-1.5 text-white hover:scale-105 lg:hover:scale-110">
                  Editar
              </button>
              <button class="bg-red-400 rounded-md shadow-md p-1.5 text-white hover:scale-105 lg:hover:scale-110" onClick="eliminar(${product.id})">Eliminar</button>
          </div>
      </div>
    </li>`;
    });
  };

  obtenerProductosAPI();
});
const HOST = "http://localhost:3000/api/v1";

const eliminar = async (id) => {
  alert("Eliminar producto " + id);
  const response = await fetch(HOST + "/products/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.status == 204 || !response.ok) {
    const respuesta = await response.json();
    alert(respuesta.message || "No se pudo eliminar por una causa desconocida");
    return;
  }
  if (response.status == 204) {
    alert("Producto elimiando con exito");
    const elementoActual = document.getElementById(id);
    if (elementoActual) {
      elementoActual.remove();
    }
    return;
  }
};

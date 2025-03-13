document.addEventListener("DOMContentLoaded", () => {
  const contenedorCards = document.getElementById("contenedor-cards");
  const formData = document.getElementById("form");
  const btnSubmit = document.getElementById("btnSubmit");
  const btnCancelOrClean = document.getElementById("btnClear");

  let productoEditandoId = null;

  const HOST = "http://localhost:3000/api/v1";

  formData.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const precio = parseFloat(document.getElementById("precio").value);
    const stock = parseInt(document.getElementById("stock").value);
    const data = { nombre, precio, stock };

    if (formData.getAttribute("data-mode") === "edit") {
      await editEvent(data);
      return;
    }
    await addEvent(data);
    return;
  });

  const obtenerProductosAPI = async () => {
    const response = await fetch(`${HOST}/products`);
    if (!response.ok) return alert("Ocurrió un error al obtener productos");

    const products = await response.json();
    contenedorCards.innerHTML = "";

    products.forEach((product) => {
      createCardProduct(product);
    });
  };

  btnCancelOrClean.addEventListener("click", () => {
    const attributeMode = btnCancelOrClean.getAttribute("data-mode");
    if (attributeMode === "edit") {
      resetFormulario();
      return;
    }
  });

  window.createCardProduct = (product) => {
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
              <button onclick="editarProducto(${product.id}, '${product.nombre}', ${product.precio}, ${product.stock})" class="bg-amber-500 flex justify-center items-center lg:w-[96px] rounded-md shadow-md p-1.5 text-white hover:scale-105 lg:hover:scale-110">
                <img src="./public/icon-edit.svg" class="w-7"></img>  
                Editar
              </button>
              <button onclick="eliminar(${product.id})" class="bg-red-400 flex justify-center items-center rounded-md shadow-md p-1.5 text-white hover:scale-105 lg:hover:scale-110">
                <img src="./public/icon-delete.svg" class="w-7"></img>
                Eliminar
              </button>
          </div>
      </div>
    </li>`;
  };

  window.editarProducto = (id, nombre, precio, stock) => {
    document.getElementById("nombre").value = nombre;
    document.getElementById("precio").value = precio;
    document.getElementById("stock").value = stock;

    productoEditandoId = id;
    formData.setAttribute("data-mode", "edit");
    btnSubmit.textContent = "Actualizar Producto";
    btnSubmit.classList.remove("bg-teal-300", "hover:bg-teal-400");
    btnSubmit.classList.add("bg-amber-300", "hover:bg-amber-400");
    btnCancelOrClean.setAttribute("data-mode", "edit");
    btnCancelOrClean.textContent = "Cancelar";
  };

  window.eliminar = async (id) => {
    if (!confirm("¿Estás seguro de eliminar este producto?")) return;

    const response = await fetch(`${HOST}/products/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      alert("Producto eliminado con éxito");
      document.getElementById(id).remove();
    } else {
      alert("No se pudo eliminar el producto");
    }
  };

  window.editEvent = async (data) => {
    const response = await fetch(`${HOST}/products/${productoEditandoId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert("Producto actualizado correctamente");
      resetFormulario();
      obtenerProductosAPI();
      return;
    } else {
      alert("Error al actualizar el producto");
      return;
    }
  };

  window.addEvent = async (data) => {
    const response = await fetch(`${HOST}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert("Producto agregado correctamente");
      resetFormulario();
      obtenerProductosAPI();
      return;
    } else {
      alert("Error al agregar el producto");
      return;
    }
  };

  const resetFormulario = () => {
    formData.reset();

    formData.setAttribute("data-mode", "add");
    btnCancelOrClean.setAttribute("data-mode", "clean");

    productoEditandoId = null;
    btnCancelOrClean.textContent = "Limpiar campos";
    btnSubmit.textContent = "Agregar Producto";
    btnSubmit.classList.remove("bg-amber-300", "hover:bg-amber-400");
    btnSubmit.classList.add("bg-teal-300", "hover:bg-teal-400");

    document.activeElement.blur();
    document.body.focus();
  };

  obtenerProductosAPI();
});

function createProductDto(data) {
  // Validar que los datos tengan el formato esperado
  if (!data || !data.nombre || !data.precio || !data.stock) {
    return false;
  }
  // Validación de tipo y valores
  if (typeof data.nombre !== "string" || data.nombre.trim() === "") {
    return false;
  }
  if (typeof data.precio !== "number" || data.precio < 0) {
    return false;
  }
  if (typeof data.stock !== "number" || data.stock < 0) {
    return false;
  }
  return true;
}

function updateProductDto(data) {
  // Validar que los datos tengan el formato esperado
  if (!data) {
    return false;
  }

  // Validar que si `nombre` está presente, sea una cadena no vacía
  if (
    data?.nombre &&
    (typeof data?.nombre !== "string" || data?.nombre.trim() === "")
  ) {
    return false;
  }

  // Validar que si `precio` está presente, sea un número positivo
  if (data?.precio && (typeof data?.precio !== "number" || data?.precio < 0)) {
    return false;
  }

  // Validar que si `stock` está presente, sea un número positivo
  if (
    data?.stock &&
    (data?.stock === "" || typeof data?.stock !== "number" || data?.stock < 0)
  ) {
    return false;
  }

  return true;
}

module.exports = { createProductDto, updateProductDto };

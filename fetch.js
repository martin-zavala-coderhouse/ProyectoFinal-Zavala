const productos = await obtenerProductos();


  async function obtenerProductos() {
    try {
      const response = await fetch("./productos.json");
      const productos = await response.json();
      return productos;
    } catch (error) {
      console.error("Error al obtener productos el archivo json no existe o no se encuentra:", error);
      return [];
    }
  }

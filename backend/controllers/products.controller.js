const { ProductService } = require("../services/product.service");
const logger = require("../utils/logger");
const { createProductDto, updateProductDto } = require("../utils/validateData");

class ProductController {
  static async getAll(req, res) {
    try {
      const products = await ProductService.getAll();
      return res.status(200).json(products);
    } catch (error) {
      logger.error("Error al leer los productos", error?.message);
      return res.status(500).json({
        message:
          "Ocurrio un error al leer los datos" ||
          "Internal server error: " + error?.message,
      });
    }
  }

  static async getOneById(req, res) {
    try {
      const { id } = req.params;
      if (!id || isNaN(id)) {
        return res.status(400).json({
          message: "Valid Id is required, expected number",
        });
      }
      const product = await ProductService.getOneById(id);
      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }
      return res.status(302).json(product); // 302: Found
      // return res.status(200).json(product); // 200: OK
    } catch (error) {
      logger.error("Error al leer el producto", error?.message);
      return res.status(500).json({
        message:
          "Ocurrio un error al leer los datos" ||
          "Internal server error: " + error?.message,
      });
    }
  }

  static async create(req, res) {
    try {
      const { nombre, precio, stock } = req.body;
      const data = { nombre, precio, stock };

      if (!createProductDto(data)) {
        return res.status(400).json({
          message:
            "Data not provided correctly. Please provide valid 'nombre', 'precio' and 'stock'",
        });
      }

      const product = await ProductService.create(data);
      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }
      return res.status(201).send();
    } catch (error) {
      logger.error("Error al crear el producto", error?.message);
      return res.status(500).json({
        message:
          "Ocurrio un error al leer los datos" ||
          "Internal server error: " + error?.message,
      });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const { nombre, precio, stock } = req.body;
      const data = {};

      nombre ? (data.nombre = nombre) : null;
      precio ? (data.precio = precio) : null;
      stock ? (data.stock = stock) : null;

      logger.info("Datos recibidos", data);

      if (!id || isNaN(id)) {
        return res.status(400).json({
          message: "Valid Id is required, expected number",
        });
      }
      if (!updateProductDto(data)) {
        return res.status(400).json({
          message:
            "Data not provided correctly. Please provide valid 'nombre', 'precio' and 'stock'",
        });
      }
      const product = await ProductService.update(id, data);
      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }
      logger.info("Producto actualizado correctamente", product);
      return res.status(201).json(product);
    } catch (error) {
      logger.error("Error al actualizar el producto", error?.message);
      return res.status(500).json({
        message:
          "Ocurrio un error al leer los datos" ||
          "Internal server error: " + error?.message,
      });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id || isNaN(id)) {
        return res.status(400).json({
          message: "Valid Id is required, expected number",
        });
      }
      const product = await ProductService.delete(id);
      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }
      return res.status(204).send();
    } catch (error) {
      logger.error("Error al eliminar el producto", error?.message);
      return res.status(500).json({
        message:
          "Ocurrio un error al leer los datos" ||
          "Internal server error: " + error?.message,
      });
    }
  }
}

module.exports = { ProductController };

const { ProductController } = require("../controllers/products.controller");
const express = require("express");
const router = express.Router();
const logger = require("../utils/logger");

const routes = {
  products: [
    { method: "get", path: "/", action: ProductController.getAll },
    { method: "get", path: "/:id", action: ProductController.getOneById },
    { method: "post", path: "/", action: ProductController.create },
    { method: "patch", path: "/:id", action: ProductController.update },
    { method: "delete", path: "/:id", action: ProductController.delete },
  ],
};

routes.products.forEach((route) => {
  const { method, path, action } = route;
  router[method](path, action);
  // Add log to mapped routes of products
  logger.info(`Mapped route: ${method.toUpperCase()} products${path}`);
});

module.exports = router;

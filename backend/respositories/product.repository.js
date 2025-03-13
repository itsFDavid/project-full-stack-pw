const { AppDataSource } = require("../data/source");

const ProductRepository = AppDataSource.getRepository("Product");

module.exports = { ProductRepository };

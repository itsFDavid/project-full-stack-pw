const { ProductRepository } = require("../respositories/product.repository");

class ProductService {
  async getAll() {
    return await ProductRepository.find();
  }

  async getOneById(id) {
    return await ProductRepository.findOneBy({ id });
  }

  async create(product) {
    const newProduct = ProductRepository.create(product);
    return await ProductRepository.save(newProduct);
  }

  async update(id, data) {
    await ProductRepository.update(id, data);
    return await ProductRepository.findOneBy({ id });
  }

  async delete(id) {
    return await ProductRepository.delete({ id });
  }
}

module.exports = { ProductService: new ProductService() };

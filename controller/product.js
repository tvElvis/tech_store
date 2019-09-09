import Product from '../db/product';

class ProductController {
  create(data) {
    try {
      new Product(data).save();
    } catch (e) {
      return e
    }
  }

  findOne(id) {
    return Product.findById(id);
  }

  update({ id, name, price }) {
    return Product.findByIdAndUpdate(id, {
      name,
      price
    }, { new: true });
  }

  delete(id) {
    return Product.findByIdAndRemove(id);
  }
}

export default new ProductController();
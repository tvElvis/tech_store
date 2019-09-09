import _ from 'lodash';

import validator from '../component/validator';
import productController from '../controller/product';

const productData = [
  'name',
  'price',
]

const updateProductData = [
  'name',
  'price',
  'id'
]

class TestValidate {
  create(body) {
    let errorList = validator.check(body, {
      name: {
        notEmpty: {
          message: 'Name is required'
        }
      },
      price: {
        isNumeric: {
          message: 'Valid price is required'
        }
      }
    })

    if (errorList.length) {
      console.log('errorList', errorList)
      throw (errorList);
    }

    return _.pick(body, productData)
  }

  async findOne(id) {
    let errorList = validator.check({ id }, {
      id: {
        isMongoId: {
          message: 'Valid id is required'
        }
      },
    });

    if (errorList.length) {
      throw (errorList);
    }

    const product = await productController.findOne(id);

    if (!product) {
      throw ([
        {
          param: 'id',
          message: 'Product not found',
        }
      ])
    }

    return product;
  }

  async update(body) {
    const validateSchema = {
      id: {
        isMongoId: {
          message: 'Valid id is required'
        }
      }
    }

    if (!_.isUndefined(body.name)) {
      validateSchema.name = {
        notEmpty: {
          param: 'name',
          message: 'Name cannot be empty'
        }
      }
    }

    if (!_.isUndefined(body.price)) {
      validateSchema.price = {
        isNumeric: {
          message: 'Valid price is required'
        }
      }
    }

    let errorList = validator.check(body, validateSchema);

    if (errorList.length) {
      throw (errorList);
    }

    const product = await productController.findOne(body.id);

    if (!product) {
      throw ([
        {
          param: 'id',
          message: 'Product not found',
        }
      ])
    }

    return _.pick(_.assignIn(product, body), updateProductData);
  }
}

export default new TestValidate();
import koaRouter from 'koa-router';

import middlewareWrapper from '../../component/middlewareWrapper';
import productValidator from '../../validator/product';
import productController from '../../controller/product';


let router = koaRouter({
  prefix: '/api/v1/product'
});

router.post('/create', async (req) => {
  await middlewareWrapper.wrape(req, null, async () => {
    const validData = productValidator.create(req.request.body);
    return productController.create(validData);
  });
});

router.get('/:id', async (req) => {
  await middlewareWrapper.wrape(req, null, async () => {
    return productValidator.findOne(req.params.id);
  });
});

router.put('/update', async (req) => {
  await middlewareWrapper.wrape(req, null, async () => {
    const validData = await productValidator.update(req.request.body)
    return productController.update(validData);
  });
});

router.delete('/:id', async (req) => {
  await middlewareWrapper.wrape(req, null, async () => {
    const validData = await productValidator.findOne(req.params.id);
    return productController.delete(validData._id);
  });
});

export default router;
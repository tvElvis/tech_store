import koaRouter from 'koa-router';

import productRoutes from './product/product';

const appRoutes = [
  productRoutes,
]

class Router {
  routes(app) {
    appRoutes.forEach(route => {
      if (route instanceof koaRouter) {
        app.use(route.routes());
      }
    })
  }
}

export default new Router();
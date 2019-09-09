import Koa from 'koa';
import koaBody from 'koa-body';
import mongoose from 'mongoose';

import config from './config';
import customRouter from './routes';

const app = new Koa;

app.use(koaBody({
  multipart: true,
}));

mongoose.Promise = global.Promise;

mongoose.connect(config.url, {
  useNewUrlParser: true
}).then(() => {
  console.log("Successfully connected to the database");
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});

customRouter.routes(app);

app.listen(config.http.port, () => {
  console.log([new Date(), 'Server started on', config.http.port].join(' '));
})
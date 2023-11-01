import express from 'express';
import handlebars from 'express-handlebars';
import path from 'path';
import { products } from './socket.js';

import { __dirname } from './utils.js';
import indexRouter from './routers/index.router.js';
import realtimeProductsRouter from './routers/realtimeProducts.router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.use('/', indexRouter, realtimeProductsRouter);

app.use((error, req, res, next) => {
  const message = `Ha ocurrido un error desconocido: ${error.message}`;
  console.error(message);
  res.status(500).json({ message });
});

app.get('/products', (req, res) => {
  res.render('products', products);
});

export default app;

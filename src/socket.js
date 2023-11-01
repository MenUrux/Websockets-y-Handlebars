import { Server } from 'socket.io';
import ProductManager from './ProductManager.js';

let socketServer;
const productManager = new ProductManager();
export const products = [];

export const init = (httpServer) => {
  socketServer = new Server(httpServer);

  socketServer.on('connection', (socketClient) => {
    console.log(`Nuevo cliente socket conectado 🎊`);

    socketClient.on('newProduct', async (newProductData) => {
      products.push(newProductData);

      // Usar ProductManager para agregar el producto
      const addedProduct = await productManager.addProduct(
        newProductData.id,
        newProductData.title,
        newProductData.category,
        newProductData.description,
        newProductData.price,
        newProductData.code,
        newProductData.stock
      );
      // newProductData.thumbnail,
      // Emitir el producto agregado de regreso a todos los clientes
      socketServer.emit('newProduct', { product: addedProduct });
    });
  });
}

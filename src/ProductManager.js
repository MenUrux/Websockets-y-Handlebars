import fs from 'fs';
import { existsSync, promises as fsPromises } from 'fs';



class Product {
    constructor(id, title, description, price, thumbnail, code, stock) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}

class ProductManager {
    constructor() {
        this.products = [];
        this.path = './products-data.json';
        this.nextId = 1;
        this.load();
        console.log('[ProductManager]\tSe creo una instancia')
    }

    async save() {
        const content = JSON.stringify(this.products, null, "\t");
        try {
            console.log('[save]\tEscribiendo contenido en el path', this.path)
            await fsPromises.writeFile(this.path, content);
        } catch (error) {
            console.log('[save]\tHa ocurrido un error: ', error)
        }
    }

    async load() {
        try {
            if (existsSync(this.path)) {
                const jsonToArray = await fsPromises.readFile(this.path, "utf-8");
                this.products = JSON.parse(jsonToArray);
                console.log("[load]\tDatos cargados:", this.products);

                if (this.products.length > 0) {
                    const maxId = Math.max(...this.products.map(product => product.id));
                    this.nextId = maxId + 1;
                }
            } else {
                console.log("[load]\tEl archivo no existe.");
            }
        } catch (error) {
            console.log("[load]\tError al cargar los datos:", error);
        }
    }

    async addProduct(title, category, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.error('[addProduct]\tTodos los campos son requeridos, no se agregó ningún producto.')
            return;
        }

        if (this.getProductByCode(code)) {
            return console.log(`[addProduct]\tNo se puede agregar porque ya existe un producto con el mismo 'code'. Codigo: ${code}`);
        }

        if (this.getProductById(this.id)) {
            return console.log(`[addProduct]\tNo se puede agregar porque ya existe un producto con el mismo 'id'. Codigo: ${id}`);
        }

        const product = new Product(this.nextId, title, description, price, thumbnail, code, stock);
        this.products.push(product);
        this.nextId++;
        console.log(`[addProduct]\tSe agrego el producto id: ${product.id} ${product.title} ${product.code}`);
        await this.save();
        return product;
    }

    getProductByCode(code) {
        return this.products.find(product => product.code === code) || null;
    }

    getProductById(id) {
        const foundProduct = this.products.find(product => product.id === id);
        if (foundProduct) {
            return console.log("[getProductById]\tProducto encontrado:", foundProduct);
        } else {
            return console.log("[getProductById]\tNo se encontró el producto con ID:", id);
        }
    }

    async updateProduct(id, title, description, price, thumbnail, code, stock) {
        const product = this.products.find(p => p.id === id);

        if (this.getProductByCode(code)) {
            return console.log(`[updateProduct]\tNo se puede modificar porque ya existe un producto con el mismo 'code'. Codigo: ${code}`);
        }

        if (product) {
            product.title = title || product.title;
            product.description = description || product.description;
            product.price = price || product.price;
            product.thumbnail = thumbnail || product.thumbnail;
            product.code = code || product.code;
            product.stock = stock || product.stock;

            await this.save();

            console.log(`[updateProduct]\tSe modifico el producto id ${id}, con los siguientes campos: ${product.title}, ${product.description}, ${product.price}, ${product.thumbnail}, ${product.code}, ${product.stock} `);
            return product;
        }

        return console.log(`[updateProduct]\tNo se encontró el producto con el ID ${id}`);
    }

    async deleteProduct(id) {
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            const deletedProduct = this.products.splice(index, 1)[0];
            await this.save();
            return console.log(`[deleteProduct]\tSe ha eliminado el producto con ID ${id}`);
        }
        return console.log(`[deleteProduct]\tNo existe producto con el ID ${id}, por lo cual no se ha eliminado ningún elemento.`);
    }

    getProducts() {
        if (this.products.length === 0) {
            return `[getProducts]\tNo existen productos`, this.products;
        } else {
            return this.products.map(product => `${product.code} - ${product.title}`).join("\n");
        }
    }
}

export default ProductManager;

const fs = require('fs');

class ProductManager {
  constructor(path, products) {
    this.path = path;
    this.products = products
  }

  idCount = 0;

  async addProduct(product) {

    if (this.#productHasAllKeys(product)) {
      if (this.#checkDuplicatedCodes(product)) {
        console.log(`${product.title} ya se encuentra cargado`)
      } else {
        this.products.push({ ...product, id: this.idCount });
        this.idCount++;
        await this.#saveProductsInfs(this.products);
      }
    }
    return "hola";
  }

  #checkDuplicatedCodes(product) {

    for (let i = 0; i < this.products.length; i++) {
      if (product.code === this.products[i].code) {
        return true;
      }
    }
    return false;
  }

  #productHasAllKeys(product) {

    const expectedKeys = ['title', 'description', 'price', 'thumbnail', 'code', 'stock'];
    const productKeys = Object.keys(product);

    if (expectedKeys.every((key) => productKeys.includes(key)) &&
      productKeys.length === expectedKeys.length) {
      return true;
    } else {
      console.log("producto incompleto");
      return false;
    }
  }

  async getProductsById(id) {

    let products = await this.#getProductsInfs();
    let parsedProducts = JSON.parse(products)
    
    let product = parsedProducts.find((product) => product.id === id);
    if (product) {
      console.log(product);
      return product;
    }
    console.log("Producto no encontrado");
    return false;
  }

  async updateProduct(id, field, value) {

    let product = this.products.find((product) => product.id === id);
    if (product.hasOwnProperty(field) && field !== 'id') {
      product[field] = value;
      await this.#saveProductsInfs(this.products);
    } else {
      console.log('hubo un error al actualizar el producto');
    }
  }

  async deleteProduct(id) {

    let product = this.products.find((product) => product.id === id);
    if (product) {
      let indexOfproductToRemove = this.products.indexOf(product);
      this.products.splice(indexOfproductToRemove, 1);
      await this.#saveProductsInfs(this.products)
    } else {
      console.log(`el producto no se encuentra en el carrito`);
    }
  }

  async getProducts() {
    try {
      let cart = await this.#getProductsInfs();
      let parsedCart = JSON.parse(cart);

      if (parsedCart && parsedCart.length > 0) {
        console.log(parsedCart);
      } else {
        console.log('El archivo está vacío o no contiene datos.');
      }
    } catch (err) {
      console.log(err);
    }
  }

  async #saveProductsInfs(products) {
    try {
      await fs.promises.writeFile(this.path, JSON.stringify(products));
    } catch (e) {
      console.log(e);
    }
  }

  async #getProductsInfs() {
    try {
      const storedProducts = await fs.promises.readFile(this.path, 'utf-8');
      return storedProducts;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}

let productmanager1 = new ProductManager('./data.txt', []);

let product = {
  title: "product1",
  description: "asdf",
  price: "$1500",
  thumbnail: "https://www.lainsuperablevirtual.com.ar/Articulo_Foto_Multi/1816_1.jpeg",
  code: 0,
  stock: 24
}

let product2 = {
  title: "product2",
  description: "asdf",
  price: "$2300",
  thumbnail: "https://laopinion.com/wp-content/uploads/sites/3/2020/02/pepsi-coca-cola-sabor-ingrediente.jpg?resize=1316,740&quality=80",
  code: 303,
  stock: 24
}

let product3 = {
  title: "product3",
  description: "asdf",
  price: "$1800",
  thumbnail: "https://superlago.com.ar/wp-content/uploads/2021/04/web03.png",
  code: 43,
}

const main = async () => {

  await productmanager1.addProduct(product);

  await productmanager1.getProductsById(0)

  await productmanager1.updateProduct(0, "title", "hola")

  await productmanager1.getProducts();

  await productmanager1.deleteProduct(0);

  await productmanager1.getProducts();

  await productmanager1.addProduct(product3);

  await productmanager1.addProduct(product);

  await productmanager1.addProduct(product2);

  await productmanager1.getProducts();

}
main();












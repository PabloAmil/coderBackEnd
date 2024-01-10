const productManager = require("./entregable");
const express = require("express");
const app = express();

app.get('/productos', async (req, res) => {

  if (req.query.limit) {
    let { limit } = req.query;
    let products = await productManager.getXQuantityOfProducts(limit);
    res.send(products);
  } else {
    let products = await productManager.getProducts();
    res.send(products);
  }
})

app.get('/productos/:id', async (req, res) => {
  let id = parseInt(req.params.id);
  let product = await productManager.getProductsById(id);
  if (product !== false) {
    res.send(product);
  } else {
    res.status(404).send('Error 404: Producto no encontrado');
  }
})

app.listen(3000, () => {
  console.log(`escuchando el puerto 3000`);
})


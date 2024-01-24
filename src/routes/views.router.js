const express = require('express');
const router = express.Router();
const productManager = require('../productManager');

router.get("/home", async (req, res) => {

  let products = await productManager.getProducts();
  res.render("home", {
    products
  });
})

router.get("/realtimeproducts", async (req, res) => {

  let products = await productManager.getProducts();
  res.render('realTimeProducts', {
    products
  });
})


module.exports = router;
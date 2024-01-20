const express = require("express");
const app = express();
const routerCarts = require("./src/routes/carts.router");
const routerProducts = require("./src/routes/products.router");
const handlebars = require("express-handlebars");

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/src/views');
app.set('view engine', 'handlebars');
app.use(express.json());

app.use(express.static(__dirname + '/public'));

app.use("/api/carts", routerCarts);
app.use("/api/products", routerProducts);

app.get("/", (req, res) => {
  let user = {
    name: 'Haru'
  }

  res.render("index", user);
})

app.listen(3000, () => console.log("now listening to port 3000"));



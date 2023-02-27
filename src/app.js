import express from "express";
import { selectAllProduct, selectOneProduct } from "./controller/product.js";
const app = express();
const PORT = process.env.PORT || 3000;

//Middleweare
app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

//Routes HTTP-Rest

//Get All Product
app.get("/products", async (req, res) => {
  let products = await selectAllProduct();
  products = products.map((product) => {
    return {
      ...product,
      imagens: product.imagens.split(","),
      included: product.included.split(","),
    };
  });

  res.status(200).send(products);
});

//Get One Product
app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  let product = await selectOneProduct(id);
  product = {
    ...product,
    imagens: product.imagens.split(","),
    included: product.included.split(","),
  };
  res.status(200).send(product);
});

//Del One product
app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  res.status(200).send(product);
});

//Escutar desde o server
app.listen(PORT, () => {
  console.log("API ready to use");
});

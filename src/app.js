import express from "express";
import { selectAllProduct } from "./controller/product.js";
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
//Conect to the dtabase

//Routes HTTP-Rest
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

app.get("/teste", async (req, res) => {
  res.json({ msg: "Working" });
});

//Escutar desde o server
app.listen(PORT, () => {
  console.log("API ready to use");
});

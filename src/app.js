import express from "express";
import {
  deleteOneProduct,
  insertProduct,
  selectAllProduct,
  selectOneProduct,
  updateOneProduct,
} from "./controller/product.js";
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

//Insert Product
app.post("/products", async (req, res) => {
  let product = req.body;
  product = {
    ...product,
    imagens: product.imagens.join(","),
    included: product.included.join(","),
  };
  await insertProduct(product);
  res.status(200).send({ insert: true });
});

//Del One product
app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  await deleteOneProduct(id);
  res.status(200).send({ delete: true });
});

//Update One product
app.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  await updateOneProduct(id, req.body);
  res.status(200).send({ update: true });
});

//Escutar desde o server
app.listen(PORT, () => {
  console.log("API ready to use");
});

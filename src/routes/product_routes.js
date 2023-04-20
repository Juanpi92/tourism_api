import { validate } from "../authentication/auth.js";
import {
  deleteOneProduct,
  insertProduct,
  patchProduct,
  selectAllFaq,
  selectAllProduct,
  selectOneProduct,
  updateOneProduct,
} from "../controller/product.js";

export const productRoutes = (app) => {
  //Get All Product/*
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
  app.post("/products", validate, async (req, res) => {
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
  app.delete("/products/:id", validate, async (req, res) => {
    const { id } = req.params;
    await deleteOneProduct(id);
    res.status(200).send({ delete: true });
  });

  //Update One product
  app.put("/products/:id", validate, async (req, res) => {
    const { id } = req.params;
    let product = req.body;
    await updateOneProduct(id, product);
    res.status(200).send({ update: true });
  });

  //Get All Faq/*
  app.get("/faq", async (req, res) => {
    let faq = await selectAllFaq();
    res.status(200).send(faq);
  });


  
  //Atualizar a data e a quantidade de um produto 
  app.patch("/product/:id", validate, async (req, res) => {
    try {
      const id = Number(req.params.id);
      await patchProduct(id, req.body);
      res.status(200).send({ updated: true });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  });
};

import { validate, validateAdmin } from "../authentication/auth.js";
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
  app.post("/products", validateAdmin, async (req, res) => {
    const token = req.header("admin-token");
    let token_decoded= jwt.decode(token,process.env.SECRET_TOKEN);
       if(token_decoded.role!="admin"){
     return res.status(403).send({error:"Vocẽ não tem privilegios para usar este recurso"});
    }
try {
  let product = req.body;
    product = {
      ...product,
      imagens: product.imagens.join(","),
      included: product.included.join(","),
    };
    await insertProduct(product);
    res.status(200).send({ insert: true });
} catch (error) {
  res.status(400).send({ error: "Cant access to the database" });
}
  });

  //Del One product
  app.delete("/product/:id", validateAdmin, async (req, res) => {
    const token = req.header("admin-token");
    let token_decoded= jwt.decode(token,process.env.SECRET_TOKEN);
       if(token_decoded.role!="admin"){
     return res.status(403).send({error:"Vocẽ não tem privilegios para usar este recurso"});
    }
    try {
      const { id } = req.params;
      await deleteOneProduct(id);
      res.status(200).send({ delete: true });
    } catch (error) {
      res.status(400).send({ error: "Cant access to the database" }); 
    }

  });

  //Update One product
  app.put("/product/:id", validateAdmin, async (req, res) => {
    const token = req.header("admin-token");
    let token_decoded= jwt.decode(token,process.env.SECRET_TOKEN);
       if(token_decoded.role!="admin"){
     return res.status(403).send({error:"Vocẽ não tem privilegios para usar este recurso"});
    }
    try {
      const { id } = req.params;
      let product = req.body;
      await updateOneProduct(id, product);
      res.status(200).send({ update: true });
    } catch (error) {
      res.status(400).send({ error: "Cant access to the database" }); 
    }


  });

  //Get All Faq/*
  app.get("/faq", async (req, res) => {
    try {
      let faq = await selectAllFaq();
      res.status(200).send(faq);
    } catch (error) {
      res.status(400).send({ error: "Cant access to the database" }); 
    }
   });



  //Atualizar a data e a quantidade de um produto 
  app.patch("/product/:id", validateAdmin, async (req, res) => {
    const token = req.header("admin-token");
    let token_decoded= jwt.decode(token,process.env.SECRET_TOKEN);
       if(token_decoded.role!="admin"){
     return res.status(403).send({error:"Vocẽ não tem privilegios para usar este recurso"});
    }
    try {
      const id = Number(req.params.id);
      await patchProduct(id, req.body);
      res.status(200).send({ updated: true });
    } catch (error) {
      res.status(400).send({ error: "Cant access to the database" }); 
    }
  });
};

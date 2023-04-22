import {
  getAllDuvidas,
  getAllUser,
  getCompras,
  patchDuvidas,
  validateAdminEmail,
} from "../controller/admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validate, validateAdmin } from "../authentication/auth.js";
export const adminRoutes = (app) => {

  app.post("/admin/login", async (req, res) => {
    try {
      let isEmail = await validateAdminEmail(req.body.email);
      if (!isEmail) {
        res.status(400).send({ error: "User or password wrong " });
      } else {
        let valid = await bcrypt.compare(req.body.password, isEmail.password);
        if (!valid) {
          res.status(400).send({ error: "User or password wrong " });
        } else {
          delete isEmail.password;
          let token = jwt.sign(isEmail, process.env.SECRET_TOKEN);
          res.status(200).send({ user: isEmail, token: token });
        }
      }
    } catch (error) {
      res.status(400).send({ error: "An error ocurred" });
    }
 
  });
  app.get("/users", validate, async (req, res) => {
    let users = await getAllUser();
    res.status(200).send(users);
  });

  app.get("/compras", validate, async (req, res) => {
    let compras = await getCompras();
    res.status(200).send(compras);
  });

  app.get("/duvidas", validateAdmin, async (req, res) => {
    let duvidas = await getAllDuvidas();
    res.status(200).send(duvidas);
  });

  //responder uma duvida
  app.patch("/duvida/:id", validateAdmin, async (req, res) => {
    try {
      const id = Number(req.params.id);
     await patchDuvidas(id, req.body);
     res.status(200).send("duvida respondida satisfatoriamente");
    } catch (error) {
      res.status(400).send({ error: "Cant acces to the database" });
    }  
  });

};

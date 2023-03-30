import {
  getAllUser,
  getCompras,
  patchProduct,
  validateAdminEmail,
} from "../controller/admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validate } from "../authentication/auth.js";
export const adminRoutes = (app) => {
  app.post("/admin/login", async (req, res) => {
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
  });
  app.get("/users", validate, async (req, res) => {
    let users = await getAllUser();
    res.status(200).send(users);
  });

  app.get("/compras", validate, async (req, res) => {
    let compras = await getCompras();
    res.status(200).send(compras);
  });

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

import {
  comprar,
  getDuvidas,
  getHistory,
  patchUser,
  postDuvida,
  registerUser,
  validateEmail,
} from "../controller/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validate } from "../authentication/auth.js";
export const userRoutes = (app) => {
  //Register user
  app.post("/register", async (req, res) => {
    try {
      let user = req.body;
      //Here we encripted the password
      let hashed_password = await bcrypt.hash(req.body.password, 10);
      user = {
        ...user,
        images: user.images.join(","),
        password: hashed_password,
      };
  
      let isEmail = await validateEmail(user.email);
      if (isEmail) {
        res.status(400).send({ error: "User already exist " });
      } else {
        await registerUser(user);
        res.status(200).send({ register: true });
      }
    } catch (error) {
      res.status(400).send({ error: "Cant access to the database" });
    }
 
  });

  app.post("/login", async (req, res) => {
    try {
      let isEmail = await validateEmail(req.body.email);
      if (!isEmail) {
        res.status(400).send({ error: "User or password wrong " });
      } else {
        let valid = await bcrypt.compare(req.body.password, isEmail.password);
        if (!valid) {
          res.status(400).send({ error: "User or password wrong " });
        } else {
          delete isEmail.password;
          isEmail = { ...isEmail, images: isEmail.images.split(",") };
          let token = jwt.sign(isEmail, process.env.SECRET_TOKEN);
          res.status(200).send({ user: isEmail, token: token });
        }
      }
    } catch (error) {
      res.status(400).send({ error: "An error ocurred" });
    }
   
  });

  app.patch("/user/:id", validate, async (req, res) => {
    const id = Number(req.params.id);
    await patchUser(id, req.body);
    res.status(200).send({ updated: true });
  });

  app.post("/comprar", validate, async (req, res) => {
    await comprar(req.body);
    res.status(200).send({ compra: true });
  });
  app.get("/history/:id", validate, async (req, res) => {
    const id = Number(req.params.id);
    let history = await getHistory(id);
    res.status(200).send(history);
  });

  app.post("/duvida", validate, async (req, res) => {
    try {
      await postDuvida(req.body);
      res.status(200).send({ updated: true });
    } catch (error) {
      res.status(400).send({ error: "Cant acces to the database" });
    }
  });
  app.get("/duvida/:id", validate, async (req, res) => {
    try {
      const id = Number(req.params.id);
      let duvidas = await getDuvidas(id);
      res.status(200).send(duvidas);
    } catch (error) {
      res.status(400).send({ error: "Cant acces to the database" });
    }
  });

  app.get("/test", validate, async (req, res) => {
    res.send("ok");
  });
};

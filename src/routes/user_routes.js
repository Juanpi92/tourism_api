import { patchUser, registerUser, validateEmail } from "../controller/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validate } from "../authentication/auth.js";
export const userRoutes = (app) => {
  //Register user
  app.post("/register", async (req, res) => {
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
  });

  app.get("/login", async (req, res) => {
    let isEmail = await validateEmail(req.body.email);
    if (!isEmail) {
      res.status(400).send({ error: "User or password wrong " });
    } else {
      let valid = await bcrypt.compare(req.body.password, isEmail.password);
      if (!valid) {
        res.status(400).send({ error: "User or password wrong " });
      } else {
        delete isEmail.password;
        let token = jwt.sign(isEmail, process.env.SECRET_TOKEN);
        res.status(200).header("auth-token", token).send(isEmail);
      }
    }
  });
  app.patch("/user/:id", validate, async (req, res) => {
    const id = Number(req.params.id);
    await patchUser(id, req.body);
    res.status(200).send({ updated: true });
  });

  app.get("/test", validate, async (req, res) => {
    res.send("ok");
  });
};

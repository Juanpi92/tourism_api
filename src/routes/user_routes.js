import { loginUser, registerUser, validateEmail } from "../controller/user.js";
import bcrypt from "bcrypt";
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
        res.status(200).send(isEmail);
      }
    }
  });
};

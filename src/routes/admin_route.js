import { validateAdminEmail } from "../controller/admin.js";
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
};

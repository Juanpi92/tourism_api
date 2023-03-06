import { registerUser, validateEmail } from "../controller/user.js";

export const userRoutes = (app) => {
  //Select Regions
  app.post("/register", async (req, res) => {
    let user = req.body;
    //Here we encripted the password
    let password = req.body.password;

    user = {
      ...user,
      images: user.images.join(","),
      password: password,
    };

    let isEmail = await validateEmail(user.email);
    if (isEmail) {
      res.status(400).send({ error: "User already exist " });
    } else {
      await registerUser(user);
      res.status(200).send({ register: true });
    }
  });
};

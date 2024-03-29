import {
  deleteDuvida,
  getAllDuvidas,
  getAllUser,
  getCompras,
  patchDuvidas,
  validateAdminEmail,
} from "../controller/admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {validateAdmin } from "../authentication/auth.js";
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

  app.get("/users", validateAdmin, async (req, res) => {
    const token = req.header("admin-token");
   let token_decoded= jwt.decode(token,process.env.SECRET_TOKEN);
      if(token_decoded.role!="admin"&&token_decoded.role!="convidado"&&token_decoded.role!="fotografia"){
    return res.status(403).send({error:"Forbidden resourse"});
   }
//Se não e convidado, admin, ou fotografo dar o res
try {
  let users = await getAllUser();
    res.status(200).send(users);
} catch (error) {
  res.status(400).send({error:"Cant access database"});
} 
  });

  app.get("/compras", validateAdmin, async (req, res) => {
    try {
      let compras = await getCompras();
    res.status(200).send(compras);
    } catch (error) {
      res.status(400).send({error:"Cant access database"});
    }
  });

  app.get("/duvidas", validateAdmin, async (req, res) => {
    try {
      let duvidas = await getAllDuvidas();
      res.status(200).send(duvidas);
    } catch (error) {
      res.status(400).send({error:"Cant access database"});
    }

  });

  app.delete("/duvida/:id", validateAdmin, async (req, res) => {
    const token = req.header("admin-token");
    let token_decoded= jwt.decode(token,process.env.SECRET_TOKEN);
       if(token_decoded.role!="admin"){
     return res.status(403).send({error:"Vocẽ não tem privilegios para usar este recurso"});
    }
    try {
      const id = Number(req.params.id);
      let deleted=await deleteDuvida(id)
     if(!deleted.changes){
throw new Error("")
     };
      res.status(200).send({"deleted":true});
    } catch (error) {
        res.status(400).send({ error: "Cant access to the database" });
    }
  });

  //responder uma duvida
  app.patch("/duvida/:id", validateAdmin, async (req, res) => {
    const token = req.header("admin-token");
    let token_decoded= jwt.decode(token,process.env.SECRET_TOKEN);
       if(token_decoded.role!="admin"){
     return res.status(403).send({error:"Vocẽ não tem privilegios para usar este recurso"});
    }
    try {
      const id = Number(req.params.id);
     await patchDuvidas(id, req.body);
     res.status(200).send("duvida respondida satisfatoriamente");
    } catch (error) {
      res.status(400).send({ error: "Cant access to the database" });
    }  
  });

};

import express from "express";
import { documentationRoutes } from "./routes/documentation_routes.js";
import { productRoutes } from "./routes/product_routes.js";
import { regionRoutes } from "./routes/region_routes.js";
const app = express();
const PORT = process.env.PORT || 3000;

//Middleweare
app.use(express.json());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

//Routes HTTP-Rest

//Product Routes
productRoutes(app);

//routes for the documentation
documentationRoutes(app);

//routes for region
regionRoutes(app);

//listen from the server
app.listen(PORT, () => {
  console.log(`API ready to use in http://localhost:${PORT}`);
});

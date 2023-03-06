import { selectAllRegion } from "../controller/region.js";

export const regionRoutes = (app) => {
  //Select Regions
  app.get("/region", async (req, res) => {
    let myregion = await selectAllRegion();
    let region = myregion.map((region) => region.region);
    res.status(200).send(region);
  });
};

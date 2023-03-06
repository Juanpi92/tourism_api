import path from "path";
export const documentationRoutes = (app) => {
  app.get("/", async (req, res) => {
    res.sendFile(path.join(path.resolve(), "src/documentation/index.html"));
  });
  app.get("/css", async (req, res) => {
    res.sendFile(path.join(path.resolve(), "src/documentation/index.css"));
  });
  app.get("/js", async (req, res) => {
    res.sendFile(path.join(path.resolve(), "src/documentation/index.js"));
  });
};

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
  app.get("/user", async (req, res) => {
    res.sendFile(path.join(path.resolve(), "src/documentation/user.html"));
  });
  app.get("/usercss", async (req, res) => {
    res.sendFile(path.join(path.resolve(), "src/documentation/user.css"));
  });
  app.get("/userjs", async (req, res) => {
    res.sendFile(path.join(path.resolve(), "src/documentation/user.js"));
  });
};

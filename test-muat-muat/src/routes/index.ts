const bodyParser = require("body-parser");
import productRoutes from "./productRoutes";
import type { Express } from "express";

export default (app: Express) => {
  app.use(bodyParser.json());
  app.use("/api/products", productRoutes);
}

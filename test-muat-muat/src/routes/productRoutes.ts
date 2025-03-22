import { Router } from "express";
import productController from "../controllers/productController";

const router = Router();

router
  .get("/", productController.index)
  .get("/:id", productController.show)
  .post("/", productController.create)
  .put("/:id", productController.update)
  .put("/set-favorite/:id", productController.setFavorite)
  .delete("/:id", productController.delete)

export default router;

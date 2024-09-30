import express from "express";
import { createProducts, deleteProduct, getProductById, getProducts, updateProduct } from "../Controllers/controller.js";

const router = express.Router();

router.get("/get",getProducts );
router.post("/create",createProducts );
router.get("/getproduct/:id",getProductById);
router.put("/edit/:id",updateProduct );
router.delete("/delete/:id",deleteProduct );

export default router;

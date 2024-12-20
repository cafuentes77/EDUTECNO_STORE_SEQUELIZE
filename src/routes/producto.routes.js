import { Router } from "express";
import { createProduct } from "../controllers/Producto.controller.js";


const router = Router()

router.post('/', createProduct);

export default router
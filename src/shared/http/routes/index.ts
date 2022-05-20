import { Router } from "express";
import productsRouter from "@shared/modules/products/routes/products.routes";
const routes = Router ();

routes.use('/products', productsRouter)

export default routes;

import { Router } from "express";
import { LivroController } from "./controller/LivroController";

const routes = Router();

routes.post("/api/livros", LivroController.create);
routes.get("/api/livros", LivroController.getAll);
routes.get("/api/livros/:id", LivroController.getById);
routes.put("/api/livros/:id", LivroController.update);
routes.delete("/api/livros/:id", LivroController.delete);

export default routes;

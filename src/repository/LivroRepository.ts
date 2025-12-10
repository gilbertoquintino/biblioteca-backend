import { AppDataSource } from "../data-source";
import { Livro } from "../entity/Livro";

export const LivroRepository = AppDataSource.getRepository(Livro);

import { Request, Response } from "express";
import { LivroRepository } from "../repository/LivroRepository";
import { Livro } from "../entity/Livro";

export class LivroController {

    static async create(req: Request, res: Response) {
        try {
            const { titulo, autor, isbn, anoPublicacao, disponivel } = req.body;
            const livro = new Livro();
            livro.titulo = titulo;
            livro.autor = autor;
            livro.isbn = isbn;
            livro.anoPublicacao = anoPublicacao;
            livro.disponivel = disponivel !== undefined ? disponivel : true;

            const savedLivro = await LivroRepository.save(livro);
            return res.status(201).json(savedLivro);
        } catch (error) {
            return res.status(500).json({ message: "Erro ao criar livro", error });
        }
    }

    static async getAll(req: Request, res: Response) {
        try {
            const livros = await LivroRepository.find();
            return res.json(livros);
        } catch (error) {
            return res.status(500).json({ message: "Erro ao buscar livros", error });
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const livro = await LivroRepository.findOneBy({ id });
            if (!livro) {
                return res.status(404).json({ message: "Livro não encontrado" });
            }
            return res.json(livro);
        } catch (error) {
            return res.status(500).json({ message: "Erro ao buscar livro", error });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const { titulo, autor, isbn, anoPublicacao, disponivel } = req.body;

            const livro = await LivroRepository.findOneBy({ id });

            if (!livro) {
                return res.status(404).json({ message: "Livro não encontrado" });
            }

            if (titulo) livro.titulo = titulo;
            if (autor) livro.autor = autor;
            if (isbn) livro.isbn = isbn;
            if (anoPublicacao) livro.anoPublicacao = anoPublicacao;
            if (disponivel !== undefined) livro.disponivel = disponivel;

            await LivroRepository.save(livro);
            return res.json(livro);
        } catch (error) {
            return res.status(500).json({ message: "Erro ao atualizar livro", error });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const livro = await LivroRepository.findOneBy({ id });

            if (!livro) {
                return res.status(404).json({ message: "Livro não encontrado" });
            }

            await LivroRepository.remove(livro);
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ message: "Erro ao remover livro", error });
        }
    }
}

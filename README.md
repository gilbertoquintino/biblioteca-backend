# Walkthrough - Sistema de Gerenciamento de Biblioteca

backend API para gerenciamento de biblioteca (Entidade Livro), desenvolvido com TypeScript, Node.js, Express e TypeORM.

## Visão Geral
A solução implementa uma arquitetura simplificada de Controller/Repository usando SQLite como banco de dados.

### Funcionalidades
- **CRUD Completo**: Criar, Ler, Atualizar, Deletar para a entidade `Livro`.
- **Banco Relacional**: SQLite via TypeORM.
- **TypeScript**: Código tipado e estruturado.

## Como Rodar

### Pré-requisitos
- Node.js

### Instalação
1. Instale as dependências:
   ```bash
   npm install
   ```

### Executando a Aplicação
Inicie o servidor:
```bash
npx ts-node src/app.ts
```
O servidor iniciará em `http://localhost:3000`.

## Endpoints da API

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| POST | `/api/livros` | Criar novo livro |
| GET | `/api/livros` | Listar todos os livros |
| GET | `/api/livros/:id` | Obter livro por ID |
| PUT | `/api/livros/:id` | Atualizar livro |
| DELETE | `/api/livros/:id` | Deletar livro |

## Resultados da Verificação
O script de verificação automatizada `verify.ts` foi executado com sucesso, confirmando todas as operações CRUD.

```
Starting Tests...
1. Creating Book... -> Status: 201
2. Get All Books... -> Status: 200
3. Get Book 1... -> Status: 200
4. Update Book 1... -> Status: 200
5. Delete Book 1... -> Status: 204
6. Verify Delete... -> Status: 404
```

import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./data-source";
import routes from "./routes";

const app = express();
app.use(express.json());
app.use(routes);

AppDataSource.initialize().then(async () => {
    console.log("Data Source has been initialized!");
    app.listen(3000, () => {
        console.log("Server started on port 3000");
    });
}).catch(error => console.log(error));

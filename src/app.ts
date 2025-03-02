import express, { Application, Request, Response } from "express";
import animalsRouter from "./routes/users.routes";

const app: Application = express();

app.use(express.json());
app.use("/api", animalsRouter);

app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Witaj w ZooKeeper API! <br> " +
        "<a href='/api/animals'>Wszystkie zwierzęta</a>");
});

export default app;
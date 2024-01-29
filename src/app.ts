import express, { Request, Response, NextFunction } from "express";
import apiRouer from "./routes/api";
import data from "./data";
import logMiddleware from "./log.middleware";

const app = express();
const port = 3000;

app.set("views", "./src/views");
app.set("view engine", "hbs");

app.use(logMiddleware);
app.use(express.static("public"));

app.get("/", (req: Request, res: Response) => {
    res.render("index", { title: "My Ecommerce", prodotti: data })
});

app.get("/prodotti/:id", (req: Request, res: Response) => {
    const id = req.params.id;
    const idNumber = Number(id);

    if (isNaN(idNumber)) {
        res.status(400).render("error", { title: "Errore", message: "Formato id non corretto" });
        return;
    }

    const prodotto = data.find(x => x.id == idNumber);

    if (prodotto) {
        res.render("prodotto", { title: "My Ecommerce - " + prodotto.title, prodotto: prodotto });
    } else {
        res.status(404).render("error", { title: "Errore", message: `Prodotto con id ${idNumber} non trovato.` });
    }
});

app.use("/api", apiRouer);

// errore 404
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).render("404", { title: "Pagina non trovata." });
});

// errore 500
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).render("error", { title: "Errore", message: `Qualcosa è andato storto.` });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
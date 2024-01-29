import { Request, Response, NextFunction, Router } from "express";
import data from "../data";

const router = Router();

router.get("/prodotti", (req: Request, res: Response) => {
    res.json(data);
});

router.get("/prodotti/:id", (req: Request, res: Response) => {
    const id = req.params.id;
    const idNumber = Number(id);

    if (isNaN(idNumber)) {
        res.status(400).render("error", { title: "Errore", message: "Formato id non corretto" });
        return;
    }

    const prodotto = data.find(x => x.id == idNumber);

    if (prodotto) {
        res.json(prodotto);
    } else {
        res.status(404).json({ message: `Prodotto con id ${idNumber} non trovato.` });
    }
});

export default router;
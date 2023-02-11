import express from "express";
import { addUser, deleteCotainer, getContainer, updateContainer, getMovimentacao } from "../controllers/user.js"

const router = express.Router();

router.get("/", getContainer);

router.post("/", addUser);

router.put("/:id", updateContainer);

router.delete("/:id", deleteCotainer);

router.get("/movimentacoes", getMovimentacao);

export default router;
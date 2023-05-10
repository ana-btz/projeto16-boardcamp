import cors from "cors";
import express from "express";

const app = express();
app.use(cors());

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

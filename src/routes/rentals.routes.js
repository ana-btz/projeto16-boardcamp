import { Router } from "express";
import { insertRent } from "../controllers/rentals.controllers.js";

const rentalsRouter = Router();

rentalsRouter.post("/rentals", insertRent);

export default rentalsRouter;

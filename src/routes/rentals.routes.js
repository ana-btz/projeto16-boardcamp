import { Router } from "express";
import { deleteRent, insertRent } from "../controllers/rentals.controllers.js";
import { validateSchema } from "../middlewares/validate.schema.middleware.js";
import { rentSchema } from "../schemas/rentals.schemas.js";

const rentalsRouter = Router();

rentalsRouter.post("/rentals", validateSchema(rentSchema), insertRent);
rentalsRouter.delete("/rentals/:id", deleteRent);

export default rentalsRouter;

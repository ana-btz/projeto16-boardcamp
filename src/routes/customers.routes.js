import { Router } from "express";
import {
  getCustomers,
  getCustomerById,
  insertCustomer,
  updateCustomer,
} from "../controllers/customers.controller.js";
import { validateSchema } from "../middlewares/validate.schema.middleware.js";
import { customerSchema } from "../schemas/customers.schemas.js";

const customersRouter = Router();

customersRouter.get("/customers", getCustomers);
customersRouter.get("/customers/:id", getCustomerById);
customersRouter.post(
  "/customers",
  validateSchema(customerSchema),
  insertCustomer
);
customersRouter.put(
  "/customers/:id",
  validateSchema(customerSchema),
  updateCustomer
);

export default customersRouter;

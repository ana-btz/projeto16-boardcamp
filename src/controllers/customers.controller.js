import { db } from "../database/database.connection.js";

export async function getCustomers(req, res) {
  try {
    const customers = await db.query(`SELECT * FROM customers`);
    console.table(customers.rows);
    res.status(200).send(customers.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function getCustomerById(req, res) {
  const id = parseInt(req.params.id);

  if (isNaN(id)) return res.sendStatus(400);
  try {
    const customer = await db.query(`SELECT * FROM customers WHERE id = $1;`, [
      id,
    ]);
    console.log(customer.rows[0]);

    if (customer.rows.length === 0) return res.sendStatus(404);

    res.status(200).send(customer[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

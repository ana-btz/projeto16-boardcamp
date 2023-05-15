import dayjs from "dayjs";
import { db } from "../database/database.connection.js";

export async function getCustomers(req, res) {
  let customers = [];

  try {
    const { rows } = await db.query(`SELECT * FROM customers`);

    for (const customer of rows) {
      const { rows } = await db.query(
        `SELECT (birthday) as ExistingDateformat,
      to_char(birthday,'YYYY-MM-DD') As NewDateFormat FROM customers Where id = $1;`,
        [customer.id]
      );

      const birthday = rows[0].newdateformat;
      customers.push({ ...customer, birthday: birthday });
    }

    res.status(200).send(customers);
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
    if (customer.rows.length === 0) return res.sendStatus(404);

    const { rows } = await db.query(
      `SELECT (birthday) as ExistingDateformat,
    to_char(birthday,'YYYY-MM-DD') As NewDateFormat FROM customers Where id = $1;`,
      [id]
    );

    const birthday = rows[0].newdateformat;

    res.status(200).send({ ...customer.rows[0], birthday: birthday });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function insertCustomer(req, res) {
  const { name, phone, cpf, birthday } = req.body;

  if (isNaN(Number(cpf))) return res.sendStatus(400);

  try {
    const { rows } = await db.query(`SELECT * FROM customers WHERE cpf = $1`, [
      cpf,
    ]);
    if (rows.length > 0) return res.sendStatus(409);

    const date = dayjs(birthday).format("YYYY-MM-DD");

    await db.query(
      `INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4);`,
      [name, phone, cpf, date]
    );

    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

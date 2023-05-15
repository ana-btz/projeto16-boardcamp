import dayjs from "dayjs";
import { db } from "../database/database.connection.js";

export async function insertRent(req, res) {
  const { customerId, gameId, daysRented } = req.body;

  try {
    const costumerResult = await db.query(
      `SELECT * FROM customers WHERE id = $1;`,
      [customerId]
    );
    if (costumerResult.rows.length === 0)
      return res.status(400).send("Cliente não encontrado");

    const gameResult = await db.query(`SELECT * FROM games WHERE id = $1;`, [
      gameId,
    ]);
    if (gameResult.rows.length === 0)
      return res.status(400).send("Jogo não encontrado");

    const rentalsResponse = await db.query(`SELECT * FROM rentals`);
    const rentalsQuantity = rentalsResponse.rows.length;
    const { stockTotal } = gameResult.rows[0];

    if (rentalsQuantity >= stockTotal)
      return res.status(400).send("Estoque em falta");

    const { rows } = await db.query(
      `SELECT ("pricePerDay") FROM games WHERE id = $1;`,
      [gameId]
    );

    const { pricePerDay } = rows[0];
    const originalPrice = daysRented * pricePerDay;
    const rentDate = dayjs().format("YYYY-MM-DD");
    const returnDate = null;
    const delayFee = null;

    await db.query(
      `INSERT INTO rentals 
        (
            "customerId", 
            "gameId",
            "rentDate",
            "daysRented",
            "returnDate",
            "originalPrice", 
            "delayFee"
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7);`,
      [
        customerId,
        gameId,
        rentDate,
        daysRented,
        returnDate,
        originalPrice,
        delayFee,
      ]
    );

    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error, message);
  }
}

export async function deleteRent(req, res) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.sendStatus(400);

  try {
    const rentResult = await db.query(`SELECT * FROM rentals WHERE id = $1;`, [
      id,
    ]);
    if (rentResult.rows.length === 0) return sendStatus(404);

    const { returnDate } = rentResult.rows[0];
    if (!returnDate) return res.status(400).send("Aluguel não finalizado");

    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

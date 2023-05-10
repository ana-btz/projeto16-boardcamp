import { db } from "../database/database.connection.js";

export async function getGames(req, res) {
  try {
    const games = await db.query(`SELECT * FROM games;`); // template string caso precise pular linhas
    console.table(games.rows);
    res.send(games.rows);
  } catch (error) {
    console.log(error.message);
  }
}

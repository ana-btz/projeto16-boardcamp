import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { pool } = pg;

const configDataBase = {
  connectionString: process.env.DATABASE_URL,
};

export const db = new pool(configDataBase);

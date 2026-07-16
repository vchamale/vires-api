import { Sequelize, QueryTypes } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.PG_DATABASE as string,
  process.env.PG_USER as string,
  process.env.PG_PASSWORD as string,
  {
    host: process.env.PG_HOST,
    port: Number(process.env.PG_PORT) || 5432,
    dialect: "postgres",
    dialectOptions: {
      ssl: { require: true, rejectUnauthorized: false },
    },
    pool: { max: 10, min: 0, idle: 10000 },
  }
);

export { sequelize, QueryTypes };

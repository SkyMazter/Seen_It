import { Sequelize } from "sequelize";
import "dotenv/config";

const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  dialect: "mysql",
  port: Number(process.env.DB_PORT),
});


export default sequelize;

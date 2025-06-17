// ./db/sequelize.js
import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import path from "path";

console.log(process.env.POSTGRES_URI);
const sequelize = new Sequelize(process.env.POSTGRES_URI || '', {
    dialect: "postgres",
    logging: false,
});

export default sequelize;
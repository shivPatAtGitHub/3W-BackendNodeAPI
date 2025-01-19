import Sequelize from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const dbConnect = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: false,
  }
);

const authenticateDB = async () => {
  try {
    await dbConnect.authenticate();
    console.log(`Database Authenticated`);
  } catch (error) {
    console.log(`Unable to Connected to DB`, error.message);
  }
};

authenticateDB();

export default dbConnect;

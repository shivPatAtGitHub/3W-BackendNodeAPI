import Sequelize from "sequelize";
import dbConnect from "../Utils/dbconnection.js";

const User_Model = dbConnect.define("user", {
  name: Sequelize.STRING,
  handle: Sequelize.STRING,
});

export default User_Model;

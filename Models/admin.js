import Sequelize from "sequelize";
import dbConnect from "../Utils/dbconnection.js";

const Admin_Model = dbConnect.define("admin", {
  userName: Sequelize.STRING,
  password: Sequelize.STRING,
});

export default Admin_Model;

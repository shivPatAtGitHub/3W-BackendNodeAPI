import Sequelize from "sequelize";
import dbConnect from "../Utils/dbconnection.js";

const Image_Model = dbConnect.define("image", {
  imagePath: Sequelize.STRING,
  imageURL: {
    type: Sequelize.VIRTUAL,
    get() {
      const path = this.getDataValue("imagePath");
      return path
        ? `https://api-3w-social-media-backend.netlify.app/${path}`
        : null;
    },
  },
});

export default Image_Model;

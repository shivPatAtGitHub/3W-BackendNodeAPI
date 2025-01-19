import { validationResult } from "express-validator";
import All_Models from "../../Utils/allModels.js";
import { singleFileUpload } from "../Middlewares/fileUpload.js";

export const UserController = {};

UserController.createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }

  try {
    const { name, handle } = req.body;
    let { image } = req.files;

    if (!image || image.length === 0) {
      return res.status(422).json({ msg: "No Images were uploaded" });
    }

    if (!Array.isArray(image)) {
      image = [image];
    }

    const user = await All_Models.User_Model.create({
      name,
      handle,
    });

    if (!user) {
      return res.status(422).json({ msg: "Error creating User" });
    }

    image.forEach(async (i) => {
      let imageName = i.name;

      let imagePath = `uploads/${Date.now()}/${imageName}`;
      let imageDir = `Assets/uploads/${Date.now()}/${imageName}`;

      await singleFileUpload(imageDir, i);
      await All_Models.Image_Model.create({ imagePath, userId: user.id });
    });

    return res.status(200).json({
      msg: "Added User succesfully",
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

UserController.getUser = async (req, res) => {
  try {
    const data = All_Models.User_Model.findOne();

    if (!data) {
      res.status(404).json({ msg: "No data found" });
    }

    return res.status(200).json({
      msg: "Fetched User successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

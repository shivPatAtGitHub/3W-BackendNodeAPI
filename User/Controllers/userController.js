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

    if (!req.files || req.files.length === 0 || req.files === null) {
      return res.status(422).json({ msg: "No Images were uploaded" });
    }

    let { image } = req.files;

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

      let imagePath = `uploads/${user.id}/${imageName}`;
      let imageDir = `Assets/uploads/${user.id}/${imageName}`;

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
    const data = await All_Models.User_Model.findOne({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: All_Models.Image_Model,
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    });

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

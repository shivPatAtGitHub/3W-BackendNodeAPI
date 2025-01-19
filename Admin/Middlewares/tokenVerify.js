import All_Models from "../../Utils/allModels.js";
import jwt from "jsonwebtoken";

export const tokenVerify = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(400).json({ msg: "Invalid Token" });
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    const adminData = await All_Models.Admin_Model.findOne({
      where: { id: decodedData.id },
    });

    if (!adminData) {
      return res.status(404).json({ msg: "Invalid Admin Credentials" });
    } else {
      req.admin = decodedData;
      next();
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

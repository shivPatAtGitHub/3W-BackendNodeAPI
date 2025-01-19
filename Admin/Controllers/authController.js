import All_Models from "../../Utils/allModels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const AuthController = {
  createAdmin: async (req, res) => {
    try {
      const { userName, password } = req.body;

      let hassPass = await bcrypt.hash(password, 12);

      const admin = await All_Models.Admin_Model.create({
        userName,
        password: hassPass,
      });

      if (!admin) {
        return res.status(404).json({ msg: "No admin found" });
      }

      return res.status(200).json({
        msg: "New Admin Created successfully",
      });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  },

  adminLogin: async (req, res) => {
    try {
      const { userName, password } = req.body;

      const admin = await All_Models.Admin_Model.findOne({
        where: { userName },
      });

      if (!admin) {
        return res.status(404).json({ msg: "No admin found" });
      }

      let passMatch = await bcrypt.compare(password, admin.password);

      if (!passMatch) {
        return res.status(404).json({ msg: "Incorrect Credentials" });
      }

      let payload = { id: admin.id, userName: admin.userName };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });

      res.cookie("accessToken", token, {
        httpOnly: true,
        sameSite: process.env.SAMESITE,
        secure: process.env.SECURE,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({
        msg: "Admin Login successfully",
      });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  },

  getAllData: async (req, res) => {
    try {
      const data = await All_Models.User_Model.findAll({
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
        msg: "Fetched All Data successfully",
        data,
      });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  },

  adminLogout: async (req, res) => {
    try {
      res.clearCookie("accessToken");

      return res.status(200).json({
        msg: "Admin Logout successfully",
      });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  },
};

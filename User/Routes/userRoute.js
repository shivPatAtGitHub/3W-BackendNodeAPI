import express from "express";
import { body } from "express-validator";
import { UserController } from "../Controllers/userController.js";

const router = express.Router();

router.get("/getUser", UserController.getUser);

router.post(
  "/addUser",
  body("name").notEmpty().withMessage("name is required"),
  body("handle").notEmpty().withMessage("name is required"),
  UserController.createUser
);

export default router;

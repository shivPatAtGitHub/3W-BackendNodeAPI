import express from "express";
import { body } from "express-validator";
import { UserController } from "../Controllers/userController.js";

const router = express.Router();

/**
 * @swagger
 * /user/getUser:
 *   get:
 *     tags:
 *       - User
 *     summary: Get user details
 *     operationId: getUser
 *     responses:
 *       '200':
 *         description: Successfully fetched user details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 handle:
 *                   type: string
 *       '404':
 *         description: User not found
 */

/**
 * @swagger
 * /user/addUser:
 *   post:
 *     tags:
 *       - User
 *     summary: Add a new user
 *     operationId: addUser
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the user
 *               handle:
 *                 type: string
 *                 description: Handle for the user
 *               image:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Files to upload (multiple files allowed)
 *             required:
 *               - name
 *               - handle
 *     responses:
 *       '200':
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                 name:
 *                   type: string
 *                 handle:
 *                   type: string
 *       '400':
 *         description: Bad Request - Missing required fields or invalid data
 *       '500':
 *         description: Server error
 */
router.get("/getUser", UserController.getUser);

router.post(
  "/addUser",
  body("name").notEmpty().withMessage("name is required"),
  body("handle").notEmpty().withMessage("name is required"),
  UserController.createUser
);

export default router;

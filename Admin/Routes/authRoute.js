import express from "express";
import { body } from "express-validator";
import { AuthController } from "../Controllers/authController.js";
import { tokenVerify } from "../Middlewares/tokenVerify.js";
const router = express.Router();

/**
 * @swagger
 * /admin/createAdmin:
 *   post:
 *     summary: Create a new admin user
 *     tags:
 *       - Admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *                 description: Admin's name
 *               password:
 *                 type: string
 *                 description: Admin's password
 *     responses:
 *       200:
 *         description: Admin created successfully
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Internal server error
 *     security:
 *       - Bearer: []
 */

/**
 * @swagger
 * /admin/adminLogin:
 *   post:
 *     summary: Admin user login
 *     tags:
 *       - Admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *                 description: Admin's username
 *               password:
 *                 type: string
 *                 description: Admin's password
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for authentication
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized, invalid credentials
 *       500:
 *         description: Internal server error
 *     security:
 *       - Bearer: []
 */

/**
 * @swagger
 * /admin/getData:
 *   get:
 *     summary: Retrieve all data for the admin user
 *     tags:
 *       - Admin
 *     responses:
 *       200:
 *         description: Successfully retrieved data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   description: List of data associated with the admin
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: The ID of the data item
 *                       name:
 *                         type: string
 *                         description: The name of the data item
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: The creation date of the data item
 *       401:
 *         description: Unauthorized, no valid token provided
 *       500:
 *         description: Internal server error
 *     security:
 *       - Bearer: []
 */

/**
 * @swagger
 * /admin/adminLogout:
 *   post:
 *     summary: Admin user logout
 *     tags:
 *       - Admin
 *     responses:
 *       200:
 *         description: Logout successful
 *       401:
 *         description: Unauthorized, no valid token provided
 *       500:
 *         description: Internal server error
 *     security:
 *       - Bearer: []
 */

router.post(
  "/createAdmin",
  body("userName").notEmpty().withMessage("userName is required"),
  body("password").notEmpty().withMessage("password is required"),
  tokenVerify,
  AuthController.createAdmin
);

router.post(
  "/adminLogin",
  body("userName").notEmpty().withMessage("userName is required"),
  body("password").notEmpty().withMessage("password is required"),
  AuthController.adminLogin
);

router.get("/getData", tokenVerify, AuthController.getAllData);

router.post("/adminLogout", tokenVerify, AuthController.adminLogout);

export default router;

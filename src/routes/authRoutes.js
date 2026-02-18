const express = require("express");
const { register, login, googleAuthRedirect, googleAuthCallback } = require("../controllers/authController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication and OAuth routes
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 *   schemas:
 *     Vehicle:
 *       type: object
 *       properties:
 *         brand:
 *           type: string
 *           example: Tesla
 *         model:
 *           type: string
 *           example: Model 3
 *         batteryCapacity:
 *           type: number
 *           example: 75
 *         vehicleNumber:
 *           type: string
 *           example: ABC-123
 *
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         phone:
 *           type: string
 *         role:
 *           type: string
 *         vehicles:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Vehicle'
 *         profileImage:
 *           type: string
 *         profileColor:
 *           type: string
 *         status:
 *           type: string
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: username@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *               phone:
 *                 type: string
 *                 example: "03001234567"
 *               role:
 *                 type: string
 *                 example: user
 *               vehicles:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Vehicle'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Email already exists
 */
router.post("/register", register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user and get JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: username@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Invalid credentials
 */
router.post("/login", login);

/**
 * @swagger
 * /api/auth/google:
 *   get:
 *     summary: Redirect to Google OAuth login page
 *     tags: [Auth]
 *     responses:
 *       302:
 *         description: Redirects to Google login
 */
router.get("/google", googleAuthRedirect);

/**
 * @swagger
 * /api/auth/google/callback:
 *   get:
 *     summary: Google OAuth callback endpoint
 *     tags: [Auth]
 *     parameters:
 *       - in: query
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: Google OAuth authorization code
 *     responses:
 *       302:
 *         description: Redirects to frontend with JWT token
 *       400:
 *         description: No code provided
 *       500:
 *         description: Google OAuth failed
 */
router.get("/google/callback", googleAuthCallback);

module.exports = router;

const express = require("express");
const router = express.Router();
const { getAllUsers, getProfile, updateProfile } = require("../controllers/userController");
const auth = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");
const upload = require("../utils/multer");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Vehicle:
 *       type: object
 *       properties:
 *         brand:
 *           type: string
 *         model:
 *           type: string
 *         batteryCapacity:
 *           type: number
 *         vehicleNumber:
 *           type: string
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
 *         status:
 *           type: string
 *         vehicles:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Vehicle'
 *         profileImage:
 *           type: string
 *         profileColor:
 *           type: string
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get list of all users (admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, approved, rejected, suspended]
 *         description: Filter by user status
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *           enum: [admin, owner, user]
 *         description: Filter by user role
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Search by user name
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: List of users with pagination
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized (JWT required)
 */
router.get("/", auth, authorize("admin"), getAllUsers);

/**
 * @swagger
 * /api/users/profile/me:
 *   get:
 *     summary: Get profile of logged-in user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logged-in user profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 */
router.get("/profile/me", auth, getProfile);

/**
 * @swagger
 * /api/users/profile/me:
 *   put:
 *     summary: Update profile of logged-in user (name, phone, vehicles, profile image)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               vehicles:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Vehicle'
 *               profileImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 */
router.put("/profile/me", auth, upload.single("profileImage"), updateProfile);

module.exports = router;

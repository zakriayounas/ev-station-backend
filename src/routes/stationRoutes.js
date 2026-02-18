const express = require("express");
const auth = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");
const { createStation, getStations } = require("../controllers/stationController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Stations
 *   description: EV charging station management
 */

/**
 * @swagger
 * /api/stations:
 *   post:
 *     summary: Create a new station (owner only)
 *     tags: [Stations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - location
 *             properties:
 *               name:
 *                 type: string
 *                 example: Elegant Station
 *               location:
 *                 type: object
 *                 required:
 *                   - city
 *                   - address
 *                 properties:
 *                   address:
 *                     type: string
 *                     example: "123 Main Street"
 *                   city:
 *                     type: string
 *                     example: Karachi
 *                   lat:
 *                     type: number
 *                     example: 24.8607
 *                   lng:
 *                     type: number
 *                     example: 67.0011
 *               chargers:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     type:
 *                       type: string
 *                       example: "Type-2"
 *                     pricePerUnit:
 *                       type: number
 *                       example: 20
 *                     availableSlots:
 *                       type: number
 *                       example: 5
 *     responses:
 *       201:
 *         description: Station created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Station'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied (only owner)
 */

/**
 * @swagger
 * /api/stations:
 *   get:
 *     summary: Get list of stations with filters and pagination
 *     tags: [Stations]
 *     parameters:
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         description: Filter by city
 *       - in: query
 *         name: owner
 *         schema:
 *           type: string
 *         description: Filter by owner ID
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter by station name
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
 *         description: List of stations with pagination
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
 *                 stations:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Station'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Station:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         location:
 *           type: object
 *           properties:
 *             address:
 *               type: string
 *             city:
 *               type: string
 *             lat:
 *               type: number
 *             lng:
 *               type: number
 *         owner:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *             name:
 *               type: string
 *             email:
 *               type: string
 *         chargers:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *               pricePerUnit:
 *                 type: number
 *               availableSlots:
 *                 type: number
 *         status:
 *           type: string
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 */

router.post("/", auth, authorize("owner"), createStation);
router.get("/", getStations);

module.exports = router;

const express = require("express");
const auth = require("../middlewares/authMiddleware");
const { createBooking, getMyBookings } = require("../controllers/bookingController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: Booking management endpoints
 */

/**
 * @swagger
 * /api/bookings:
 *   post:
 *     summary: Create a new booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - station
 *               - date
 *               - slotTime
 *               - amount
 *             properties:
 *               station:
 *                 type: string
 *                 description: Station ID to book
 *                 example: 63f1f3c2e1234567890abcde
 *               date:
 *                 type: string
 *                 format: date
 *                 example: 2026-02-20
 *               slotTime:
 *                 type: string
 *                 example: "10:00-11:00"
 *               amount:
 *                 type: number
 *                 example: 150
 *     responses:
 *       201:
 *         description: Booking created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 user:
 *                   type: string
 *                 station:
 *                   type: string
 *                 date:
 *                   type: string
 *                 slotTime:
 *                   type: string
 *                 amount:
 *                   type: number
 *                 status:
 *                   type: string
 *                   example: pending
 *       401:
 *         description: Unauthorized (JWT required)
 */

/**
 * @swagger
 * /api/bookings/my:
 *   get:
 *     summary: Get all bookings for logged-in user with pagination and optional filters
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of results per page
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           example: pending
 *         description: Filter by booking status
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter by booking date (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: List of user bookings with pagination
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
 *                 bookings:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       station:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *                           city:
 *                             type: string
 *                           address:
 *                             type: string
 *                       date:
 *                         type: string
 *                       slotTime:
 *                         type: string
 *                       amount:
 *                         type: number
 *                       status:
 *                         type: string
 *                         example: pending
 *       401:
 *         description: Unauthorized (JWT required)
 */

router.post("/", auth, createBooking);
router.get("/my", auth, getMyBookings);

module.exports = router;

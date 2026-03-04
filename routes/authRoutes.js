const express = require('express')
const authController = require('../Controllers/authCotroller')
const router = express.Router();
const middleware = require("../middlewares/auth-middleware");

// #region Authentication Routes

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication and management endpoints
 */

/**
 * @swagger
 * /api/auth/addUser:
 *   post:
 *     summary: Add multiple users in bulk (staff or students)
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - users
 *             properties:
 *               users:
 *                 type: array
 *                 description: Array of users to add
 *                 items:
 *                   type: object
 *                   required:
 *                     - username
 *                     - email
 *                     - password
 *                     - role
 *                   properties:
 *                     username:
 *                       type: string
 *                       description: Username for the new user
 *                     email:
 *                       type: string
 *                       format: email
 *                       description: User email
 *                     password:
 *                       type: string
 *                       description: Password for the new user
 *                     role:
 *                       type: string
 *                       enum: [admin, Doctor, TA, super_admin, student]
 *                       description: User role
 *     responses:
 *       200:
 *         description: Users processed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 added:
 *                   type: array
 *                   items:
 *                     type: object
 *                 failed:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: Bad request - Users must be a non-empty array
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       403:
 *         description: Forbidden - Insufficient permissions
 *       500:
 *         description: Server error
 */
router.post('/addUser', middleware.authMiddleWare, authController.add_users);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user and get authentication token
 *     tags: [Authentication]
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
 *                 format: email
 *                 description: User email
 *               password:
 *                 type: string
 *                 description: User password
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User email
 *               password:
 *                 type: string
 *                 description: User password
 *     responses:
 *       201:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                   example: "true"
 *                 message:
 *                   type: string
 *                   example: "loggged in successfuly"
 *                 accessToken:
 *                   type: string
 *                   description: JWT token for authentication
 *       401:
 *         description: Invalid credentials
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.post('/login', authController.login);

/**
 * @swagger
 * /api/auth/getAllStaff:
 *   get:
 *     summary: Get all staff members with pagination and filtering
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by staff name or email
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *           enum: [admin, Doctor, TA, super_admin]
 *         description: Filter by staff role
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Items per page
 *     responses:
 *       200:
 *         description: List of staff members
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 staff:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       staff_id:
 *                         type: integer
 *                       role:
 *                         type: string
 *                       staff_name:
 *                         type: string
 *                       staff_email:
 *                         type: string
 *                       phone:
 *                         type: string
 *                       contact_info:
 *                         type: string
 *                       office_hours:
 *                         type: string
 *                 totalCount:
 *                   type: integer
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       500:
 *         description: Server error
 */
router.get("/getAllStaff", middleware.authMiddleWare, authController.getAllStaff);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout user and clear authentication cookie
 *     tags: [Authentication]
 *     responses:
 *       302:
 *         description: Redirect to login page
 *         headers:
 *           Location:
 *             schema:
 *               type: string
 *               example: /api/auth/login
 */
router.post('/logout', (req, res) => {
    res.cookie('authorization', '', { expires: new Date(0) });
    return res.redirect('/api/auth/login');
});

// #endregion

// #region OTP Verification Routes

/**
 * @swagger
 * tags:
 *   name: OTP
 *   description: OTP verification endpoints
 */

/**
 * @swagger
 * /api/auth/sendOTP:
 *   post:
 *     summary: Send OTP verification code to user's email
 *     tags: [OTP]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *     responses:
 *       201:
 *         description: OTP sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: OTP sent
 *       401:
 *         description: Email is not registered or user already verified
 *       500:
 *         description: Server error
 */
router.post('/sendOTP', middleware.authMiddleWare, authController.sendCode);

/**
 * @swagger
 * /api/auth/verifyOTP:
 *   post:
 *     summary: Verify OTP code and activate account
 *     tags: [OTP]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - OTP
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *               OTP:
 *                 type: string
 *                 description: 6-digit OTP code to verify
 *     responses:
 *       201:
 *         description: Email verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: email verified successfully
 *       401:
 *         description: Invalid OTP, expired OTP, or email not found
 *       500:
 *         description: Server error
 */
router.post('/verifyOTP', middleware.authMiddleWare, authController.verifyCode);

/**
 * @swagger
 * /api/auth/verifyOTP:
 *   get:
 *     summary: Get OTP verification page
 *     tags: [OTP]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns OTP verification page
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *               example: HTML OTP verification form
 */
router.get('/verifyOTP', middleware.authMiddleWare, authController.verifyCodePage);

// #endregion

module.exports = router;
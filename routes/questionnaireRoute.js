const express = require('express')
const QController = require('../Controllers/Questionnaire')
const middleware = require('../middlewares/auth-middleware')

const route = express.Router();

// #region Questionnaire Routes

/**
 * @swagger
 * tags:
 *   name: Questionnaire
 *   description: Course questionnaire management endpoints
 */

/**
 * @swagger
 * /questionnaire/getCourseQuestionnaire/{course_id}:
 *   get:
 *     summary: Get all questions for a course questionnaire
 *     tags: [Questionnaire]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: course_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Course ID
 *     responses:
 *       200:
 *         description: Questionnaire retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       question_text:
 *                         type: string
 *                         description: The question text
 *                       questionnaire_id:
 *                         type: integer
 *                         description: ID of the questionnaire
 *       401:
 *         description: Unauthorized or course not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 */
route.get('/getCourseQuestionnaire/:course_id', middleware.authMiddleWare, QController.getCourseQuestionnaire);

/**
 * @swagger
 * /questionnaire/addQuestion/{course_id}:
 *   post:
 *     summary: Add a new question to a course questionnaire
 *     tags: [Questionnaire]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: course_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Course ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - question_text
 *             properties:
 *               question_text:
 *                 type: string
 *                 maxLength: 255
 *                 description: The question text to add
 *               is_required:
 *                 type: boolean
 *                 default: true
 *                 description: Whether the question is required (optional, defaults to true)
 *     responses:
 *       201:
 *         description: Question added successfully
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
 *                   example: Question added successfully
 *       404:
 *         description: Course not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Course not found
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Error while adding the question
 */
route.post('/addQuestion/:course_id', middleware.authMiddleWare, QController.addQuestion);

// #endregion

module.exports = route;
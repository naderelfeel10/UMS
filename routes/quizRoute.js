const express = require('express')
const QuizzesController = require('../Controllers/QuizzesController')
const middleware = require('../middlewares/auth-middleware')
const route = express.Router()

// #region Quiz Management Routes

/**
 * @swagger
 * tags:
 *   name: Quizzes
 *   description: Quiz management endpoints
 */

/**
 * @swagger
 * /course_management/quizzes/addQuiz:
 *   post:
 *     summary: Add a new quiz to a course
 *     tags: [Quizzes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - course_id
 *               - quiz_title
 *               - google_form_url
 *             properties:
 *               course_id:
 *                 type: integer
 *                 description: ID of the course
 *               quiz_title:
 *                 type: string
 *                 description: Title of the quiz
 *               google_form_url:
 *                 type: string
 *                 format: uri
 *                 description: Google Form URL for the quiz
 *     responses:
 *       200:
 *         description: Quiz added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: quiz is added successfully
 *       401:
 *         description: Unauthorized - Insufficient permissions
 *       500:
 *         description: Server error
 */
route.post('/addQuiz', middleware.authMiddleWare, QuizzesController.addQuiz)

/**
 * @swagger
 * /course_management/quizzes/addQuiz:
 *   get:
 *     summary: Get add quiz page
 *     tags: [Quizzes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns add quiz form page
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 */
route.get('/addQuiz', middleware.authMiddleWare, QuizzesController.addQuizGet)

/**
 * @swagger
 * /course_management/quizzes/getCourseQuiz/{course_id}:
 *   get:
 *     summary: Get all quizzes for a specific course
 *     tags: [Quizzes]
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
 *         description: List of course quizzes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   quiz_id:
 *                     type: integer
 *                   quiz_title:
 *                     type: string
 *                   google_form_url:
 *                     type: string
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
route.get('/getCourseQuiz/:course_id', middleware.authMiddleWare, QuizzesController.getCourseQuiz)

/**
 * @swagger
 * /course_management/quizzes/getQuizGrades/{course_id}:
 *   get:
 *     summary: Get all quiz grades for a specific course
 *     tags: [Quizzes]
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
 *         description: List of quiz grades with student information
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   quiz_id:
 *                     type: integer
 *                   quiz_title:
 *                     type: string
 *                   google_form_url:
 *                     type: string
 *                   quiz_grade:
 *                     type: number
 *                     format: decimal
 *                   stu_id:
 *                     type: integer
 *                   stu_email:
 *                     type: string
 *                   stu_name:
 *                     type: string
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
route.get('/getQuizGrades/:course_id', middleware.authMiddleWare, QuizzesController.getQuizGrade)

/**
 * @swagger
 * /course_management/quizzes/gradeQuiz:
 *   post:
 *     summary: Grade a student's quiz
 *     tags: [Quizzes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quiz_id
 *               - stu_id
 *               - quiz_grade
 *             properties:
 *               quiz_id:
 *                 type: integer
 *                 description: ID of the quiz
 *               stu_id:
 *                 type: integer
 *                 description: ID of the student
 *               quiz_grade:
 *                 oneOf:
 *                   - type: string
 *                     enum: [A, B, C, D, F]
 *                   - type: number
 *                     minimum: 0
 *                     maximum: 10
 *                 description: Grade (A, B, C, D, F or numeric 0-10)
 *     responses:
 *       201:
 *         description: Quiz graded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     quiz_id:
 *                       type: integer
 *                     stu_id:
 *                       type: integer
 *                     letter_grade:
 *                       type: string
 *                     numeric_grade:
 *                       type: number
 *       400:
 *         description: Bad request - Invalid grade format or missing fields
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
route.post('/gradeQuiz', middleware.authMiddleWare, QuizzesController.gradeQuiz)

/**
 * @swagger
 * /course_management/quizzes/gradeQuiz:
 *   get:
 *     summary: Get grade quiz page
 *     tags: [Quizzes]
 *     responses:
 *       200:
 *         description: Returns grade quiz form page
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 */
route.get('/gradeQuiz', QuizzesController.gradeQuizGet)

/**
 * @swagger
 * /course_management/quizzes/publishQuiz/{quiz_id}:
 *   post:
 *     summary: Publish a quiz with schedule settings using EAV pattern
 *     tags: [Quizzes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: quiz_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Quiz ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               open_date:
 *                 type: string
 *                 format: date-time
 *                 description: Date and time when quiz opens
 *                 example: "2024-12-01T09:00:00Z"
 *               close_date:
 *                 type: string
 *                 format: date-time
 *                 description: Date and time when quiz closes
 *                 example: "2024-12-07T23:59:00Z"
 *               is_visible:
 *                 type: boolean
 *                 description: Whether quiz is visible to students
 *                 example: true
 *     responses:
 *       200:
 *         description: Quiz published successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 schedule:
 *                   type: object
 *                   properties:
 *                     open_date:
 *                       type: string
 *                       format: date-time
 *                     close_date:
 *                       type: string
 *                       format: date-time
 *                     is_visible:
 *                       type: boolean
 *       404:
 *         description: Quiz not found
 *       500:
 *         description: Server error
 */
route.post('/publishQuiz/:quiz_id', middleware.authMiddleWare, QuizzesController.publishQuizWithSchedule)

/**
 * @swagger
 * /course_management/quizzes/myCalender:
 *   get:
 *     summary: Get calendar of quizzes for the logged-in student
 *     tags: [Quizzes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of quizzes with schedule information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       course_name:
 *                         type: string
 *                       quiz_id:
 *                         type: integer
 *                       quiz_title:
 *                         type: string
 *                       google_form_url:
 *                         type: string
 *                       open_date:
 *                         type: string
 *                         format: date-time
 *                         nullable: true
 *                       close_date:
 *                         type: string
 *                         format: date-time
 *                         nullable: true
 *                       is_visible:
 *                         type: boolean
 *       404:
 *         description: Student not found
 *       500:
 *         description: Server error
 */
route.get('/myCalender', middleware.authMiddleWare, QuizzesController.getCalenderQuizes)

// #endregion

module.exports = route
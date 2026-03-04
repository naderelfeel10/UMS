const express = require('express')
const StaffConroller = require('../Controllers/StaffConroller')
const middleware = require('../middlewares/auth-middleware')
const route = express.Router()

// #region Staff Management Routes

/**
 * @swagger
 * tags:
 *   name: Staff Management
 *   description: Staff information management endpoints
 */

/**
 * @swagger
 * /Staff_management/getStaffInfo:
 *   get:
 *     summary: Get all staff members with their assigned courses
 *     tags: [Staff Management]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Staff information retrieved successfully
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
 *                   example: Staff Info
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       staff_id:
 *                         type: integer
 *                       staff_name:
 *                         type: string
 *                       role:
 *                         type: string
 *                         enum: [admin, Doctor, TA, super_admin]
 *                       phone:
 *                         type: string
 *                       contact_info:
 *                         type: string
 *                       profile_link:
 *                         type: string
 *                       office_hours:
 *                         type: string
 *                       courses:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             course_id:
 *                               type: integer
 *                             course_name:
 *                               type: string
 *                             credit_hours:
 *                               type: integer
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
route.get('/getStaffInfo', middleware.authMiddleWare, StaffConroller.AllStaffInfo)

/**
 * @swagger
 * /Staff_management/getStaff/{staff_id}:
 *   get:
 *     summary: Get detailed information for a specific staff member
 *     tags: [Staff Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: staff_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Staff ID
 *     responses:
 *       200:
 *         description: Staff information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 result:
 *                   type: object
 *                   properties:
 *                     staff_id:
 *                       type: integer
 *                     staff_name:
 *                       type: string
 *                     role:
 *                       type: string
 *                     phone:
 *                       type: string
 *                     contact_info:
 *                       type: string
 *                     profile_link:
 *                       type: string
 *                     office_hours:
 *                       type: string
 *                     staff_email:
 *                       type: string
 *                     courses:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           course_id:
 *                             type: integer
 *                           course_name:
 *                             type: string
 *                           credit_hours:
 *                             type: integer
 *                     attributes:
 *                       type: object
 *                       description: Dynamic EAV attributes for the staff member
 *                       example:
 *                         rating: 4.5
 *                         numberOfResearchPapers: 10
 *                         specialization: "Computer Science"
 *                         remoteWork: true
 *       400:
 *         description: Invalid staff ID format
 *       404:
 *         description: Staff not found
 *       500:
 *         description: Server error
 */
route.get('/getStaff/:staff_id', middleware.authMiddleWare, StaffConroller.getSingleStaff)

/**
 * @swagger
 * /Staff_management/editStaff/{staff_id}:
 *   put:
 *     summary: Edit staff member information including EAV attributes
 *     tags: [Staff Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: staff_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Staff ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - staff_name
 *               - role
 *             properties:
 *               staff_name:
 *                 type: string
 *                 description: Staff full name
 *               role:
 *                 type: string
 *                 enum: [TA, Doctor, admin, super_admin]
 *                 description: Staff role
 *               phone:
 *                 type: string
 *                 description: Phone number
 *               contact_info:
 *                 type: string
 *                 description: Additional contact information
 *               profile_link:
 *                 type: string
 *                 description: Profile URL or link
 *               office_hours:
 *                 type: string
 *                 description: Office hours schedule
 *               rating:
 *                 type: integer
 *                 description: Staff rating (EAV attribute)
 *               numberOfResearchPapers:
 *                 type: integer
 *                 description: Number of research papers (EAV attribute)
 *               specialization:
 *                 type: string
 *                 description: Area of specialization (EAV attribute)
 *               remoteWork:
 *                 type: boolean
 *                 description: Whether staff works remotely (EAV attribute)
 *     responses:
 *       200:
 *         description: Staff information updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request - Invalid data or missing required fields
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: Staff member not found
 *       500:
 *         description: Server error
 */
route.put('/editStaff/:staff_id', middleware.authMiddleWare, StaffConroller.editStaff)

/**
 * @swagger
 * /Staff_management/deleteStaff/{staff_id}:
 *   delete:
 *     summary: Delete a staff member
 *     tags: [Staff Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: staff_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Staff ID
 *     responses:
 *       200:
 *         description: Staff deleted successfully
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
 *                   example: staff deleted successfully
 *       403:
 *         description: Forbidden - Admin or super_admin access required
 *       500:
 *         description: Server error
 */
route.delete('/deleteStaff/:staff_id', middleware.authMiddleWare, StaffConroller.RemoveStaff)

// #endregion

// #region Student EAV Management Routes

/**
 * @swagger
 * tags:
 *   name: Student EAV
 *   description: Student EAV (Entity-Attribute-Value) attributes management
 */

/**
 * @swagger
 * /Staff_management/addStudentInfo/{stu_id}:
 *   post:
 *     summary: Add or update EAV attributes for a student
 *     tags: [Student EAV]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: stu_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Student ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: Dynamic EAV attributes for the student
 *             example:
 *               gpa: 3.8
 *               major: "Computer Science"
 *               graduation_year: 2025
 *               is_international: false
 *               scholarships: "Merit-based"
 *             additionalProperties:
 *               oneOf:
 *                 - type: string
 *                 - type: integer
 *                 - type: number
 *                 - type: boolean
 *     responses:
 *       200:
 *         description: Student attributes updated successfully
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
 *                   example: Student attributes updated successfully (EAV)
 *       403:
 *         description: Forbidden - Admin or super_admin access required
 *       404:
 *         description: Student not found
 *       500:
 *         description: Server error
 */
route.post('/addStudentInfo/:stu_id', middleware.authMiddleWare, StaffConroller.addStuInfo);

// #endregion

module.exports = route
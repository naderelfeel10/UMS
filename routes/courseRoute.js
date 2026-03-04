const express = require('express')
const CourseCountroller = require('../Controllers/CoursesController')
const middleware = require('../middlewares/auth-middleware')
const route = express.Router()
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// #region Course Management Routes

/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: Course management endpoints
 */

/**
 * @swagger
 * /course_management/addCourse:
 *   post:
 *     summary: Add a new course
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - course_name
 *               - credit_hours
 *             properties:
 *               course_name:
 *                 type: string
 *                 description: Name of the course
 *               credit_hours:
 *                 type: integer
 *                 enum: [2, 3, 4]
 *                 description: Course credit hours (must be 2, 3, or 4)
 *     responses:
 *       201:
 *         description: Course added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 course_id:
 *                   type: integer
 *       400:
 *         description: Bad request - Invalid credit hours
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       403:
 *         description: Forbidden - Admin access required
 *       409:
 *         description: Course already exists
 *       500:
 *         description: Server error
 */
route.post("/addCourse", middleware.authMiddleWare, CourseCountroller.addCourse);



/**
 * @swagger
 * /course_management/removeCourse:
 *   post:
 *     summary: Remove a course
 *     tags: [Courses]
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
 *             properties:
 *               course_id:
 *                 type: integer
 *                 description: ID of the course to remove
 *     responses:
 *       201:
 *         description: Course removed successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin or Doctor access required
 *       404:
 *         description: Course not found
 *       500:
 *         description: Server error
 */
route.post("/removeCourse", middleware.authMiddleWare, CourseCountroller.removeCourse);



/**
 * @swagger
 * /course_management/editCourse:
 *   put:
 *     summary: Edit course details
 *     tags: [Courses]
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
 *             properties:
 *               course_id:
 *                 type: integer
 *                 description: ID of the course to edit
 *               new_course_name:
 *                 type: string
 *                 description: New course name
 *               new_credit_hours:
 *                 type: integer
 *                 enum: [2, 3, 4]
 *                 description: New credit hours
 *               new_max_registered_students:
 *                 type: integer
 *                 description: Maximum number of students allowed
 *     responses:
 *       200:
 *         description: Course updated successfully
 *       400:
 *         description: Bad request - Invalid data
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Course not found
 *       500:
 *         description: Server error
 */
route.put("/editCourse", CourseCountroller.editCourse);



/**
 * @swagger
 * /course_management/getCourse:
 *   get:
 *     summary: Get course details by ID
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: course_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Course ID
 *     responses:
 *       200:
 *         description: Course details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 course:
 *                   type: object
 *                   properties:
 *                     course_id:
 *                       type: integer
 *                     course_name:
 *                       type: string
 *                     credit_hours:
 *                       type: integer
 *                     registered_students:
 *                       type: integer
 *                     max_registered_students:
 *                       type: integer
 *                     assigned_staff:
 *                       type: array
 *                       items:
 *                         type: object
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Course not found
 *       500:
 *         description: Server error
 */
route.get("/getCourse", middleware.authMiddleWare, CourseCountroller.getCourse);

/**
 * @swagger
 * /course_management/registerCourse:
 *   post:
 *     summary: Register a student for a course
 *     tags: [Courses]
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
 *               - stu_id
 *             properties:
 *               course_id:
 *                 type: integer
 *                 description: Course ID
 *               stu_id:
 *                 type: integer
 *                 description: Student ID
 *     responses:
 *       200:
 *         description: Course registered successfully
 *       401:
 *         description: Unauthorized or student/course not found
 *       500:
 *         description: Server error
 */
route.post("/registerCourse", middleware.authMiddleWare, CourseCountroller.registerCourse);

/**
 * @swagger
 * /course_management/assignCourse:
 *   post:
 *     summary: Assign a course to a staff member
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - staff_id
 *               - course_id
 *             properties:
 *               staff_id:
 *                 type: integer
 *                 description: Staff ID
 *               course_id:
 *                 type: integer
 *                 description: Course ID
 *     responses:
 *       201:
 *         description: Course assigned successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: Staff or course not found
 *       409:
 *         description: Course already assigned
 *       500:
 *         description: Server error
 */
route.post("/assignCourse", middleware.authMiddleWare, CourseCountroller.assignCourse);

/**
 * @swagger
 * /course_management/unassignCourse:
 *   post:
 *     summary: Unassign a course from a staff member
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - staff_id
 *               - course_id
 *             properties:
 *               staff_id:
 *                 type: integer
 *                 description: Staff ID
 *               course_id:
 *                 type: integer
 *                 description: Course ID
 *     responses:
 *       200:
 *         description: Course unassigned successfully
 *       404:
 *         description: Course assignment not found
 *       500:
 *         description: Server error
 */
route.post("/unassignCourse", CourseCountroller.unassignCourse);

/**
 * @swagger
 * /course_management/assignedCourse:
 *   get:
 *     summary: Get courses assigned to staff members
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: staff_id
 *         required: false
 *         schema:
 *           type: integer
 *         description: Staff ID (optional - returns all assignments if not provided)
 *     responses:
 *       200:
 *         description: Assigned courses retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 courses:
 *                   type: array
 *                   items:
 *                     type: object
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
route.get("/assignedCourse", middleware.authMiddleWare, CourseCountroller.getAssignedCourses);

/**
 * @swagger
 * /course_management/withdrawCourse:
 *   post:
 *     summary: Withdraw a student from a course
 *     tags: [Courses]
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
 *             properties:
 *               course_id:
 *                 type: integer
 *                 description: Course ID to withdraw from
 *     responses:
 *       200:
 *         description: Course withdrawn successfully
 *       401:
 *         description: Unauthorized or student/course not found
 *       500:
 *         description: Server error
 */
route.post("/withdrawCourse", middleware.authMiddleWare, CourseCountroller.withdrawCourse);

/**
 * @swagger
 * /course_management/getAllRegistered:
 *   get:
 *     summary: Get all registered courses with filtering options
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, Accepted, Rejected]
 *         description: Filter by registration status
 *       - in: query
 *         name: stu_id
 *         schema:
 *           type: integer
 *         description: Filter by student ID
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by course name or student email
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
 *         description: Registered courses retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
route.get("/getAllRegistered", middleware.authMiddleWare, CourseCountroller.getAllRegisteredCourses);

/**
 * @swagger
 * /course_management/getAllOffered:
 *   get:
 *     summary: Get all offered courses for a student
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: stu_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Student ID
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by course name
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
 *         description: Items per page
 *     responses:
 *       200:
 *         description: Offered courses retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
route.get("/getAllOffered", middleware.authMiddleWare, CourseCountroller.getAllOfferedCourses);

/**
 * @swagger
 * /course_management/getAllRegisteredStudents:
 *   get:
 *     summary: Get all registered students for courses
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: course_id
 *         schema:
 *           type: integer
 *         description: Filter by course ID
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, Accepted, Rejected]
 *         description: Filter by registration status
 *     responses:
 *       200:
 *         description: Registered students retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
route.get("/getAllRegisteredStudents", middleware.authMiddleWare, CourseCountroller.getAllRegisteredStudents);



/**
 * @swagger
 * /course_management/MyCourses:
 *   get:
 *     summary: Get courses for a specific student
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: stu_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Student ID
 *     responses:
 *       200:
 *         description: Student courses retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
route.get("/MyCourses", middleware.authMiddleWare, CourseCountroller.getMyCourses);

/**
 * @swagger
 * /course_management/updateCourseRequest:
 *   put:
 *     summary: Review and update course registration requests
 *     tags: [Courses]
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
 *               - stu_id
 *               - updated_status
 *             properties:
 *               course_id:
 *                 type: integer
 *                 description: Course ID
 *               stu_id:
 *                 type: integer
 *                 description: Student ID
 *               updated_status:
 *                 type: string
 *                 enum: [Accepted, Rejected]
 *                 description: New status for the registration request
 *     responses:
 *       201:
 *         description: Course request reviewed successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin or Doctor access required
 *       500:
 *         description: Server error
 */
route.put("/updateCourseRequest", middleware.authMiddleWare, CourseCountroller.reviewCoursesRegisterationRequests);

/**
 * @swagger
 * /course_management/updateCourseRequest:
 *   get:
 *     summary: Get all pending course registration requests
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Course requests retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
route.get("/updateCourseRequest", middleware.authMiddleWare, CourseCountroller.getCoursesRegisterationRequests);

/**
 * @swagger
 * /course_management/uploadCourse/{course_id}:
 *   post:
 *     summary: Upload course content (PDF)
 *     tags: [Courses]
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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - pdf
 *             properties:
 *               pdf:
 *                 type: string
 *                 format: binary
 *                 description: PDF file to upload
 *     responses:
 *       200:
 *         description: PDF uploaded successfully
 *       400:
 *         description: No file uploaded
 *       500:
 *         description: Server error
 */
route.post('/uploadCourse/:course_id', upload.single('pdf'), CourseCountroller.uploadCourseContent);

/**
 * @swagger
 * /course_management/downloadCourse/{content_id}:
 *   get:
 *     summary: Download course content by content ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: content_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Content ID
 *     responses:
 *       200:
 *         description: PDF file downloaded
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: File not found
 *       500:
 *         description: Server error
 */
route.get('/downloadCourse/:content_id', CourseCountroller.downloadCourseContent);

/**
 * @swagger
 * /course_management/Courses/{course_id}:
 *   get:
 *     summary: Get course details by ID
 *     tags: [Courses]
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
 *         description: Course details retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Course not found
 *       500:
 *         description: Server error
 */
route.get("/Courses/:course_id", middleware.authMiddleWare, CourseCountroller.getCourse);

/**
 * @swagger
 * /course_management/getAllCourses:
 *   get:
 *     summary: Get all courses with pagination and search
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by course name
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
 *         description: Items per page
 *     responses:
 *       200:
 *         description: Courses retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
route.get("/getAllCourses", middleware.authMiddleWare, CourseCountroller.getAllCourses);

/**
 * @swagger
 * /course_management/gradeCourse:
 *   post:
 *     summary: Grade a student for a course
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - stu_id
 *               - course_id
 *               - grade
 *             properties:
 *               stu_id:
 *                 type: integer
 *                 description: Student ID
 *               course_id:
 *                 type: integer
 *                 description: Course ID
 *               grade:
 *                 type: string
 *                 description: Grade to assign
 *     responses:
 *       200:
 *         description: Grade added successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
route.post("/gradeCourse", middleware.authMiddleWare, CourseCountroller.gradeCourse);



// #endregion

// #region EAV Grade Management Routes

/**
 * @swagger
 * tags:
 *   name: EAV Grades
 *   description: Entity-Attribute-Value pattern for flexible course grading
 */

/**
 * @swagger
 * /course_management/addClassworkGrades/{course_id}/{stu_id}:
 *   post:
 *     summary: Add or update classwork grades for a student using EAV pattern
 *     tags: [EAV Grades]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: course_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Course ID
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
 *             additionalProperties:
 *               oneOf:
 *                 - type: string
 *                 - type: integer
 *                 - type: number
 *                 - type: boolean
 *             example:
 *               homework1: 85
 *               homework2: 90
 *               midterm: 78.5
 *               project: "A"
 *               attendance: true
 *     responses:
 *       200:
 *         description: Student grades updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Doctor or Admin access required
 *       404:
 *         description: Course or student not found
 *       500:
 *         description: Server error
 */
route.post('/addClassworkGrades/:course_id/:stu_id', middleware.authMiddleWare, CourseCountroller.addClassworkGrades);

/**
 * @swagger
 * /course_management/getClassworkGrades/{course_id}/{stu_id}:
 *   get:
 *     summary: Get classwork grades for a specific student in a course
 *     tags: [EAV Grades]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: course_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Course ID
 *       - in: path
 *         name: stu_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Student ID
 *     responses:
 *       200:
 *         description: Student grades retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 student:
 *                   type: object
 *                   properties:
 *                     stu_id:
 *                       type: integer
 *                 course:
 *                   type: object
 *                   properties:
 *                     course_id:
 *                       type: integer
 *                 grades:
 *                   type: object
 *                   additionalProperties:
 *                     oneOf:
 *                       - type: string
 *                       - type: integer
 *                       - type: number
 *                       - type: boolean
 *                   example:
 *                     homework1: 85
 *                     homework2: 90
 *                     midterm: 78.5
 *                     final_grade: "A"
 *       404:
 *         description: Course or student not found
 *       500:
 *         description: Server error
 */
route.get('/getClassworkGrades/:course_id/:stu_id', middleware.authMiddleWare, CourseCountroller.getCourseClassworkGrades);

/**
 * @swagger
 * /course_management/getClassworkGrades/{course_id}:
 *   get:
 *     summary: Get all classwork grades for all students in a course
 *     tags: [EAV Grades]
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
 *         description: All student grades for the course retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 course:
 *                   type: object
 *                   properties:
 *                     course_id:
 *                       type: integer
 *                 students:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       stu_id:
 *                         type: integer
 *                       stu_name:
 *                         type: string
 *                       stu_email:
 *                         type: string
 *                       grades:
 *                         type: object
 *                         additionalProperties:
 *                           oneOf:
 *                             - type: string
 *                             - type: integer
 *                             - type: number
 *                             - type: boolean
 *       404:
 *         description: Course not found
 *       500:
 *         description: Server error
 */
route.get('/getClassworkGrades/:course_id', middleware.authMiddleWare, CourseCountroller.getCourseClassworkGrades);

// #endregion

module.exports = route;
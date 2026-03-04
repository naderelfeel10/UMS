const express = require('express')

const annoucementController = require('../Controllers/AnnouncementController')
const authMiddleWare = require('../middlewares/auth-middleware')

const router = express.Router()

// #region Announcement Routes

/**
 * @swagger
 * tags:
 *   name: Announcements
 *   description: Announcement management endpoints
 */

/**
 * @swagger
 * /announcemnts/createAnnouncement/{course_id}:
 *   post:
 *     summary: Create a new announcement for a course
 *     tags: [Announcements]
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
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *                 description: Announcement title
 *               content:
 *                 type: string
 *                 description: Announcement content
 *     responses:
 *       201:
 *         description: Announcement created successfully
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: Course not found
 *       500:
 *         description: Server error
 */
router.post('/createAnnouncement/:course_id', authMiddleWare.authMiddleWare, annoucementController.CreateAnnouncement)

/**
 * @swagger
 * /announcemnts/editAnnouncement/{ann_id}:
 *   put:
 *     summary: Edit an existing announcement
 *     tags: [Announcements]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: ann_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Announcement ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *                 description: Updated announcement title
 *               content:
 *                 type: string
 *                 description: Updated announcement content
 *     responses:
 *       201:
 *         description: Announcement updated successfully
 *       403:
 *         description: Unauthorized - User is not the author
 *       500:
 *         description: Server error
 */
router.put('/editAnnouncement/:ann_id', authMiddleWare.authMiddleWare, annoucementController.EditAnnouncement)

/**
 * @swagger
 * /announcemnts/removeAnnouncement/{ann_id}:
 *   delete:
 *     summary: Delete an announcement
 *     tags: [Announcements]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: ann_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Announcement ID
 *     responses:
 *       200:
 *         description: Announcement deleted successfully
 *       403:
 *         description: Unauthorized - User is not the author
 *       500:
 *         description: Server error
 */
router.delete('/removeAnnouncement/:ann_id', authMiddleWare.authMiddleWare, annoucementController.RemoveAnnouncement)

/**
 * @swagger
 * /announcemnts/getCourseAnnouncement/{course_id}:
 *   get:
 *     summary: Get all announcements for a course with their comments
 *     tags: [Announcements]
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
 *         description: List of course announcements with comments
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
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       staff_name:
 *                         type: string
 *                       staff_email:
 *                         type: string
 *                       ann_title:
 *                         type: string
 *                       ann_content:
 *                         type: string
 *                       ann_id:
 *                         type: integer
 *                       staff_id:
 *                         type: integer
 *                       comments:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             comment_id:
 *                               type: integer
 *                             ann_id:
 *                               type: integer
 *                             commenter_id:
 *                               type: integer
 *                             comment_content:
 *                               type: string
 *                             stu_name:
 *                               type: string
 *                             stu_email:
 *                               type: string
 *                             stu_id:
 *                               type: integer
 *       500:
 *         description: Server error
 */
router.get('/getCourseAnnouncement/:course_id', authMiddleWare.authMiddleWare, annoucementController.getCourseAnnouncements)

// #endregion

// #region Comment Routes

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Comment management endpoints
 */

/**
 * @swagger
 * /announcemnts/addComment/{ann_id}:
 *   post:
 *     summary: Add a comment to an announcement
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: ann_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Announcement ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 description: Comment content
 *     responses:
 *       201:
 *         description: Comment added successfully
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: Announcement not found
 *       500:
 *         description: Server error
 */
router.post('/addComment/:ann_id', authMiddleWare.authMiddleWare, annoucementController.addCommentToAnnouncement)

/**
 * @swagger
 * /announcemnts/editComment/{ann_id}/{comment_id}:
 *   put:
 *     summary: Edit a comment on an announcement
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: ann_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Announcement ID
 *       - in: path
 *         name: comment_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Comment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 description: Updated comment content
 *     responses:
 *       201:
 *         description: Comment updated successfully
 *       403:
 *         description: Unauthorized - User is not the author
 *       500:
 *         description: Server error
 */
router.put('/editComment/:ann_id/:comment_id', authMiddleWare.authMiddleWare, annoucementController.EditAnnouncementComment)

/**
 * @swagger
 * /announcemnts/removeComment/{ann_id}/{comment_id}:
 *   delete:
 *     summary: Delete a comment from an announcement
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: ann_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Announcement ID
 *       - in: path
 *         name: comment_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Comment ID
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       403:
 *         description: Unauthorized - User is not the author
 *       500:
 *         description: Server error
 */
router.delete('/removeComment/:ann_id/:comment_id', authMiddleWare.authMiddleWare, annoucementController.RemoveAnnouncementComment)

// #endregion

module.exports = router
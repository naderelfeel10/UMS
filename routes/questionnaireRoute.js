const express = require('express')
const QController = require('../Controllers/Questionnaire')
const middleware = require('../middlewares/auth-middleware')

const route = express.Router();

route.get('/getCourseQuestionnaire/:course_id',middleware.authMiddleWare, QController.getCourseQuestionnaire);
route.post('/addQuestion/:course_id', middleware.authMiddleWare, QController.addQuestion);


module.exports = route
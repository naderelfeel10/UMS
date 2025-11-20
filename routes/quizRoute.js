const express = require('express')
const QuizzesController = require('../Controllers/QuizzesController')
const middleware = require('../middlewares/auth-middleware')
const route = express.Router()


route.post('/addQuiz',middleware.authMiddleWare,QuizzesController.addQuiz)
route.get('/addQuiz',middleware.authMiddleWare,QuizzesController.addQuizGet)

route.get('/getCourseQuiz/:course_id',middleware.authMiddleWare,QuizzesController.getcourseQuiz)

route.post('/gradeQuiz',middleware.authMiddleWare,QuizzesController.gradeQuiz)
route.get('/gradeQuiz',middleware.authMiddleWare,QuizzesController.gradeQuizGet)



module.exports = route;
const express = require('express')
const StaffConroller = require('../Controllers/StaffConroller')
const middleware = require('../middlewares/auth-middleware')
const route = express.Router()


route.get('/getStaffInfo',middleware.authMiddleWare, StaffConroller.AllStaffInfo)

module.exports = route;
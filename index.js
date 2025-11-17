const express = require('express')
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const connectToDB = require('./db');

const createStudentTable = require('./models/Student.js')
const createStaffTable = require('./models/Staff.js')
const createCourseTable = require('./models/Course.js')


const authrouter = require('./routes/authRoutes');
const { authMiddleWare } = require('./middlewares/auth-middleware.js');

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


const PORT = process.env.PORT || 3000 ;
(async () => {
  try {
    const db = await connectToDB();
    await createStudentTable();
    await createStaffTable();
    await createCourseTable();

  } catch (err) {
    console.error(' Could not start server due to DB error',err);
  }
})();


app.use('/api/auth',authrouter)

app.get('/home',authMiddleWare,(req,res)=>{
  username = req.userInfo.username
  res.render('home',{username})
})

app.listen(PORT,()=>{
    console.log("listening on port ",PORT);
})
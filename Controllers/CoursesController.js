const connectToDB = require('../db')
const sql = require("mssql/msnodesqlv8");
const multer = require('multer');


exports.addCourse =async (req,res)=>{
    /*if(req.userInfo.role != 'admin' )
    {
        return res.status(404).json({sucess:false, message:"Unauthorized, You have to be admin or doctor to add courses"})
    }*/
    const db = await connectToDB();
    const{course_name, credit_hours } = req.body;

    if(credit_hours !=2 && credit_hours != 3 && credit_hours != 4){
        return res.status(401).json({sucess:false, message:"course credit hours should be 2 or 3 or 4"})
    }
    const q = `insert into Course (course_name, credit_hours) values (@name, @hours)`;

    const request = await db.request();
    request.input("name", sql.VarChar, course_name);
    request.input("hours", sql.Int, credit_hours);
    await request.query(q);

    return res.status(201).json({sucess:true, message:`${course_name} course added successfully`})
    
}

exports.addCourseGet = (req,res)=>{
    res.render('addCoursePage');
}


exports.removeCourse =async (req,res)=>{
    /*if(req.userInfo.role != 'admin' && req.userInfo.role != 'Doctor')
    {
        return res.status(404).json({sucess:false, message:"Unauthorized, You have to be admin or doctor to remove courses"})
    }*/
    const db = await connectToDB();
    const{course_id } = req.body;

    const q = `delete from Course where course_id = ${course_id};`;
    await db.request().query(q);;

    return res.status(201).json({sucess:true, message:`course removed successfully`})
    
}

exports.removeCourseGet = (req,res)=>{
    res.render('removeCoursePage');
}


exports.editCourse =async (req,res)=>{
    /*if(req.userInfo.role != 'admin' && req.userInfo.role != 'Doctor')
    {
        return res.status(404).json({sucess:false, message:"Unauthorized, You have to be admin or doctor to add courses"})
    }*/
    const db = await connectToDB();
    const{course_id,new_course_name, new_credit_hours } = req.body;

    if(new_credit_hours !=2 && new_credit_hours != 3 && new_credit_hours != 4){
        return res.status(401).json({sucess:false, message:"course credit hours should be 2 or 3 or 4"})
    }

    const q = `update Course set course_name = '${new_course_name}', credit_hours = '${new_credit_hours}' where course_id = ${course_id};`;
    await db.request().query(q);;

    return res.status(201).json({sucess:true, message:`${new_course_name} course edited successfully`})
    
}

exports.editCourseGet = (req,res)=>{
    res.render('editCoursePage');
}




exports.getCourse =async (req,res)=>{
    /*if(req.userInfo.role != 'admin' && req.userInfo.role != 'Doctor')
    {
        return res.status(404).json({sucess:false, message:"Unauthorized, You have to be admin or doctor to add courses"})
    }*/
    const db = await connectToDB();
    const{course_name} = req.body;

    const q = `select * from Course where course_name = '${course_name}';`;
    const result = await db.request().query(q);
    if(result.recordset.length > 0)
    return res.status(200).json({sucess:true, message:`course info`, courses : result.recordset[0]})

    return res.status(404).json({sucess:false, message:"Course not found"})
    
}

exports.CourseGet = (req,res)=>{
    res.render('getCoursePage');
}


exports.getCoursesRegisterationRequests = async(req,res)=>{
    const db = await connectToDB();
    const q = `select * from RegisteredCourses where status='pending';`;
    
    const result = await db.request().query(q);
    return res.status(201).json({success:true, requests: result.recordset[0]});
}



exports.reviewCoursesRegisterationRequests = async (req,res)=>{
    /*if(req.userInfo.role != 'admin' && req.userInfo.role != 'Doctor')
    {
        return res.status(404).json({sucess:false, message:"Unauthorized, You have to be admin or doctor to add courses"})
    }*/
    const db = await connectToDB();
   const {course_id, stu_id , updated_status} = req.body;
   const q = `update RegisteredCourses set status = '${updated_status}' where course_id=${course_id} and stu_id = ${stu_id};`;
   
   await db.request().query(q);
   res.status(201).json({success:true, message: "course request reviewed"});
}



exports.registerCourse = async(req,res)=>{
    const db = await connectToDB();
    const stu_id = req.userInfo.userId;
    const {course_id} = req.body;
    const student = await db.request().query(`select * from Student where stu_id = ${stu_id};`);
    const course = await db.request().query(`select * from Course where course_id = ${course_id};`);

    if(student.recordset.length <= 0 ){
        return res.status(401).json({success:false, message:"student not found"})
    }
    if(course.recordset.length <= 0 ){
        return res.status(201).json({success:false, message:"course not found"})
    }
    const q = `insert into RegisteredCourses(course_id,stu_id) values(${course_id},${stu_id});`;



    await db.request().query(q);
    return res.status(200).json({success:true, message:"Course is registered successfully , waiting for supervisor acceptance "}) 

}

exports.registerCourseGet = (req,res)=>{
    res.render('registerCoursePage');
}

exports.withdrawCourse = async(req,res)=>{
    const db = await connectToDB();
    const stu_id = req.userInfo.userId;
    const {course_id} = req.body;
    const student = await db.request().query(`select * from Student where stu_id = ${stu_id};`);
    const course = await db.request().query(`select * from Course where course_id = ${course_id};`);

    if(student.recordset.length <= 0 ){
        return res.status(401).json({success:false, message:"student not found"})
    }
    if(course.recordset.length <= 0 ){
        return res.status(401).json({success:false, message:"course not found"})
    }
    const q = `delete from RegisteredCourses where course_id = ${course_id} and stu_id = ${stu_id};`;


    await db.request().query(q);
    return res.status(200).json({success:true, message:"Course is withdrew successfully  "}) 

}

exports.withdrawCourseGet = (req,res)=>{
    res.render('withdrawCoursePage');
}





exports.getMyCourses =async (req,res)=>{
    const db = await connectToDB();
    const stu_id = req.userInfo.userId;
    const result = await db.request().query(`select r.course_id,c.course_name from RegisteredCourses r join Course c on r.Course_id = c.course_id where stu_id = ${stu_id} and r.status = 'accepted';`);
    
    if(result.recordset.length >0)
    return res.status(200).json({sucess:true, message:`student courses`, courses : result.recordset[0]})

    return res.status(200).json({sucess:true, message:`you have no accepted Courses`, courses : result.recordset[0]})

}


exports.MyCoursesGet = (req,res)=>{
    res.render('getMyCoursesPage');
}

exports.getCourse =async (req,res)=>{
    const db = await connectToDB();
    const stu_id = req.userInfo.userId;
    const course_id = req.params.course_id
    //const result = await db.request().query(`select r.course_id,c.course_name from RegisteredCourses r join Course c on r.Course_id = c.course_id
        // where stu_id = ${stu_id} and r.status = 'accepted';`);
const result = await db.request().query(`
    SELECT 
        c.course_id,
        c.course_name,
        c.credit_hours,
        cc.file_name,
        cc.file_data,
        rc.grade
    FROM Course c
    LEFT JOIN CourseContent cc
        ON c.course_id = cc.course_id
    LEFT JOIN RegisteredCourses rc
        ON c.course_id = rc.course_id AND rc.stu_id = ${stu_id}
    WHERE c.course_id = ${course_id};
    `);

    if(result.recordset.length >0)
    return res.status(200).json({sucess:true, message:`course content`, courses : result.recordset[0]})

    return res.status(200).json({sucess:true, message:`this course have no content`, courses : result.recordset[0]})

}


exports.getCourseGet = (req,res)=>{
    res.render('getCoursePage');
}


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

exports.uploadCourseContent  =  async (req, res) => {
    if (!req.file) return res.status(400).send('No file uploaded.');

    try {
        const courseId = req.params.course_id;
        const db = await connectToDB()
        const request = await db.request();
        request.input('course_id', sql.NVarChar, courseId);
        request.input('file_name', sql.NVarChar, req.file.originalname);
        request.input('file_data', sql.VarBinary(sql.MAX), req.file.buffer);
        await request.query(
            'INSERT INTO CourseContent (course_id,file_name, file_data) VALUES (@course_id,@file_name, @file_data)'
        );

        res.send('PDF uploaded successfully!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error uploading PDF');
    }
};

exports.downloadCourseContent = async (req, res) => {
    try {
        const contentId = req.params.content_id;
        const db = await connectToDB();
        const request = await db.request();
        request.input('content_id', sql.Int, contentId);

        const result = await request.query(
            'SELECT file_name, file_data FROM CourseContent WHERE content_id = @content_id'
        );

        if (result.recordset.length === 0) {
            return res.status(404).send('File not found');
        }

        const file = result.recordset[0];
        res.setHeader('Content-Disposition', 'attachment; filename=' + file.file_name);
        res.setHeader('Content-Type', 'application/pdf');
        res.send(file.file_data);

    } catch (err) {
        console.error(err);
        res.status(500).send('Error downloading PDF');
    }
};


exports.gradeCourse = async(req,res)=>{
    try{
    const db = await connectToDB();
    const {stu_id, course_id,grade} = req.body;
    
    await db.request().query(`
        UPDATE RegisteredCourses
        SET grade = '${grade}'
        WHERE stu_id = ${stu_id} AND course_id = ${course_id};
    `);

    res.status(400).send('grade added to the student');
    }
    catch(err){
        console.log(err)
        res.status(400).send('error while grading this student');

    }
}

exports.gradeCourseGet = (req,res)=>{
    res.render('gradeCoursePage');
}


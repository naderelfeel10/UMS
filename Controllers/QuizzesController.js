const connectToDB = require('../db')
const sql = require('mssql/msnodesqlv8')


exports.addQuiz = async(req ,res)=>{
        try {
    const db = await connectToDB();
    const {course_id, quiz_title, google_form_url } = req.body;
    const request = await db.request();
    request.input('course_id',sql.Int, course_id)
    request.input('quiz_title',sql.NVarChar, quiz_title)
    request.input('google_form_url',sql.NVarChar, google_form_url)

    await request.query(`insert into Quiz (course_id, quiz_title, google_form_url) values (@course_id, @quiz_title, @google_form_url);`)

    res.send({message : "quiz is added successfully"})

        } catch (error) {
        console.log(error);
        res.status(500).send("Error adding quiz");
    }

}
exports.addQuizGet = (req,res)=>{
    res.render('addquizPage')
}

exports.getcourseQuiz = async(req,res)=>{
    console.log("###")
    const course_id = req.params.course_id;

    try {
        const db = await connectToDB();
        const request = db.request();
                        
        request.input('course_id', sql.Int, course_id);

        const result = await request.query(`
            SELECT q.quiz_id, q.quiz_title, q.google_form_url , gq.quiz_grade
            FROM Quiz q join gradeQuiz gq on q.quiz_id = gq.quiz_id 
            WHERE course_id = @course_id;
        `);

        res.send(result.recordset);
    }catch(err){
        console.log(err);
        res.status(500).send("Error adding quiz");
    }
}

exports.getcourseQuizGet = (req,res)=>{
    res.render('getCoursequizzesPage')
}


exports.gradeQuiz = async(req ,res)=>{
    try {
        const db = await connectToDB();
        const {quiz_id, stu_id, quiz_grade } = req.body;

        const request = await db.request();

        request.input('quiz_id',sql.Int, quiz_id)
        request.input('stu_id',sql.NVarChar, stu_id)
        request.input('quiz_grade',sql.NVarChar, quiz_grade)

        await request.query(`insert into gradeQuiz(quiz_id, stu_id, quiz_grade) values (@quiz_id, @stu_id, @quiz_grade);`)

    res.send({message : "quiz is graded successfully"})

        } catch (error) {
        console.log(error);
        res.status(500).send("Error in grading quiz");
    }

}

exports.gradeQuizGet = (req,res)=>{
    res.render('gradequizPage')
}

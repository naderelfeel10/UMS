const connectToDB = require('../config/db')
const sql = require('mssql/msnodesqlv8')


exports.getCourseQuestionnaire = async(req,res)=>{

    try{
     const db = await connectToDB();
     const {course_id} = req.params;

     const courseCheck = await db.request();
     const course_result = await courseCheck.input('course_id',sql.Int, course_id)
     .query(`select * from Course where course_id=@course_id;`)

     if(course_result.recordset.length == 0){
        return res.status(401).json({success:false , message:"course not found"});
     }

     const request = await db.request();
     const result = await request.input('course_id',sql.Int , course_id)
     .query(`select qq.question_text , q.questionnaire_id from Questionnaire q  
        join QuestionnaireQuestion qq on qq.questionnaire_id = q.questionnaire_id where q.course_id = @course_id `);

         console.log(result.recordset);
    return res.status(200).json({success:true , result:result.recordset})
    
     
    




    }catch(err){
        console.log(err)
        return res.status(500).json({success:false, message:"Error while getting questionnaire page"})
    }
}


exports.addQuestion = async (req, res) => {
    try {
        const db = await connectToDB();
        const { course_id } = req.params;
        const { question_text, is_required } = req.body;

        const courseCheck = await db.request()
            .input('course_id', sql.Int, course_id)
            .query(`SELECT * FROM Course WHERE course_id = @course_id`);

        if (courseCheck.recordset.length === 0) {
            return res.status(404).json({ success: false, message: "Course not found" });
        }


        let questionnaire = await db.request()
            .input('course_id', sql.Int, course_id)
            .query(`SELECT * FROM Questionnaire WHERE course_id = @course_id`);

        let questionnaire_id;
        if (questionnaire.recordset.length === 0) {


            const insertQ = await db.request()
                .input('course_id', sql.Int, course_id)
                .query(`INSERT INTO Questionnaire (course_id) OUTPUT INSERTED.questionnaire_id VALUES (@course_id)`);
            
            questionnaire_id = insertQ.recordset[0].questionnaire_id;
        } else {
            questionnaire_id = questionnaire.recordset[0].questionnaire_id;
        }

        await db.request()
            .input('questionnaire_id', sql.Int, questionnaire_id)
            .input('question_text', sql.VarChar(255), question_text)
            .input('is_required', sql.Bit, is_required ?? 1)
            .query(`
                INSERT INTO QuestionnaireQuestion (questionnaire_id, question_text, is_required)
                VALUES (@questionnaire_id, @question_text, @is_required)
            `);

        return res.status(201).json({ success: true, message: "Question added successfully" });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Error while adding the question" });
    }
};

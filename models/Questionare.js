const connectToDB = require('../config/db');

async function createQuestionnaireTable() {
    const db = await connectToDB();

    const q = `
    IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Questionnaire' AND xtype='U')
    BEGIN
        CREATE TABLE Questionnaire (
            questionnaire_id INT PRIMARY KEY IDENTITY(1,1),
            course_id INT NOT NULL,
            created_at DATETIME NOT NULL DEFAULT GETDATE(),
            CONSTRAINT FK_questionnaire_Course 
                FOREIGN KEY (course_id) REFERENCES Course(course_id)
                ON DELETE CASCADE
        )
    END
    `;
    await db.request().query(q);
}

async function createQuestionnaireQuestionTable() {
    const db = await connectToDB();

    const q = `
    IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='QuestionnaireQuestion' AND xtype='U')
    BEGIN
        CREATE TABLE QuestionnaireQuestion (
            question_id INT IDENTITY(1,1) PRIMARY KEY,
            questionnaire_id INT NOT NULL,
            question_text VARCHAR(255) NOT NULL,
            is_required BIT DEFAULT 1,
            CONSTRAINT FK_QQ_Questionnaire
                FOREIGN KEY (questionnaire_id)
                REFERENCES Questionnaire(questionnaire_id)
                ON DELETE CASCADE
        )
    END
    `;
    await db.request().query(q);
}

module.exports = { createQuestionnaireTable, createQuestionnaireQuestionTable };

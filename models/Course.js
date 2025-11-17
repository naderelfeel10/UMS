const connectToDB = require('../db')

async function createCourseTable() {
    
    const db = await connectToDB();

    const q = `
    IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Course' AND xtype='U')
      create table Course (
      course_id int primary key identity(1,1),
      course_name varchar(64),
      credit_hours int check (credit_hours in (2,3,4))
      );
    `;
    await db.request().query(q);   
}

module.exports = createCourseTable;
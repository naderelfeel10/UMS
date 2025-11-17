const connectToDB = require('../db')


async function createStudentTable() {
    
    const db = await connectToDB();

    const q = `
    IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Student' AND xtype='U')
      create table Student (
      stu_id int primary key identity(100,1),
      role varchar(20) CHECK (role = 'student') DEFAULT 'student',
      stu_name varchar(30),
      stu_email varchar(30) UNIQUE,
      password varchar(64),
      verifyAccCode varchar(6),
      isVerified bit default 0,
      verifyAccCodeExpiresAt DATETIME
      );
    `;
    await db.request().query(q);   
}

module.exports = createStudentTable;
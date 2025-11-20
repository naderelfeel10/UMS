const connectToDB = require('../db')

async function createStaffTable() {
    
    const db = await connectToDB();

    const q = `
    IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Staff' AND xtype='U')
      create table Staff (
      staff_id int primary key identity(1,1),
      role varchar(20) CHECK (role IN ('TA','Doctor','admin', 'super_admin')),
      staff_name varchar(30),
      phone varchar(11),
      contact_info varchar(50),
      profile_link varchar(255),
      office_hours datetime,

      staff_email varchar(30) UNIQUE,
      password varchar(64)
      );
    `;
    await db.request().query(q);   
}

async function createStaffCoursesTable() {
    
    const db = await connectToDB();

    const q = `
    IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='StaffCourse' AND xtype='U')
      create table StaffCourse (
      staff_id int,
      course_id int,
      CONSTRAINT PK_staffCourse PRIMARY KEY (staff_id, course_id),

      CONSTRAINT FK_staffCourse_Course 
            FOREIGN KEY (course_id) REFERENCES Course(course_id),

      CONSTRAINT FK_staffCourse_Staff 
            FOREIGN KEY (staff_id) REFERENCES Staff(staff_id)
      );
    `;
    await db.request().query(q);   
}
module.exports = { createStaffTable , createStaffCoursesTable};
# University Management System (Agile Software Engineering Project)

## Project Overview
This project implements a **University Management System (UMS)** developed using the **Scrum framework**.  
The system provides a centralized, modular platform to manage academic, administrative, and community-related processes within a university.

The solution is built incrementally through multiple sprints, following agile best practices, with continuous backlog refinement and change anticipation.

---

## Agile Methodology
- **Framework:** Scrum
- **Artifacts:** Product Backlog, Sprint Backlogs, Increment
- **Tools:** Jira (Backlog & Sprint tracking), GitHub (Version Control)
- **Approach:** Iterative development with frequent delivery of working features

---

## System Architecture
- **Backend:** Node.js + Express
- **Database:** SQL Server
- **Architecture Style:** Modular / Layered Architecture
- **Data Modeling:** Relational schema with **EAV (Entity–Attribute–Value)** model support
- **Version Control:** Git / GitHub

---

## Modules

### 1. Facilities Module
Handles physical and digital infrastructure management:
- Classroom and laboratory scheduling
- Room availability and reservations
- Maintenance issue tracking
- Administrative office automation
- Resource allocation (equipment, licenses)

---

### 2. Curriculum Module
Manages academic structure and delivery:
- Core and elective course management
- Course catalog and enrollment rules
- LMS integration for assignments and content
- Assessment creation and grading
- Secure grade and feedback access

---

### 3. Staff Module
Manages academic and administrative staff:
- Professor and TA profiles
- Course assignments and office hours
- Performance tracking
- Research publication records
- HR and payroll integration
- Leave and benefits management

---

### 4. Community Module
Enhances communication across stakeholders:
- Parent–teacher communication portal
- Student–staff messaging system
- University-wide announcements
- Events and deadline notifications

---

## Database Design
- Fully normalized relational schema
- Strong use of **foreign keys** with cascade rules
- **EAV Model** implemented for flexible, extensible attributes
- Change anticipation supported in schema design
- Referential integrity enforced across all modules

---

## EAV Model Usage
The Entity–Attribute–Value pattern is used to:
- Dynamically extend entities without schema changes
- Support configurable attributes per course or resource
- Maintain scalability and flexibility

---

## Backlog Management
- Complete product backlog covering all modules
- Backlog items distributed across sprints
- Change anticipation handled at:
  - Backlog level
  - Database architecture level
- All backlog items tracked and managed using **Jira**

---

## Git Workflow
- Feature-based branching strategy
- Frequent commits with meaningful messages
- Pull before push to avoid conflicts
- Centralized GitHub repository for collaboration

---

## Evaluation Coverage
- ✔ GitHub repository with full implementation
- ✔ Complete backlog for all sprints
- ✔ Change anticipation in backlog and database design
- ✔ Full implementation of functional requirements
- ✔ EAV model implementation
- ✔ Jira integration for backlog items
- ✔ Team-based collaborative development

---

## Teamwork
- Distributed responsibilities across modules
- Code reviews and shared ownership
- Agile ceremonies followed (Sprint Planning, Review, Retrospective)

---

## License
This project is developed for academic purposes as part of the Agile Software Engineering course.

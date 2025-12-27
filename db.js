const sql = require('mssql');


const config = {
  connectionString: 'Driver={ODBC Driver 17 for SQL Server};Server=ABO7EDAR;Database=UMS;Trusted_Connection=Yes;',
  options: {
    encrypt: false
  }
};

async function connectToDB() {
    try {
        const pool = await sql.connect(config);
        console.log('✅ MSSQL Connected');
        return pool;
    } catch (err) {
        console.error('❌ DB Connection Error:', err.message || err);
        throw err;
    }
}

module.exports = connectToDB;

const sql = require('mssql');


const config = {
  connectionString: process.env.ConnectionString,
  options: {
    encrypt: false
  }
};

async function connectToDB() {
    try {
        const pool = await sql.connect(config);
        console.log('MSSQL Connected');
        return pool;
    } catch (err) {
        console.error('DB Connection Error:', err.message || err);
        throw err;
    }
}

module.exports = connectToDB;

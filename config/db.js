const mysql = require('mysql2');
const fs = require('fs');
require("dotenv").config();
// Load Aiven CA Certificate (Make sure ca.pem is in your project directory)
const sslOptions = process.env.DB_SSL === "true" ? { ca: fs.readFileSync("./ca.pem") } : { rejectUnauthorized: false };

const connection = mysql.createConnection({
    host: process.env.DB_HOST,  
    port: process.env.DB_PORT || 3306,  
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: sslOptions  // Secure Aiven MySQL connection
});

// Connect to Database
connection.connect((err) => {
    if (err) {
        console.error("❌ Database connection failed:", err.message);
        return;
    }
    console.log("✅ Connected to Aiven MySQL Database!");
});

module.exports = connection;

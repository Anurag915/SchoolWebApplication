const db = require("../config/db");

// Add a new school to the database
const addSchool = (name, address, latitude, longitude, callback) => {
    const query = "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";
    db.query(query, [name, address, latitude, longitude], callback);
};

// Get all schools from the database
const getAllSchools = (callback) => {
    const query = "SELECT * FROM schools";
    db.query(query, callback);
};

module.exports = { addSchool, getAllSchools };

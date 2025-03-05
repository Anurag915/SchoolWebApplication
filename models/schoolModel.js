const db = require("../config/db");

// Fetch all schools
const getAllSchools = (callback) => {
  db.query("SELECT * FROM schools", (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Add a new school
const addSchool = (name, address, latitude, longitude, callback) => {
  db.query(
    "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)",
    [name, address, latitude, longitude],
    (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    }
  );
};

module.exports = { getAllSchools, addSchool };

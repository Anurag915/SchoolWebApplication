const School = require("../models/schoolModel");


// const getSchools = (req, res) => {
//   School.getAllSchools((err, schools) => {
//     if (err) {
//       return res.status(500).json({ error: "Database error", details: err.message });
//     }
//     res.status(200).json(schools);
//   });
// };

const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Earth radius in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) *
            Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

// GET /listSchools
const listSchools = (req, res) => {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
        return res.status(400).json({ error: "User latitude and longitude are required." });
    }

    School.getAllSchools((err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Database fetch failed." });
        }

        const userLat = parseFloat(latitude);
        const userLon = parseFloat(longitude);

        const sortedSchools = results
            .map((school) => {
                const distance = calculateDistance(userLat, userLon, school.latitude, school.longitude);
                console.log(`Distance to ${school.name}: ${distance.toFixed(2)} km`);
                return { ...school, distance };
            })
            .sort((a, b) => a.distance - b.distance);

        res.status(200).json(sortedSchools);
    });
};

// POST /schools
const addNewSchool = (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  if (!name || !address || !latitude || !longitude) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  School.addSchool(name, address, latitude, longitude, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database error", details: err.message });
    }
    res.status(201).json({ message: "School added successfully!", schoolId: result.insertId });
  });
};

module.exports = { listSchools, addNewSchool };

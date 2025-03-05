const schoolModel = require("../models/schoolModel");

// Utility Function: Haversine Distance Calculation
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

// Add School API
const addSchool = (req, res) => {
    const { name, address, latitude, longitude } = req.body;

    if (!name || !address || !latitude || !longitude) {
        return res.status(400).json({ error: "All fields are required." });
    }

    schoolModel.addSchool(name, address, latitude, longitude, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Database insertion failed." });
        }
        res.status(201).json({ message: "School added successfully!", schoolId: result.insertId });
    });
};

// List Schools Sorted by Proximity API
const listSchools = (req, res) => {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
        return res.status(400).json({ error: "User latitude and longitude are required." });
    }

    schoolModel.getAllSchools((err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Database fetch failed." });
        }

        const userLat = parseFloat(latitude);
        const userLon = parseFloat(longitude);

        const sortedSchools = results
            .map((school) => ({
                ...school,
                distance: calculateDistance(userLat, userLon, school.latitude, school.longitude),
            }))
            .sort((a, b) => a.distance - b.distance);

        res.status(200).json(sortedSchools);
    });
};

module.exports = { addSchool, listSchools };

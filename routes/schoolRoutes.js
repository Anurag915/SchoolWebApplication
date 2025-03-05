const express = require("express");
const router = express.Router();
const schoolController = require("../controller/schoolController");

router.get("/listSchools", schoolController.listSchools);
router.post("/addSchools", schoolController.addNewSchool);

module.exports = router;

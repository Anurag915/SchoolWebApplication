require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const schoolRoutes = require("./routes/schoolRoutes");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Use Routes
app.use("/api", schoolRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

app.get("/",(req,res)=>{
    res.send("Welcome to the API");
});

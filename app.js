const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");

const bookRoutes = require("./routes/bookRoutes");
const memberRoutes = require("./routes/memberRoutes");

const app = express();

connectDB();

app.use(bodyParser.json()); 

app.use("/books", bookRoutes);
app.use("/members", memberRoutes);


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

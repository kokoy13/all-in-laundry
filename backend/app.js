const express = require("express");
const cors = require("cors");
const authRoutes = require("./src/routes/authRoutes");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Endpoint login
app.use("/auth", authRoutes);
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
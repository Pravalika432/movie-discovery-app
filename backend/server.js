require("dotenv").config();

const express = require("express");
const cors = require("cors");

const movieRoutes = require("./routes/movieRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "Movie Discovery API is running",
  });
});

// Movie API routes
app.use("/api/movies", movieRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
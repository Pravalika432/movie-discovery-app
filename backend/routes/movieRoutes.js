const express = require("express");

const router = express.Router();

const {
  popularMovies,
  search,
  details,
} = require("../controllers/movieController");

router.get("/popular", popularMovies);
router.get("/search", search);
router.get("/:id", details);

module.exports = router;
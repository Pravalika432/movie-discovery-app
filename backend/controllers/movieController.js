const {
  getPopularMovies,
  searchMovies,
  getMovieDetails,
} = require("../services/tmdbService");

async function popularMovies(req, res) {
  try {
    const page = Number(req.query.page) || 1;
    const data = await getPopularMovies(page);

    res.json({
      success: true,
      page: data.page,
      totalPages: data.total_pages,
      results: data.results.map((movie) => ({
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        posterPath: movie.poster_path,
        backdropPath: movie.backdrop_path,
        rating: movie.vote_average,
        releaseDate: movie.release_date,
      })),
    });
  } catch (error) {
    console.error(error.message);

    res.status(503).json({
      success: false,
      message: "Movie service is temporarily unavailable",
    });
  }
}

async function search(req, res) {
  try {
    const query = req.query.query;
    const page = Number(req.query.page) || 1;

    if (!query || !query.trim()) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const data = await searchMovies(query, page);

    res.json({
      success: true,
      page: data.page,
      totalPages: data.total_pages,
      results: data.results.map((movie) => ({
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        posterPath: movie.poster_path,
        backdropPath: movie.backdrop_path,
        rating: movie.vote_average,
        releaseDate: movie.release_date,
      })),
    });
  } catch (error) {
    console.error(error.message);

    res.status(503).json({
      success: false,
      message: "Unable to search movies",
    });
  }
}

async function details(req, res) {
  try {
    const data = await getMovieDetails(req.params.id);

    res.json({
      success: true,
      movie: {
        id: data.id,
        title: data.title,
        overview: data.overview,
        posterPath: data.poster_path,
        backdropPath: data.backdrop_path,
        rating: data.vote_average,
        releaseDate: data.release_date,
        runtime: data.runtime,
        genres: data.genres?.map((genre) => genre.name) || [],
      },
    });
  } catch (error) {
    console.error("FULL TMDB ERROR:", error);

    res.status(503).json({
      success: false,
      message: "Unable to load movie details",
    });
  }
}

module.exports = {
  popularMovies,
  search,
  details,
};
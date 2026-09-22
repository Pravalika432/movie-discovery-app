const axios = require("axios");
const https = require("https");

const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",

  headers: {
    Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
    Accept: "application/json",
  },

  httpsAgent: new https.Agent({
    family: 4,
  }),

  timeout: 30000,
});

async function getPopularMovies(page = 1) {
  const response = await tmdb.get("/movie/popular", {
    params: {
      language: "en-US",
      page,
    },
  });

  return response.data;
}

async function searchMovies(query, page = 1) {
  const response = await tmdb.get("/search/movie", {
    params: {
      query,
      language: "en-US",
      page,
      include_adult: false,
    },
  });

  return response.data;
}

async function getMovieDetails(id) {
  const response = await tmdb.get(`/movie/${id}`, {
    params: {
      language: "en-US",
    },
  });

  return response.data;
}

module.exports = {
  getPopularMovies,
  searchMovies,
  getMovieDetails,
};
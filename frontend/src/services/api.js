import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getPopularMovies = async (page = 1) => {
  const response = await api.get("/movies/popular", {
    params: { page },
  });

  return response.data;
};

export const searchMovies = async (query, page = 1) => {
  const response = await api.get("/movies/search", {
    params: {
      query,
      page,
    },
  });

  return response.data;
};

export const getMovieDetails = async (id) => {
  const response = await api.get(`/movies/${id}`);

  return response.data;
};

export default api;
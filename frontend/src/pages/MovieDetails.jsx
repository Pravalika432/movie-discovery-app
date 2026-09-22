
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieDetails } from "../services/api";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const loadMovie = async () => {
      try {
        setLoading(true);
        setError("");

        // Get movie already loaded on the Home page
        const savedMovie = sessionStorage.getItem("selectedMovie");

        if (savedMovie) {
          const parsedMovie = JSON.parse(savedMovie);

          if (String(parsedMovie.id) === String(id)) {
            setMovie(parsedMovie);

            const wishlist =
              JSON.parse(localStorage.getItem("movieWishlist")) || [];

            setIsWishlisted(
              wishlist.some(
                (item) => String(item.id) === String(parsedMovie.id)
              )
            );

            setLoading(false);
            return;
          }
        }

        // If movie isn't in sessionStorage, try backend
        const data = await getMovieDetails(id);

        if (!data || !data.movie) {
          throw new Error("Movie not found");
        }

        setMovie(data.movie);

        const wishlist =
          JSON.parse(localStorage.getItem("movieWishlist")) || [];

        setIsWishlisted(
          wishlist.some(
            (item) => String(item.id) === String(data.movie.id)
          )
        );
      } catch (err) {
        console.error("Movie details error:", err);
        setError("Unable to load movie details.");
      } finally {
        setLoading(false);
      }
    };

    loadMovie();
  }, [id]);

  const toggleWishlist = () => {
    if (!movie) return;

    const wishlist =
      JSON.parse(localStorage.getItem("movieWishlist")) || [];

    const exists = wishlist.some(
      (item) => String(item.id) === String(movie.id)
    );

    let updatedWishlist;

    if (exists) {
      updatedWishlist = wishlist.filter(
        (item) => String(item.id) !== String(movie.id)
      );

      setIsWishlisted(false);
    } else {
      updatedWishlist = [...wishlist, movie];

      setIsWishlisted(true);
    }

    localStorage.setItem(
      "movieWishlist",
      JSON.stringify(updatedWishlist)
    );

    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  if (loading) {
    return (
      <div className="loading">
        <p>Loading movie details...</p>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="error">
        <h2>Movie not found</h2>
        <p>{error}</p>

        <button onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    );
  }

  const poster = movie.posterPath
    ? `${IMAGE_BASE_URL}${movie.posterPath}`
    : "https://via.placeholder.com/500x750?text=No+Poster";

  return (
    <main className="movie-details">
      <button
        className="back-button"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div className="details-container">
        <img
          src={poster}
          alt={movie.title || "Movie poster"}
          className="details-poster"
        />

        <div className="details-content">
          <h1>{movie.title || "Untitled Movie"}</h1>

          <div className="details-meta">
            <span>
              ⭐{" "}
              {movie.rating
                ? movie.rating.toFixed(1)
                : "N/A"}
            </span>

            <span>
              📅{" "}
              {movie.releaseDate
                ? movie.releaseDate.substring(0, 4)
                : "Unknown"}
            </span>

            <span>
              ⏱️ {movie.runtime || "N/A"} min
            </span>
          </div>

          {movie.genres?.length > 0 && (
            <div className="genres">
              {movie.genres.map((genre) => (
                <span className="genre" key={genre}>
                  {genre}
                </span>
              ))}
            </div>
          )}

          <h2>Overview</h2>

          <p className="overview">
            {movie.overview || "No overview available."}
          </p>

          <button
            className="wishlist-button"
            onClick={toggleWishlist}
          >
            {isWishlisted
              ? "💔 Remove from Wishlist"
              : "❤️ Add to Wishlist"}
          </button>
        </div>
      </div>
    </main>
  );
}

export default MovieDetails;


import { useNavigate } from "react-router-dom";

function MovieCard({ movie, onClick }) {
  const navigate = useNavigate();

  const poster = movie.posterPath
    ? `https://image.tmdb.org/t/p/w500${movie.posterPath}`
    : "https://via.placeholder.com/500x750?text=No+Poster";

  const handleClick = () => {
    if (onClick) {
      onClick(movie);
    } else {
      navigate(`/movie/${movie.id}`);
    }
  };

  return (
    <div className="movie-card" onClick={handleClick}>
      <img
        src={poster}
        alt={movie.title || "Movie poster"}
        className="movie-poster"
        loading="lazy"
      />

      <div className="movie-info">
        <h3>{movie.title || "Untitled Movie"}</h3>

        <div className="movie-meta">
          <span>
            ⭐ {movie.rating ? movie.rating.toFixed(1) : "N/A"}
          </span>

          <span>
            {movie.releaseDate
              ? movie.releaseDate.substring(0, 4)
              : "Unknown"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;


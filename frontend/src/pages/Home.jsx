
import { useEffect, useRef, useState } from "react";
import { getPopularMovies, searchMovies } from "../services/api";
import MovieGrid from "../components/MovieGrid";
import SearchBar from "../components/SearchBar";

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const requestId = useRef(0);

  const loadPopularMovies = async (pageNumber = 1, append = false) => {
    const currentRequest = ++requestId.current;

    try {
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      setError("");

      const data = await getPopularMovies(pageNumber);

      if (currentRequest !== requestId.current) {
        return;
      }

      if (append) {
        setMovies((previous) => [
          ...previous,
          ...(data.results || []),
        ]);
      } else {
        setMovies(data.results || []);
      }

      setPage(data.page || pageNumber);
      setTotalPages(data.totalPages || 1);
      setSearchQuery("");
    } catch (err) {
      console.error("Popular movies error:", err);

      if (currentRequest === requestId.current) {
        setError(
          "Unable to load movies. Please check your connection and try again."
        );
      }
    } finally {
      if (currentRequest === requestId.current) {
        setLoading(false);
        setLoadingMore(false);
      }
    }
  };

  const handleSearch = async (query) => {
    const currentRequest = ++requestId.current;

    try {
      setSearchQuery(query);
      setLoading(true);
      setError("");
      setPage(1);
      setTotalPages(1);

      const data = await searchMovies(query, 1);

      if (currentRequest !== requestId.current) {
        return;
      }

      setMovies(data.results || []);
      setPage(data.page || 1);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error("Search error:", err);

      if (currentRequest === requestId.current) {
        setMovies([]);
        setError("Unable to search movies. Please try again.");
      }
    } finally {
      if (currentRequest === requestId.current) {
        setLoading(false);
      }
    }
  };

  const loadMore = async () => {
    if (loadingMore || page >= totalPages) {
      return;
    }

    const nextPage = page + 1;
    const currentRequest = ++requestId.current;

    try {
      setLoadingMore(true);
      setError("");

      let data;

      if (searchQuery) {
        data = await searchMovies(searchQuery, nextPage);
      } else {
        data = await getPopularMovies(nextPage);
      }

      if (currentRequest !== requestId.current) {
        return;
      }

      setMovies((previous) => [
        ...previous,
        ...(data.results || []),
      ]);

      setPage(data.page || nextPage);
      setTotalPages(data.totalPages || totalPages);
    } catch (err) {
      console.error("Load more error:", err);
      setError("Unable to load more movies.");
    } finally {
      if (currentRequest === requestId.current) {
        setLoadingMore(false);
      }
    }
  };

  useEffect(() => {
    loadPopularMovies();
  }, []);

  const handleMovieClick = (movie) => {
    sessionStorage.setItem(
      "selectedMovie",
      JSON.stringify(movie)
    );

    window.location.href = `/movie/${movie.id}`;
  };

  return (
    <main className="home">
      <section className="hero">
        <h1>Discover Movies 🎬</h1>

        <p>
          Find your next favorite movie and save it to your wishlist.
        </p>

        <SearchBar onSearch={handleSearch} />
      </section>

      <section className="movies-section">
        <div className="section-header">
          <h2>
            {searchQuery
              ? `Search results for "${searchQuery}"`
              : "Popular Movies"}
          </h2>

          {movies.length > 0 && (
            <span>{movies.length} movies</span>
          )}
        </div>

        {loading && (
          <div className="loading">
            <p>Loading movies...</p>
          </div>
        )}

        {error && !loading && (
          <div className="error">
            <h2>Something went wrong</h2>

            <p>{error}</p>

            <button
              onClick={() => {
                if (searchQuery) {
                  handleSearch(searchQuery);
                } else {
                  loadPopularMovies();
                }
              }}
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            <MovieGrid
              movies={movies}
              onMovieClick={handleMovieClick}
            />

            {movies.length > 0 && page < totalPages && (
              <div className="load-more-container">
                <button
                  className="load-more-button"
                  onClick={loadMore}
                  disabled={loadingMore}
                >
                  {loadingMore
                    ? "Loading..."
                    : "Load More Movies"}
                </button>
              </div>
            )}

            {movies.length > 0 && page >= totalPages && (
              <p className="end-message">
                You've reached the end 🎬
              </p>
            )}
          </>
        )}
      </section>
    </main>
  );
}

export default Home;


import { useEffect, useState } from "react";
import MovieGrid from "../components/MovieGrid";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  const loadWishlist = () => {
    try {
      const savedWishlist =
        JSON.parse(localStorage.getItem("movieWishlist")) || [];

      setWishlist(savedWishlist);
    } catch (error) {
      console.error("Wishlist error:", error);
      setWishlist([]);
    }
  };

  useEffect(() => {
    loadWishlist();

    window.addEventListener("wishlistUpdated", loadWishlist);

    return () => {
      window.removeEventListener("wishlistUpdated", loadWishlist);
    };
  }, []);

  return (
    <main className="wishlist-page">
      <div className="wishlist-header">
        <h1>❤️ My Wishlist</h1>

        <p>
          {wishlist.length}{" "}
          {wishlist.length === 1 ? "movie" : "movies"} saved
        </p>
      </div>

      {wishlist.length === 0 ? (
        <div className="empty-state">
          <h2>Your wishlist is empty 🎬</h2>

          <p>
            Add movies you want to watch later.
          </p>
        </div>
      ) : (
        <MovieGrid movies={wishlist} />
      )}
    </main>
  );
}

export default Wishlist;

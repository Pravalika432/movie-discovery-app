import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        🎬 MovieVerse
      </Link>

      <div className="nav-links">
        <Link
          to="/"
          className={location.pathname === "/" ? "active" : ""}
        >
          🏠 Home
        </Link>

        <Link
          to="/wishlist"
          className={location.pathname === "/wishlist" ? "active" : ""}
        >
          ❤️ Wishlist
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
import Logo from "../MovieLogo.png";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

function Navbar({ user, authLoading }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchBoxRef = useRef(null);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (movie) => {
    const title = movie.title || movie.original_title || "";
    if (title) {
      navigate(`/search?q=${encodeURIComponent(title)}`);
      setSearchTerm("");
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSearchKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleLogout = async () => {
    if (auth) {
      await signOut(auth);
      navigate("/");
    }
  };

  useEffect(() => {
    const query = searchTerm.trim();

    if (query.length < 2) {
      setSuggestions([]);
      return undefined;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=511e2c878d9e6969cfd4129fd142f874&query=${encodeURIComponent(query)}`,
          { signal: controller.signal }
        );
        const data = await response.json();
        const nextSuggestions = (data.results || [])
          .filter((movie) => movie.poster_path && movie.title)
          .slice(0, 5);

        setSuggestions(nextSuggestions);
        setShowSuggestions(nextSuggestions.length > 0);
      } catch (error) {
        if (error.name !== "AbortError") {
          setSuggestions([]);
        }
      }
    }, 300);

    return () => {
      controller.abort();
      clearTimeout(timeoutId);
    };
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white shadow-md">
      <div className="flex min-h-[60px] flex-wrap items-center gap-3 px-3 py-2 sm:flex-nowrap md:gap-8 md:px-6">
      {/* Logo with Background */}
      <div className="shrink-0 bg-yellow-300 p-1 rounded">
        <Link to="/" className="hover:cursor-pointer">
          {" "}
          <img className="w-[33px]" src={Logo} alt="Logo" />{" "}
        </Link>
      </div>

      {/* Navigation Links */}
      <Link
        to="/"
        className="text-base md:text-xl font-semibold leading-none hover:text-red-500 transition"
      >
        Home
      </Link>
      <Link
        to="/WatchList"
        className="text-base md:text-xl font-semibold leading-none hover:text-red-500 transition"
      >
        Watchlist
      </Link>
      <div className="flex-grow" />

      {/* Search input + button */}
      <div
        ref={searchBoxRef}
        className="relative order-last flex w-full gap-2 sm:order-none sm:w-auto"
      >
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setShowSuggestions(suggestions.length > 0)}
          onKeyDown={handleSearchKeyDown}
          className="min-w-0 flex-1 rounded bg-white px-3 py-2 text-sm text-black transition duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 sm:w-[180px] sm:flex-none sm:py-1 lg:w-[250px]"
        />
        <button
          onClick={handleSearch}
          className="rounded bg-yellow-300 px-3 py-2 text-sm font-semibold text-black hover:cursor-pointer sm:px-4 sm:py-1"
        >
          Search
        </button>
        {showSuggestions && (
          <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-md bg-white text-black shadow-xl sm:right-auto sm:w-[320px]">
            {suggestions.map((movie) => (
              <button
                key={movie.id}
                type="button"
                onClick={() => handleSuggestionClick(movie)}
                className="flex w-full items-center gap-3 px-3 py-2 text-left hover:cursor-pointer hover:bg-yellow-50"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                  alt=""
                  className="h-14 w-10 rounded object-cover"
                />
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold">
                    {movie.title}
                  </span>
                  <span className="block text-xs text-gray-500">
                    {movie.release_date
                      ? movie.release_date.slice(0, 4)
                      : "Release year unknown"}
                  </span>
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
      {!authLoading &&
        (user ? (
          <div className="flex items-center gap-3">
            <span className="hidden max-w-[170px] truncate text-sm text-gray-200 lg:inline">
              {user.email || "Signed in"}
            </span>
            <button
              onClick={handleLogout}
              className="rounded bg-red-500 px-3 py-1 text-sm font-semibold text-white hover:cursor-pointer hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="rounded border border-yellow-300 px-3 py-1 text-sm font-semibold text-yellow-200 hover:cursor-pointer hover:bg-yellow-300 hover:text-black"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="rounded bg-yellow-300 px-3 py-1 text-sm font-semibold text-black hover:cursor-pointer hover:bg-yellow-200"
            >
              Sign up
            </Link>
          </div>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;

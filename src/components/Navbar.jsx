import Logo from "../MovieLogo.png";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

function Navbar({ setCurrentPage }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/Search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const Home = () => {
    useEffect(() => {
      setCurrentPage(1); // Reset page to 1 when Home is clicked
    }, [setCurrentPage]);
  };
  return (
    <nav className="fixed top-0 left-0 w-full flex items-center gap-8  px-6 z-50  h-[60px]  bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white shadow-md">
      {/* Logo with Background */}
      <div className="bg-yellow-300 p-1 rounded">
        <Link to="/" className="hover:cursor-pointer">
          {" "}
          <img className="w-[33px]" src={Logo} alt="Logo" />{" "}
        </Link>
      </div>

      {/* Navigation Links */}
      <Link
        to="/"
        onClick={Home}
        className="text-xl font-semibold leading-none hover:text-red-500 transition"
      >
        Home
      </Link>
      <Link
        to="/WatchList"
        onClick={() => (window.location.href = "/WatchList")}
        className="text-xl font-semibold leading-none hover:text-red-500 transition"
      >
        Watchlist
      </Link>
      <div className="flex-grow" />

      {/* Search input + button */}
      <input
        type="text"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="px-3 bg-white py-1 rounded text-black w-[250px] focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-200"
      />
      <button
        onClick={handleSearch}
        className="bg-yellow-300 px-4 py-1 text-l font-semibold rounded text-black hover:cursor-pointer "
      >
        Search
      </button>
    </nav>
  );
}

export default Navbar;

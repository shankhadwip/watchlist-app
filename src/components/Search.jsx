import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MovieCard from "./MovieCard";
import { isTmdbConfigured, tmdbUrl } from "../tmdb";

function Search({ addToWatchlist, removeFromWatchlist, watchlist }) {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q") || "";
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (!query.trim() || !isTmdbConfigured) return;

    const fetchResults = async () => {
      try {
        const response = await fetch(tmdbUrl("/search/movie", { query }));
        const data = await response.json();

        const filteredResults = (data.results || []).filter(
          (movie) => movie.poster_path
        );
        setSearchResults(filteredResults);
        localStorage.setItem("lastSearchResults", JSON.stringify(filteredResults));
      } catch (error) {
        console.error("Search failed:", error);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="p-4">
      {/* Results */}
      <div className="mt-24 grid grid-cols-2 gap-3 px-3 pb-6 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {searchResults.length > 0 ? (
          searchResults.map((movie) => (
            <MovieCard
              key={movie.id}
              poster_path={movie.poster_path}
              title={movie.title}
              addToWatchlist={addToWatchlist}
              removeFromWatchlist={removeFromWatchlist}
              watchlist={watchlist}
              movieObj={movie}
            />
          ))
        ) : (
          <p className="text-white col-span-full text-center mt-10">
            {query ? "No results found." : "No query provided."}
          </p>
        )}
      </div>
    </div>
  );
}

export default Search;

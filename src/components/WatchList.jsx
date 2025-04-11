import React, { useEffect, useState } from "react";
import MovieCard2 from "./MovieCard2";
import Movies from "./Movies";
import genreMapping from "./GenreIDs";

function WatchList({ watchlist, removeFromWatchlist }) {
  const [search, setSearch] = useState(""); // Search input state
  let handleSearch = (e) => {
    setSearch(e.target.value); // Update search state
    console.log(e.target.value); // Log search input
  };
  const [generes, setGenres] = useState(["All Genres"]);
  const [currentGenre, setCurrentGenre] = useState("All Genres");
  const handleFilter = (genre) => {
    setCurrentGenre(genre);
  };
  useEffect(() => {
    let temp = new Set(
      watchlist.map((movieObj) => genreMapping[movieObj.genre_ids[0]])
    );
    setGenres(["All Genres", ...Array.from(temp)]);
  }, [watchlist]);

  return (
    <div className="mt-[60px] bg-gray-200 py-6 px-2">
      {/* Flex container to separate title and controls */}
      <div className="flex justify-between items-center mr-6">
        {/* Title aligned to the left */}
        <h1 className="select-none ml-6 text-3xl font-bold text-gray-700  shadow-cyan-500/50">
          My Watchlist
        </h1>

        {/* Controls (Centered) */}
      
          <input
            onChange={handleSearch}
            type="text"
            placeholder="Search movies..."
            className="px-3 py-2 border rounded-md bg-white italic text-black focus:outline-none focus:ring-2 focus:ring-gray-800 placeholder:text-xs"
          />
        </div>
        
        <div className="flex gap-4 justify-center mt-6">
          {/* Dynamically Render Genre Buttons */}
          {generes.map((genre, index) => (
            <button
              onClick={() => handleFilter(genre)}
              key={index}
              className={`rounded-md px-4 py-2 font-medium transition-colors 
      ${
        currentGenre === genre
          ? "bg-gray-500 text-white"
          : "bg-gray-900 text-white"
      } 
      hover:bg-blue-300 hover:text-black hover:cursor-pointer`}
            >
              {genre}
            </button>
          ))}
        
      </div>

      <div className="flex flex-wrap gap-6 mt-10 mb-6">
        {watchlist.length > 0 ? (
          watchlist
            .filter(
              (movie) =>
                movie.title.toLowerCase().includes(search.toLowerCase()) &&
                (currentGenre === "All Genres" ||
                  (movie.genre_ids[0] &&
                    genreMapping[movie.genre_ids[0]] === currentGenre))
            ) // Corrected Search & Genre Filter
            .map((movie) => (
              <MovieCard2
                key={movie.id}
                title={movie.title}
                poster_path={movie.poster_path}
                removeFromWatchlist={removeFromWatchlist}
                movieObj={movie}
              />
            ))
        ) : (
          <div className="flex items-center justify-center h-full w-full">
            <p className="text-lg font-semibold text-gray-700">
              No movies in your watchlist!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default WatchList;

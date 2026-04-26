import { useEffect, useState } from "react";
import MovieCard2 from "./MovieCard2";
import genreMapping from "./GenreIDs";

function WatchList({ watchlist, removeFromWatchlist }) {
  const [search, setSearch] = useState(""); // Search input state
  let handleSearch = (e) => {
    setSearch(e.target.value); // Update search state
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
    <div className="mt-[108px] min-h-screen bg-gray-200 px-3 py-5 sm:mt-[60px] sm:px-5 sm:py-6">
      {/* Flex container to separate title and controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Title aligned to the left */}
        <h1 className="select-none text-2xl font-bold text-gray-700 shadow-cyan-500/50 sm:text-3xl">
          My Watchlist
        </h1>

        {/* Controls (Centered) */}
      
          <input
            onChange={handleSearch}
            type="text"
            placeholder="Search movies from your watchlist..."
            className="w-full rounded-md border bg-white px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-gray-800 placeholder:text-xs sm:w-[280px]"
          />
        </div>
        
        <div className="mt-6 flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center sm:gap-4 sm:overflow-visible sm:pb-0">
          {/* Dynamically Render Genre Buttons */}
          {generes.map((genre, index) => (
            <button
              onClick={() => handleFilter(genre)}
              key={index}
              className={`shrink-0 rounded-md px-4 py-2 text-sm font-medium transition-colors sm:text-base 
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

      <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-10 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {watchlist.length > 0 ? (
          watchlist
            .filter(
              (movie) => {
                const title = movie.title || movie.name || "";

                return (
                title.toLowerCase().includes(search.toLowerCase()) &&
                (currentGenre === "All Genres" ||
                  (movie.genre_ids[0] &&
                    genreMapping[movie.genre_ids[0]] === currentGenre))
                );
              }
            ) // Corrected Search & Genre Filter
            .map((movie) => (
              <MovieCard2
                key={`${movie.media_type || "movie"}-${movie.id}`}
                title={movie.title || movie.name}
                poster_path={movie.poster_path}
                removeFromWatchlist={removeFromWatchlist}
                movieObj={movie}
              />
            ))
        ) : (
          <div className="col-span-full flex h-40 items-center justify-center">
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

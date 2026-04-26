import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import axios from "axios";
import Pagination from "./Pagination";

function Movies({addToWatchlist, removeFromWatchlist, watchlist}) {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Track total pages
  
  
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/trending/all/day?api_key=511e2c878d9e6969cfd4129fd142f874&page=${currentPage}`
      )
      .then((res) => {
        setMovies(
          (res.data.results || []).filter(
            (item) =>
              (item.media_type === "movie" || item.media_type === "tv") &&
              item.poster_path
          )
        );
        setTotalPages(res.data.total_pages); // Set total pages
      });
  }, [currentPage]);
  


  return (
    <div className="bg-gray-300 min-h-screen pb-6">
      <div>
        <div className="flex justify-center bg-gradient-to-b from-yellow-400 via-yellow-250 to-yellow-200 px-4 py-3 text-xl font-bold text-black shadow-md sm:text-2xl">
          Trending Movies & TV Shows
        </div>

        <div className="grid grid-cols-2 gap-3 px-3 py-5 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {movies.map((movieObj) => (
            <MovieCard
              key={`${movieObj.media_type}-${movieObj.id}`}
              movieObj={movieObj}
              poster_path={movieObj.poster_path}
              title={movieObj.title || movieObj.name}
              addToWatchlist={addToWatchlist}
              removeFromWatchlist={removeFromWatchlist}
              watchlist={watchlist}
            />
          ))}
        </div>

        {/* Pagination Component */}
        <Pagination
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalPages={totalPages} // Pass totalPages
        />
      </div>
    </div>
  );
}

export default Movies;

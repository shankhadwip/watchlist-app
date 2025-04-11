import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import axios from "axios";
import Pagination from "./Pagination";

function Movies({addToWatchlist, removeFromWatchlist, watchlist}) {
  console.log(watchlist)
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Track total pages
  
  
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=511e2c878d9e6969cfd4129fd142f874&page=${currentPage}`
      )
      .then((res) => {
        setMovies(res.data.results);
        setTotalPages(res.data.total_pages); // Set total pages
      });
  }, [currentPage]);
  


  return (
    <div className="bg-gray-300 min-h-screen pb-6">
      <div>
        <div className="flex justify-center text-2xl font-bold py-2 bg-gradient-to-b from-yellow-400 via-yellow-250 to-yellow-200 text-black shadow-md">
          Trending Movies
        </div>

        <div className="flex flex-wrap gap-6 justify-center mt-6 mb-6">
          {movies.map((movieObj) => (
            <MovieCard
              key={movieObj.id}
              movieObj={movieObj}
              poster_path={movieObj.poster_path}
              title={movieObj.original_title}
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

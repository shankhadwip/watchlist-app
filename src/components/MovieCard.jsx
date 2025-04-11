import React, { useState } from "react";

function MovieCard({
  poster_path,
  title,
  addToWatchlist,
  removeFromWatchlist,
  watchlist,
  movieObj,
}) 
{
  // Step 1: Function to check if movie exists in watchlist
  function doesMovieExist(movieObj) {
    for (let i = 0; i < watchlist.length; i++) {
      if (watchlist[i].id == movieObj.id) {
        return true;
      }
    }
    return false;
  }

  return (
    <div className="ml-4 mr-4 py-2 flex flex-col items-center bg-gray-800 rounded-xl shadow-md">
      <div
        className="ml-2 mr-2 flex h-[40vh] w-[180px] bg-center bg-cover rounded-xl"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${poster_path})`,
        }}
      ></div>

      {/* Step 3: Button with dynamic text & color */}
      <div className="w-[150px] h-[80px] flex flex-col items-center justify-between mt-4">
        <h1 className="text-white text-sm text-center font-semibold line-clamp-2 px-2">
          {title}
        </h1>
        {doesMovieExist(movieObj) ? (
          <button
            onClick={() => removeFromWatchlist(movieObj)}
            className="hover:cursor-pointer px-3 py-1 mb-2 rounded-lg text-sm font-medium w-full bg-red-500 text-white hover:bg-red-600"
          >
            Remove
          </button>
        ) : (
          <button
            onClick={() => addToWatchlist(movieObj)}
            className="hover:cursor-pointer px-3 py-1 mb-2 rounded-lg text-sm font-medium w-full bg-yellow-400 text-black hover:bg-blue-200"
          >
            + Watchlist
          </button>
        )}
      </div>
    </div>
  );
}

export default MovieCard;

import React from "react";

function MovieCard2({ poster_path, title, removeFromWatchlist, movieObj}) {
  return (
    <div className="ml-6 mr-2  py-2 flex flex-col items-center bg-gray-800 rounded-xl shadow-md">
      <div
        className="ml-2 mr-2 h-[40vh] w-[180px] bg-center bg-cover rounded-xl"
        style={{
          backgroundImage: `url(${poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : "/fallback.jpg"})`, 
        }}
      ></div>
      
      {/* Title & Button Container */}
      <div className="w-[150px] h-[80px] flex flex-col items-center justify-between mt-2 mb-2"> 
        {/* Title */}
        <h1 className="text-white text-sm text-center font-semibold line-clamp-2 px-2">
          {title || "Untitled Movie"}
        </h1>

        {/* Remove Button */}
        <button  onClick={() => removeFromWatchlist(movieObj)} className="hover:cursor-pointer bg-yellow-400 text-black font-roboto py-1 rounded-full text-sm font-medium hover:bg-blue-200 w-full">
          Remove
        </button>
      </div>
    </div>
  );
}

export default MovieCard2;

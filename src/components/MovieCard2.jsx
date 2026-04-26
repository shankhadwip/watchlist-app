function MovieCard2({ poster_path, title, removeFromWatchlist, movieObj}) {
  return (
    <div className="flex w-full flex-col items-center rounded-lg bg-gray-800 p-2 shadow-md">
      <div
        className="aspect-[2/3] w-full rounded-lg bg-cover bg-center"
        style={{
          backgroundImage: `url(${poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : "/fallback.jpg"})`, 
        }}
      ></div>
      
      {/* Title & Button Container */}
      <div className="mt-3 flex h-[88px] w-full flex-col items-center justify-between"> 
        {/* Title */}
        <h1 className="line-clamp-2 px-1 text-center text-xs font-semibold text-white sm:text-sm">
          {title || "Untitled Movie"}
        </h1>

        {/* Remove Button */}
        <button  onClick={() => removeFromWatchlist(movieObj)} className="w-full rounded-md bg-yellow-400 px-2 py-2 text-xs font-medium text-black hover:cursor-pointer hover:bg-blue-200 sm:text-sm">
          Remove
        </button>
      </div>
    </div>
  );
}

export default MovieCard2;

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
      if (
        watchlist[i].id === movieObj.id &&
        (watchlist[i].media_type || "movie") === (movieObj.media_type || "movie")
      ) {
        return true;
      }
    }
    return false;
  }

  return (
    <div className="flex w-full flex-col items-center rounded-lg bg-gray-800 p-2 shadow-md">
      <div
        className="aspect-[2/3] w-full rounded-lg bg-cover bg-center"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${poster_path})`,
        }}
      ></div>

      {/* Step 3: Button with dynamic text & color */}
      <div className="mt-3 flex h-[88px] w-full flex-col items-center justify-between">
        <h1 className="line-clamp-2 px-1 text-center text-xs font-semibold text-white sm:text-sm">
          {title}
        </h1>
        {doesMovieExist(movieObj) ? (
          <button
            onClick={() => removeFromWatchlist(movieObj)}
            className="mb-1 w-full rounded-md bg-red-500 px-2 py-2 text-xs font-medium text-white hover:cursor-pointer hover:bg-red-600 sm:text-sm"
          >
            Remove
          </button>
        ) : (
          <button
            onClick={() => addToWatchlist(movieObj)}
            className="mb-1 w-full rounded-md bg-yellow-400 px-2 py-2 text-xs font-medium text-black hover:cursor-pointer hover:bg-blue-200 sm:text-sm"
          >
            + Watchlist
          </button>
        )}
      </div>
    </div>
  );
}

export default MovieCard;

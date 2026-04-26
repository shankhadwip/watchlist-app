import { useEffect, useState } from "react";
import BannerImage from "../BannerImg.jpg";

function Banner({ watchlist, addToWatchlist }) {
  const [topShow, setTopShow] = useState(null);
  const fallbackMovie = {
    id: "fallback-banner",
    media_type: "movie",
    title: "Interstellar",
    overview: "Mankind's next step will be our greatest.",
    backdropUrl: BannerImage,
  };
  const featuredShow = topShow || fallbackMovie;
  const isInWatchlist = watchlist.some(
    (item) =>
      item.id === featuredShow.id &&
      (item.media_type || "movie") === (featuredShow.media_type || "movie")
  );

  const getBackdropUrl = (movie) =>
    movie?.backdropUrl ||
    (movie?.backdrop_path
      ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
      : BannerImage);

  useEffect(() => {
    const fetchTopShowToday = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/trending/tv/day?api_key=511e2c878d9e6969cfd4129fd142f874"
        );
        const data = await response.json();
        const showWithBackdrop = (data.results || []).find(
          (show) => show.backdrop_path
        );

        setTopShow(
          showWithBackdrop ? { ...showWithBackdrop, media_type: "tv" } : null
        );
      } catch (error) {
        console.error("Top show failed to load:", error);
      }
    };

    fetchTopShowToday();
  }, []);

  return (
    <div className="relative mt-[108px] h-[44vh] min-h-[320px] w-full overflow-hidden bg-black shadow-md sm:mt-[60px] sm:h-[56vh] lg:h-[70vh]">
      <img
        src={getBackdropUrl(featuredShow)}
        alt={featuredShow?.name || featuredShow?.title || "Featured show banner"}
        className="h-full w-full object-cover object-top"
      />

      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-5 text-white sm:p-10">
        <p className="mb-2 w-fit rounded bg-yellow-300 px-3 py-1 text-xs font-bold uppercase tracking-wide text-black sm:text-sm">
          No. 1 show today
        </p>
        <h1 className="text-3xl font-bold sm:text-4xl">
          {featuredShow?.name || featuredShow?.title || "Interstellar"}
        </h1>
        <p className="mt-2 line-clamp-3 max-w-2xl text-base tracking-wide text-white/80 sm:text-xl">
          {featuredShow?.overview || "Mankind's next step will be our greatest."}
        </p>
        <button
          type="button"
          onClick={() => addToWatchlist(featuredShow)}
          disabled={isInWatchlist}
          className={`mt-5 w-fit rounded px-5 py-2 text-sm font-bold transition sm:text-base ${
            isInWatchlist
              ? "bg-white/20 text-white/70"
              : "bg-yellow-300 text-black hover:cursor-pointer hover:bg-yellow-200"
          }`}
        >
          {isInWatchlist ? "Added to Watchlist" : "+ Add to Watchlist Now"}
        </button>
      </div>
    </div>
  );
}

export default Banner;

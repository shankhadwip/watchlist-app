import React, {useEffect, useState } from "react";

import MovieCard from "./MovieCard"; // Adjust path if needed

function Search({ addToWatchlist, removeFromWatchlist, watchlist }) {

const [query, setQuery] = useState("");

const [searchResults, setSearchResults] = useState([]);

const handleSearch = async () => {

if (!query.trim()) return;



const response = await fetch(

  https://api.themoviedb.org/3/search/movie?api_key=511e2c878d9e6969cfd4129fd142f874&query=${query}

);

const data = await response.json();

 const resultsWithPosters = (data.results || []).filter(

(movie) => movie.poster_path

);

setSearchResults(resultsWithPosters);

localStorage.setItem("lastSearchResults", JSON.stringify(searchResults));

};

useEffect(() => {

const savedResults = localStorage.getItem("lastSearchResults");

if (savedResults) {

  setSearchResults(JSON.parse(savedResults));

}

}, []);

return (

<div className="p-4">

  {/* Search Input */}

  <div className="flex gap-2 mb-4 mt-20 justify-center">

    <input

      type="text"

      value={query}

      onChange={(e) => setQuery(e.target.value)}

      placeholder="Search movies..."

      className="px-3 py-2 border rounded-md w-[250px]"

    />

    <button 

      onClick={handleSearch}

      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:cursor-pointer"

    >

      Search

    </button>

  </div>



  {/* Results */}

  <div className="flex flex-wrap gap-6 justify-center mt-10 mb-6">

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

        {query ? "No results found." : "Search for a movie above."}

      </p>

    )}

  </div>

</div>

);

}

export default Search;
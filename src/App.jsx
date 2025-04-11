import Movies from "./components/Movies";
import Navbar from "./components/Navbar";
import WatchList from "./components/WatchList";
import Banner from "./components/Banner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  const [watchlist, setWatchlist] = useState([]); // Watchlist state

  const addToWatchlist = (movieObj) => {
    const newWatchlist = [...watchlist, movieObj];
    setWatchlist(newWatchlist);
    localStorage.setItem("watchlist", JSON.stringify(newWatchlist));
  };

  const removeFromWatchlist = (movieObj) => {
    const updatedWatchlist = watchlist.filter((movie) => {
      return movie.id !== movieObj.id;
    });
    localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
    setWatchlist(updatedWatchlist);
  };

  useEffect(() => {
    const watchlistData = JSON.parse(localStorage.getItem("watchlist"));
    if (watchlistData) {
      setWatchlist(watchlistData);
    }
  }, []);
  

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner />
                <Movies
                  watchlist={watchlist}
                  addToWatchlist={addToWatchlist}
                  removeFromWatchlist={removeFromWatchlist}/>
              </>
            }
          />
          <Route
            path="/WatchList"
            element={
              <>
                <WatchList
                  watchlist={watchlist}
                  removeFromWatchlist={removeFromWatchlist}
                />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

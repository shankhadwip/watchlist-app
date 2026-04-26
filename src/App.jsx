import Movies from "./components/Movies";
import Navbar from "./components/Navbar";
import WatchList from "./components/WatchList";
import Banner from "./components/Banner";
import Search from "./components/Search";
import AuthForm from "./components/AuthForm";
import { auth } from "./firebase";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [watchlist, setWatchlist] = useState([]);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(Boolean(auth));
  const storageKey = user ? `watchlist_${user.uid}` : "watchlist_guest";

  const addToWatchlist = (movieObj) => {
    if (
      watchlist.some(
        (movie) =>
          movie.id === movieObj.id &&
          (movie.media_type || "movie") === (movieObj.media_type || "movie")
      )
    ) {
      return;
    }

    const newWatchlist = [...watchlist, movieObj];
    setWatchlist(newWatchlist);
    localStorage.setItem(storageKey, JSON.stringify(newWatchlist));
  };

  const removeFromWatchlist = (movieObj) => {
    const updatedWatchlist = watchlist.filter((movie) => {
      return !(
        movie.id === movieObj.id &&
        (movie.media_type || "movie") === (movieObj.media_type || "movie")
      );
    });
    localStorage.setItem(storageKey, JSON.stringify(updatedWatchlist));
    setWatchlist(updatedWatchlist);
  };

  useEffect(() => {
    if (!auth) {
      setAuthLoading(false);
      return undefined;
    }

    return onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
  }, []);

  useEffect(() => {
    const watchlistData = JSON.parse(localStorage.getItem(storageKey) || "[]");
    setWatchlist(Array.isArray(watchlistData) ? watchlistData : []);
  }, [storageKey]);

  return (
    <>
      <BrowserRouter>
        <Navbar user={user} authLoading={authLoading} />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner
                  watchlist={watchlist}
                  addToWatchlist={addToWatchlist}
                />
                <Movies
                  watchlist={watchlist}
                  addToWatchlist={addToWatchlist}
                  removeFromWatchlist={removeFromWatchlist}
                />
              </>
            }
          />
       
          <Route
            path="/WatchList"
            element={
              <WatchList
                watchlist={watchlist}
                removeFromWatchlist={removeFromWatchlist}
              />
            }
          />
          <Route
            path="/search"
            element={
              <Search
                watchlist={watchlist}
                addToWatchlist={addToWatchlist}
                removeFromWatchlist={removeFromWatchlist}
              />
            }
          />
          <Route path="/login" element={<AuthForm mode="login" />} />
          <Route path="/signup" element={<AuthForm mode="signup" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

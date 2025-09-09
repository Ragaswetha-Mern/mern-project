import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Link,
} from "react-router-dom";
import { FaHeart, FaFilm, FaHome, FaRobot, FaPaperPlane } from "react-icons/fa";
import MovieList from "./components/MovieList/MovieList";
import Pagination from "./components/Pagination/Pagination";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import Favorites from "./components/Favorites/Favorites";
import { searchMovies, getMovieDetails } from "./services/omdbApi";

function App() {
  const [chatOpen, setChatOpen] = useState(true);
  const [chatMinimized, setChatMinimized] = useState(false);

  const DEFAULT_SEARCH = "Avengers";
  const [searchTerm, setSearchTerm] = useState(DEFAULT_SEARCH);
  const [chatInput, setChatInput] = useState("");
  const [chatResponse, setChatResponse] = useState("");
  const [movies, setMovies] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });
  const [headerSearch, setHeaderSearch] = useState(""); // <-- Add this line
  const navigate = useNavigate();

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState("");

  useEffect(() => {
    fetchMovies(searchTerm, currentPage);
  }, []);

  useEffect(() => {
    if (searchTerm) {
      fetchMovies(searchTerm, currentPage, filterType);
    }
  }, [searchTerm, currentPage, filterType]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setSearchTerm(chatInput);
    setCurrentPage(1);
    setLoading(true);
    setChatResponse(
      "Here are your results! What would you like to search for next? Let me bring it."
    );
    await fetchMovies(chatInput, 1);
    setLoading(false);
    setChatInput("");
  };

  const fetchMovies = async (term, page, type = "") => {
    setLoading(true);
    setError("");
    try {
      const result = await searchMovies(term, page, type);
      const limitedMovies = result.movies ? result.movies.slice(0, 50) : [];
      setMovies(limitedMovies);
      setTotalResults(result.totalResults);
    } catch (err) {
      setMovies([]);
      setTotalResults(0);
      setError(err.message);
    }
    setLoading(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleMovieClick = async (imdbID) => {
    setDetailsLoading(true);
    setDetailsError("");
    try {
      const details = await getMovieDetails(imdbID);
      setSelectedMovie(details);
      navigate(`/movie/${imdbID}`);
    } catch (err) {
      setDetailsError(err.message);
    }
    setDetailsLoading(false);
  };

  const handleRemoveFavorite = (imdbID) => {
    setFavorites(favorites.filter((fav) => fav.imdbID !== imdbID));
  };

  const handleFavoriteToggle = (movie) => {
    const isFav = favorites.some((fav) => fav.imdbID === movie.imdbID);
    let updated;
    if (isFav) {
      updated = favorites.filter((fav) => fav.imdbID !== movie.imdbID);
    } else {
      updated = [...favorites, movie];
    }
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="App min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] relative flex flex-col">
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/80 via-transparent to-[#203a43]/60 pointer-events-none z-0" />

      <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-gradient-to-r from-[#232526] via-[#414345] to-[#232526] shadow-2xl border-b-4 border-[#00a8e1]">
        <nav className="flex flex-wrap items-center justify-between px-4 md:px-10 py-3 gap-2 md:gap-0">
          <div className="flex items-center gap-4 text-[#00a8e1] text-3xl font-black tracking-wide">
            <FaFilm className="text-[#00a8e1] text-4xl drop-shadow-lg" />
            <Link
              to="/"
              className="hover:text-white transition-transform duration-200 scale-100 hover:scale-105"
              onClick={() => {
                setSearchTerm(DEFAULT_SEARCH);
                setCurrentPage(1);
                fetchMovies(DEFAULT_SEARCH, 1, filterType);
              }}
            >
              CineWave
            </Link>
          </div>
          <form
            className="relative flex items-center w-full max-w-md mx-auto"
            onSubmit={(e) => {
              e.preventDefault();
              if (headerSearch.trim()) {
                setSearchTerm(headerSearch.trim());
                setCurrentPage(1);
              }
            }}
          >
            <input
              type="text"
              className="w-full pl-12 pr-4 py-3 rounded-full bg-[#232526] text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-[#00a8e1] transition-all duration-200 text-lg"
              placeholder="Search for movies, events..."
              value={headerSearch}
              onChange={(e) => setHeaderSearch(e.target.value)}
            />
            <span className="absolute left-4 text-[#00a8e1] text-2xl pointer-events-none">
              <FaPaperPlane />
            </span>
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#00a8e1] hover:bg-[#203a43] text-white px-4 py-2 rounded-full font-bold shadow-md transition-all duration-200"
              title="Search"
            >
              Go
            </button>
          </form>
          <div className="flex items-center gap-6 flex-wrap">
            <Link
              to="/"
              className="flex items-center gap-2 text-white hover:text-[#00a8e1] font-semibold text-lg transition-transform duration-200 hover:scale-110"
            >
              <FaHome /> Home
            </Link>
            <Link
              to="/favorites"
              className="flex items-center gap-2 text-white hover:text-[#00a8e1] font-semibold text-lg transition-transform duration-200 hover:scale-110"
            >
              <FaHeart /> Favorites
            </Link>
          </div>
        </nav>
      </header>

      {/* Chat window */}
      {chatOpen && (
        <section className="fixed bottom-4 right-4 z-50 flex flex-col items-end w-full max-w-xs sm:max-w-sm md:max-w-md">
          <div className="w-full bg-[#232526]/90 rounded-2xl shadow-2xl backdrop-blur-xl border-2 border-[#00a8e1]">
            <div className="flex items-center justify-between px-4 py-2 border-b border-[#00a8e1]">
              <span className="flex items-center gap-2 font-bold text-white text-lg">
                <FaRobot className="text-[#00a8e1] text-2xl drop-shadow" />
                CineWave Bot
              </span>
              <div className="flex gap-2">
                <button
                  className="text-white hover:text-[#00a8e1]"
                  onClick={() => setChatMinimized(!chatMinimized)}
                >
                  {chatMinimized ? <span>&#9633;</span> : <span>&#8211;</span>}
                </button>
                <button
                  className="text-white hover:text-red-500"
                  onClick={() => setChatOpen(false)}
                >
                  &#10005;
                </button>
              </div>
            </div>
            {!chatMinimized && (
              <div className="flex flex-col gap-2 p-4">
                <div className="bg-[#203a43] text-white rounded-lg px-4 py-3 mb-2 self-start max-w-[80%]">
                  Hi! What movie, event... are you looking for?
                </div>
                {searchTerm && (
                  <div className="bg-[#1e293b] text-white rounded-lg px-4 py-3 mb-2 self-end max-w-[80%]">
                    {searchTerm}
                  </div>
                )}
                {chatResponse && (
                  <div className="bg-[#00a8e1] text-white rounded-lg px-4 py-3 mb-2 self-end max-w-[80%]">
                    {chatResponse}
                  </div>
                )}
                {/* Movie details chat bubble */}
                {selectedMovie && (
                  <div className="flex items-center gap-3 bg-[#232526] text-white rounded-lg px-4 py-3 mb-2 self-end max-w-[80%] shadow-lg">
                    <span className="font-bold text-lg">
                      {selectedMovie.Title}
                    </span>
                    <button
                      className={`text-2xl focus:outline-none transition-transform duration-200 ${
                        favorites.some(
                          (fav) => fav.imdbID === selectedMovie.imdbID
                        )
                          ? "text-red-500 scale-110"
                          : "text-gray-300 hover:text-red-400"
                      }`}
                      title={
                        favorites.some(
                          (fav) => fav.imdbID === selectedMovie.imdbID
                        )
                          ? "Remove from Favorites"
                          : "Add to Favorites"
                      }
                      onClick={() => {
                        const isFav = favorites.some(
                          (fav) => fav.imdbID === selectedMovie.imdbID
                        );
                        let updated;
                        if (isFav) {
                          updated = favorites.filter(
                            (fav) => fav.imdbID !== selectedMovie.imdbID
                          );
                        } else {
                          updated = [...favorites, selectedMovie];
                        }
                        setFavorites(updated);
                        localStorage.setItem(
                          "favorites",
                          JSON.stringify(updated)
                        );
                      }}
                    >
                      {favorites.some(
                        (fav) => fav.imdbID === selectedMovie.imdbID
                      )
                        ? "❤️"
                        : "🤍"}
                    </button>
                  </div>
                )}
                <form className="flex gap-2 w-full" onSubmit={handleChatSubmit}>
                  <input
                    type="text"
                    className="bg-[#1e293b] border-none rounded-full px-4 py-3 text-white w-full focus:outline-none focus:ring-2 focus:ring-[#00a8e1]"
                    placeholder="Type your request..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-[#00a8e1] via-[#203a43] to-[#2c5364] text-white rounded-full font-bold shadow-xl hover:scale-110 transition-transform duration-200 flex items-center justify-center"
                  >
                    <FaPaperPlane className="text-xl" />
                  </button>
                </form>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Main content */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 flex-1">
        <Routes>
          {/* Home/Search */}
          <Route
            path="/"
            element={
              <>
                {/* Filter Dropdown */}
                <div className="flex items-center gap-4 mb-6 mt-6">
                  <label className="text-white font-bold">
                    Filter by Type:
                  </label>
                  <select
                    className="bg-[#232526] text-white px-4 py-2 rounded-lg border-2 border-[#00a8e1] focus:outline-none"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                  >
                    <option value="">All</option>
                    <option value="movie">Movie</option>
                    <option value="series">Series</option>
                  </select>
                </div>
                {loading && (
                  <div className="flex flex-col items-center justify-center py-12">
                    <svg
                      className="animate-spin h-12 w-12 text-[#00a8e1] mb-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      />
                    </svg>
                  </div>
                )}
                {!loading &&
                  !error &&
                  (movies.length > 0 ? (
                    <MovieList
                      movies={movies}
                      onMovieClick={handleMovieClick}
                      favorites={favorites}
                      onFavoriteToggle={handleFavoriteToggle}
                      currentPage={currentPage}
                      totalPages={
                        totalResults > 10 ? Math.ceil(totalResults / 10) : 1
                      }
                      onPageChange={handlePageChange}
                      chatOpen={chatOpen}
                      setChatOpen={setChatOpen}
                    />
                  ) : (
                    <div className="text-center p-4 text-white">
                      No movies found.
                    </div>
                  ))}
              </>
            }
          />

          {/* Favorites */}
          <Route
            path="/favorites"
            element={
              <div className="mt-12">
                <h2 className="text-2xl font-extrabold mb-4 text-white tracking-wide">
                  Favorites
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Favorites
                    favorites={favorites}
                    onRemove={handleRemoveFavorite}
                    onMovieClick={handleMovieClick}
                  />
                </div>
              </div>
            }
          />

          {/* Movie Details */}
          <Route
            path="/movie/:id"
            element={
              detailsLoading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <svg
                    className="animate-spin h-12 w-12 text-[#00a8e1] mb-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    />
                  </svg>
                  <span className="text-white text-xl font-bold">
                    Loading details...
                  </span>
                </div>
              ) : detailsError ? (
                <div className="text-center p-4 text-red-500 font-bold">
                  {detailsError}
                </div>
              ) : (
                <MovieDetails
                  movie={selectedMovie}
                  favorites={favorites}
                  setFavorites={setFavorites}
                />
              )
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Link,
} from "react-router-dom";
import { FaSearch, FaHeart, FaFilm, FaHome } from "react-icons/fa";
import SearchBar from "./components/SearchBar";
import FilterDropdown from "./components/FilterDropdown";
import MovieList from "./components/MovieList";
import Pagination from "./components/Pagination";
import MovieDetails from "./components/MovieDetails";
import Favorites from "./components/Favorites";
import { searchMovies, getMovieDetails } from "./services/omdbApi";

function MainApp() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });
  const navigate = useNavigate();

  // For details page
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState("");

  const filterOptions = [
    { value: "", label: "All" },
    { value: "movie", label: "Movie" },
    { value: "series", label: "Series" },
    { value: "episode", label: "Episode" },
  ];

  useEffect(() => {
    if (searchTerm) {
      fetchMovies(searchTerm, type, currentPage);
    }
    // eslint-disable-next-line
  }, [type, currentPage]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = async () => {
    setCurrentPage(1);
    fetchMovies(searchTerm, type, 1);
  };

  const fetchMovies = async (term, type, page) => {
    setLoading(true);
    setError("");
    try {
      const result = await searchMovies(term, type, page);
      setMovies(result.movies);
      setTotalResults(result.totalResults);
    } catch (err) {
      setMovies([]);
      setTotalResults(0);
      setError(err.message);
    }
    setLoading(false);
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
    setCurrentPage(1);
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

  return (
    <div className="App min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative">
      {/* Subtle background overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60 pointer-events-none z-0" />
      {/* Glassmorphism header */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-black/80 shadow-2xl border-b-4 border-red-600">
        <nav className="flex items-center justify-between px-10 py-4">
          <div className="flex items-center gap-4 text-red-600 text-4xl font-black tracking-wide">
            <FaFilm className="text-red-600 text-5xl drop-shadow-lg" />
            <Link
              to="/"
              className="hover:text-white transition-transform duration-200 scale-100 hover:scale-105"
            >
              movieflix
            </Link>
          </div>
          <div className="flex items-center gap-10">
            <Link
              to="/"
              className="flex items-center gap-2 text-white hover:text-red-600 font-semibold text-xl transition-transform duration-200 scale-100 hover:scale-110"
            >
              <FaHome /> Home
            </Link>
            <a
              href="#favorites"
              className="flex items-center gap-2 text-white hover:text-red-600 font-semibold text-xl transition-transform duration-200 scale-100 hover:scale-110"
            >
              <FaHeart /> Favorites
            </a>
          </div>
        </nav>
      </header>
      {/* Prominent search bar section below header */}
      <section className="flex flex-col items-center justify-center w-full py-10 bg-black/60 backdrop-blur-md">
        <form className="flex flex-col md:flex-row items-center justify-center gap-4 w-full max-w-2xl px-4">
          <div className="flex items-center w-full bg-white/10 rounded-2xl shadow-xl px-4 py-2 backdrop-blur-lg">
            <FaSearch className="text-red-600 text-2xl mr-3" />
            <input
              type="text"
              className="bg-transparent border-none rounded-full px-6 py-4 text-white text-2xl w-full focus:outline-none focus:ring-2 focus:ring-red-600 placeholder-gray-300 font-semibold"
              placeholder="Search for movies, series, episodes..."
              value={searchTerm}
              onChange={handleInputChange}
            />
          </div>
          <div className="w-full md:w-auto">
            <FilterDropdown
              value={type}
              onChange={handleTypeChange}
              options={filterOptions}
            />
          </div>
          <button
            type="button"
            className="px-8 py-4 bg-red-600 text-white rounded-full font-bold text-2xl shadow-xl hover:bg-red-700 transition-transform duration-200 scale-100 hover:scale-105"
            onClick={handleSearch}
          >
            Search
          </button>
        </form>
      </section>
      <main className="relative z-10 max-w-6xl mx-auto px-4 md:px-8">
        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* Search and filter are now in the header */}
                {loading && (
                  <div className="text-center p-4 text-white">Loading...</div>
                )}
                {error && (
                  <div className="text-center p-4 text-red-500 font-bold">
                    {error}
                  </div>
                )}
                {!loading && !error && movies.length > 0 && (
                  <>
                    <MovieList
                      movies={movies}
                      onMovieClick={handleMovieClick}
                    />
                    <Pagination
                      currentPage={currentPage}
                      totalPages={Math.ceil(totalResults / 10)}
                      onPageChange={handlePageChange}
                    />
                  </>
                )}
                <div className="mt-12">
                  <h2 className="text-2xl font-extrabold mb-4 text-white tracking-wide">
                    Favorites
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Favorites
                      favorites={favorites}
                      onRemove={handleRemoveFavorite}
                    />
                  </div>
                </div>
              </>
            }
          />
          <Route
            path="/movie/:id"
            element={
              detailsLoading ? (
                <div className="text-center p-4 text-white">
                  Loading details...
                </div>
              ) : detailsError ? (
                <div className="text-center p-4 text-red-500 font-bold">
                  {detailsError}
                </div>
              ) : (
                <MovieDetails movie={selectedMovie} />
              )
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}

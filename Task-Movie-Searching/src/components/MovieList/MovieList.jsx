import React from "react";
import MovieCard from "../MovieCard/MovieCard";
import Pagination from "../Pagination/Pagination";
import { FaComments, FaRobot, FaSearch } from "react-icons/fa";
import "./MovieList.css";

const MovieList = ({
  movies,
  onMovieClick,
  favorites = [],
  onFavoriteToggle,
  currentPage,
  totalPages,
  onPageChange,
  chatOpen,
  setChatOpen,
}) => (
  <div className="w-full relative">
    {/* Chat Open Menu */}
    {!chatOpen && (
      <button
        className="fixed bottom-8 right-8 z-50 bg-[#00a8e1] text-white p-4 rounded-full shadow-lg hover:bg-[#203a43] transition-all duration-200 flex items-center gap-2"
        onClick={() => setChatOpen(true)}
        title="Open Chat"
      >
        <FaComments className="text-2xl" />
        <span className="font-semibold hidden sm:inline">Chat</span>
      </button>
    )}
    {/* Marquee Info */}
    <div className="overflow-hidden whitespace-nowrap mb-4">
      <div className="inline-block animate-marquee text-lg font-semibold text-[#00a8e1] bg-black bg-opacity-60 px-4 py-2 rounded-xl shadow flex items-center gap-3">
        <span role="img" aria-label="tip">
          💡
        </span>
        <FaRobot className="inline-block text-[#00a8e1] text-xl mx-1" />
        <span>
          Tip: You can search for movies, events using the <b>CineWave Bot</b>{" "}
          <FaComments className="inline-block text-[#00a8e1] mx-1" /> or the{" "}
          <b>search bar</b>{" "}
          <FaSearch className="inline-block text-[#00a8e1] mx-1" />!
        </span>
        <span role="img" aria-label="popcorn">
          🍿
        </span>
      </div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-6">
      {movies.map((movie) => (
        <div key={movie.imdbID}>
          <MovieCard
            movie={movie}
            onClick={() => onMovieClick(movie.imdbID)}
            isFavorite={favorites.some((fav) => fav.imdbID === movie.imdbID)}
            onFavoriteToggle={onFavoriteToggle}
          />
          {/* Movie Description */}
          {movie.Plot && (
            <div className="mt-2 text-xs text-gray-200 text-center line-clamp-3">
              {movie.Plot}
            </div>
          )}
        </div>
      ))}
    </div>
    {/* Only one pagination at the bottom */}
    {totalPages > 1 && (
      <div className="mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    )}
  </div>
);

export default MovieList;

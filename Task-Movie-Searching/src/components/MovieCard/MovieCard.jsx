import React from "react";
import "./MovieCard.css";

const MovieCard = ({ movie, onClick, isFavorite, onFavoriteToggle }) => (
  <div
    className="movie-card bg-gradient-to-br from-[#232526] via-[#414345] to-[#00a8e1] border-none rounded-xl shadow-xl p-2 sm:p-4 flex flex-col items-center transition-transform duration-200 hover:scale-105 hover:shadow-2xl cursor-pointer relative w-full min-w-0"
    onClick={onClick}
  >
    <img
      src={
        movie.Poster !== "N/A"
          ? movie.Poster
          : "https://via.placeholder.com/180x260?text=No+Image"
      }
      alt={movie.Title}
      className="movie-poster w-24 h-36 xs:w-28 xs:h-40 sm:w-48 sm:h-72 object-cover mb-1 xs:mb-2 sm:mb-4 rounded-md sm:rounded-xl shadow-lg border border-red-600 sm:border-4"
    />
    {/* Favorite Star */}
    {onFavoriteToggle && (
      <span
        className={`favorite-star absolute top-4 right-4 text-2xl ${
          isFavorite ? "active" : ""
        }`}
        title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        onClick={(e) => {
          e.stopPropagation();
          onFavoriteToggle(movie);
        }}
      >
        {isFavorite ? "★" : "☆"}
      </span>
    )}
    <div className="movie-info w-full text-left">
      <h3 className="movie-title text-xs xs:text-sm sm:text-lg font-bold mb-1 text-red-600 line-clamp-2">
        {movie.Title}
      </h3>
      <p className="text-[10px] xs:text-xs sm:text-sm text-gray-400 mb-1">
        {movie.Year}
      </p>
      <span className="text-[10px] xs:text-xs sm:text-xs px-2 xs:px-3 py-0.5 xs:py-1 bg-red-100 text-red-700 rounded-full mt-1 xs:mt-2 shadow">
        {movie.Type}
      </span>
    </div>
  </div>
);

export default MovieCard;

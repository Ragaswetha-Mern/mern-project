import React from "react";
import { FaHeart } from "react-icons/fa";
import "./MovieCard.css";

const MovieCard = ({ movie, onClick, isFavorite, onFavoriteToggle }) => (
  <div className="movie-card bg-gradient-to-br from-[#232526] to-[#414345] rounded-xl shadow-lg p-4 flex flex-col items-center relative hover:scale-105 transition-transform duration-200 cursor-pointer">
    <img
      src={movie.Poster !== "N/A" ? movie.Poster : "/no-poster.png"}
      alt={movie.Title}
      className="w-full h-64 object-cover rounded-lg mb-4"
      onClick={onClick}
    />
    <div className="flex items-center justify-between w-full mb-2">
      <h3
        className="text-lg font-bold text-white truncate flex-1"
        title={movie.Title}
        onClick={onClick}
      >
        {movie.Title}
      </h3>
      <button
        className={`ml-2 text-2xl transition-colors duration-200 ${
          isFavorite ? "text-[#e50914]" : "text-gray-400 hover:text-[#e50914]"
        }`}
        onClick={(e) => {
          e.stopPropagation();
          onFavoriteToggle(movie);
        }}
        title={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <FaHeart />
      </button>
    </div>
    <div className="text-sm text-gray-300 mb-1">{movie.Year}</div>
    <div className="text-xs text-gray-400">{movie.Type}</div>
  </div>
);

export default MovieCard;

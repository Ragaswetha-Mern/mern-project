import React from "react";
import "./MovieCard.css";

const MovieCard = ({ movie, onClick }) => (
  <div
    className="movie-card bg-white border-2 border-indigo-100 rounded-2xl shadow-xl p-6 flex flex-col items-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
    onClick={onClick}
  >
    <img
      src={movie.Poster}
      alt={movie.Title}
      className="w-44 h-64 object-cover mb-4 rounded-xl shadow-lg border-2 border-indigo-200"
    />
    <h3 className="text-xl font-bold mb-2 text-gray-800 text-center line-clamp-2">
      {movie.Title}
    </h3>
    <p className="text-base text-indigo-600 mb-1 font-semibold">{movie.Year}</p>
    <span className="text-xs px-3 py-1 bg-purple-100 text-purple-700 rounded-full mt-2 shadow">
      {movie.Type}
    </span>
  </div>
);

export default MovieCard;

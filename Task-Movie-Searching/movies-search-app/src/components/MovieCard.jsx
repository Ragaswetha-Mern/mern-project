import React from "react";

const MovieCard = ({ movie, onClick }) => (
  <div
    className="movie-card bg-white border border-gray-200 rounded-xl shadow-lg p-4 flex flex-col items-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
    onClick={onClick}
  >
    <img
      src={movie.Poster}
      alt={movie.Title}
      className="w-36 h-52 object-cover mb-3 rounded-lg shadow-md"
    />
    <h3 className="text-lg font-bold mb-1 text-gray-800 text-center line-clamp-2">
      {movie.Title}
    </h3>
    <p className="text-sm text-blue-600 mb-1 font-semibold">{movie.Year}</p>
    <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full mt-1">
      {movie.Type}
    </span>
  </div>
);

export default MovieCard;

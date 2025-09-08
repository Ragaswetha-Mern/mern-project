import React from "react";
import MovieCard from "../MovieCard/MovieCard";
import "./Favorites.css";

const Favorites = ({ favorites, onRemove }) => (
  <div className="favorites grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-6">
    {favorites.length === 0 ? (
      <p className="text-center text-lg text-gray-400">
        No favorites added yet.
      </p>
    ) : (
      favorites.map((movie) => (
        <div key={movie.imdbID} className="relative">
          <MovieCard movie={movie} />
          <button
            className="absolute top-4 right-4 bg-red-600 text-white rounded-full px-4 py-2 shadow-lg font-bold hover:scale-105 transition-all border-2 border-gray-800"
            onClick={() => onRemove(movie.imdbID)}
          >
            Remove
          </button>
        </div>
      ))
    )}
  </div>
);

export default Favorites;
